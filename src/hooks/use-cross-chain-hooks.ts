"use client";

import {
  CHAIN_IDS_TO_MESSAGE_TRANSMITTER,
  CHAIN_IDS_TO_TOKEN_MESSENGER,
  CHAIN_IDS_TO_USDC_ADDRESSES,
  DESTINATION_DOMAINS,
  SupportedChainId,
} from "@/lib/chains";
import axios from "axios";
import { useState } from "react";
import {
  createPublicClient,
  createWalletClient,
  encodeFunctionData,
  formatUnits,
  http,
  HttpTransport,
  parseEther,
  parseUnits,
  TransactionExecutionError,
  type Account,
  type Chain,
  type Hex,
  type WalletClient,
} from "viem";
import { nonceManager, privateKeyToAccount } from "viem/accounts";
import { avalancheFuji, baseSepolia, sepolia } from "viem/chains";

export type TransferStep =
  | "idle"
  | "approving"
  | "burning"
  | "waiting-attestation"
  | "minting"
  | "completed"
  | "error";

interface MessageAttestation {
  message: `0x${string}`;
  attestation: `0x${string}`;
  status: string;
}

const chains = {
  [SupportedChainId.ETH_SEPOLIA]: sepolia,
  [SupportedChainId.AVAX_FUJI]: avalancheFuji,
  [SupportedChainId.BASE_SEPOLIA]: baseSepolia,
};

export function useCrossChainTransfer() {
  const [currentStep, setCurrentStep] = useState<TransferStep>("idle");
  const [logs, setLogs] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const DEFAULT_DECIMALS = 6;

  const addLog = (message: string) =>
    setLogs((prev) => [...prev, `${message}`]);

  const getPublicClient = (chainId: SupportedChainId) => {
    return createPublicClient({
      chain: chains[chainId],
      transport: http(),
    });
  };

  const getClients = (privateKey: string, chainId: SupportedChainId) => {
    const account = privateKeyToAccount(`0x${privateKey}`, { nonceManager });

    return createWalletClient({
      chain: chains[chainId],
      transport: http(),
      account,
    });
  };

  const getBalance = async (privateKey: string, chainId: SupportedChainId) => {
    const publicClient = getPublicClient(chainId);
    const account = privateKeyToAccount(`0x${privateKey}`, { nonceManager });

    const balance = await publicClient.readContract({
      address: CHAIN_IDS_TO_USDC_ADDRESSES[chainId],
      abi: [
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          payable: false,
          stateMutability: "view",
          type: "function",
        },
      ],
      functionName: "balanceOf",
      args: [account.address],
    });

    const formattedBalance = formatUnits(balance, DEFAULT_DECIMALS);

    return formattedBalance;
  };

  const approveUSDC = async (
    client: WalletClient<HttpTransport, Chain, Account>,
    sourceChainId: number
  ) => {
    setCurrentStep("approving");
    addLog("Approving USDC transfer...");

    try {
      const tx = await client.sendTransaction({
        to: CHAIN_IDS_TO_USDC_ADDRESSES[sourceChainId] as `0x${string}`,
        data: encodeFunctionData({
          abi: [
            {
              type: "function",
              name: "approve",
              stateMutability: "nonpayable",
              inputs: [
                { name: "spender", type: "address" },
                { name: "amount", type: "uint256" },
              ],
              outputs: [{ name: "", type: "bool" }],
            },
          ],
          functionName: "approve",
          args: [
            CHAIN_IDS_TO_TOKEN_MESSENGER[sourceChainId],
            BigInt(10000000000),
          ],
        }),
      });

      addLog(`USDC Approval Tx: ${tx}`);
      return tx;
    } catch (err) {
      setError("Approval failed");
      throw err;
    }
  };

  const burnUSDC = async (
    client: WalletClient<HttpTransport, Chain, Account>,
    sourceChainId: number,
    amount: bigint,
    destinationChainId: number,
    destinationAddress: string,
    transferType: "fast" | "standard"
  ) => {
    setCurrentStep("burning");
    addLog("Burning USDC...");

    try {
      const finalityThreshold = transferType === "fast" ? 1000 : 2000;
      const maxFee = amount - BigInt(1);
      const mintRecipient = `0x${destinationAddress
        .replace(/^0x/, "")
        .padStart(64, "0")}`;

      const tx = await client.sendTransaction({
        to: CHAIN_IDS_TO_TOKEN_MESSENGER[sourceChainId] as `0x${string}`,
        data: encodeFunctionData({
          abi: [
            {
              type: "function",
              name: "depositForBurn",
              stateMutability: "nonpayable",
              inputs: [
                { name: "amount", type: "uint256" },
                { name: "destinationDomain", type: "uint32" },
                { name: "mintRecipient", type: "bytes32" },
                { name: "burnToken", type: "address" },
                { name: "hookData", type: "bytes32" },
                { name: "maxFee", type: "uint256" },
                { name: "finalityThreshold", type: "uint32" },
              ],
              outputs: [],
            },
          ],
          functionName: "depositForBurn",
          args: [
            amount,
            DESTINATION_DOMAINS[destinationChainId],
            mintRecipient as Hex,
            CHAIN_IDS_TO_USDC_ADDRESSES[sourceChainId],
            "0x0000000000000000000000000000000000000000000000000000000000000000",
            maxFee,
            finalityThreshold,
          ],
        }),
      });

      addLog(`Burn Tx: ${tx}`);
      return tx;
    } catch (err) {
      setError("Burn failed");
      throw err;
    }
  };

  const retrieveAttestation = async (
    transactionHash: string,
    sourceChainId: number
  ) => {
    setCurrentStep("waiting-attestation");
    addLog("Retrieving attestation...");

    const url = `https://iris-api-sandbox.circle.com/v2/messages/${DESTINATION_DOMAINS[sourceChainId]}?transactionHash=${transactionHash}`;

    while (true) {
      try {
        const response = await axios.get(url);
        if (response.data?.messages?.[0]?.status === "complete") {
          addLog("Attestation retrieved!");
          return response.data.messages[0];
        }
        addLog("Waiting for attestation...");
        await new Promise((resolve) => setTimeout(resolve, 5000));
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          await new Promise((resolve) => setTimeout(resolve, 5000));
          continue;
        }
        setError("Attestation retrieval failed");
        throw error;
      }
    }
  };

  const mintUSDC = async (
    client: WalletClient<HttpTransport, Chain, Account>,
    destinationChainId: number,
    attestation: MessageAttestation
  ) => {
    const MAX_RETRIES = 3;
    let retries = 0;
    setCurrentStep("minting");
    addLog("Minting USDC...");

    while (retries < MAX_RETRIES) {
      try {
        const publicClient = getPublicClient(destinationChainId);
        const feeData = await publicClient.estimateFeesPerGas();
        const contractConfig = {
          address: CHAIN_IDS_TO_MESSAGE_TRANSMITTER[
            destinationChainId
          ] as `0x${string}`,
          abi: [
            {
              type: "function",
              name: "receiveMessage",
              stateMutability: "nonpayable",
              inputs: [
                { name: "message", type: "bytes" },
                { name: "attestation", type: "bytes" },
              ],
              outputs: [],
            },
          ] as const,
        };

        // Estimate gas with buffer
        const gasEstimate = await publicClient.estimateContractGas({
          ...contractConfig,
          functionName: "receiveMessage",
          args: [attestation.message, attestation.attestation],
          account: client.account,
        });

        // Add 20% buffer to gas estimate
        const gasWithBuffer = (gasEstimate * BigInt(150)) / BigInt(100);
        addLog(`Gas Used: ${formatUnits(gasWithBuffer, 9)} Gwei`);

        const tx = await client.sendTransaction({
          to: contractConfig.address,
          data: encodeFunctionData({
            ...contractConfig,
            functionName: "receiveMessage",
            args: [attestation.message, attestation.attestation],
          }),
          gas: gasWithBuffer,
          maxFeePerGas: feeData.maxFeePerGas,
          maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
        });

        addLog(`Mint Tx: ${tx}`);
        setCurrentStep("completed");
        break;
      } catch (err) {
        if (err instanceof TransactionExecutionError && retries < MAX_RETRIES) {
          retries++;
          addLog(`Retry ${retries}/${MAX_RETRIES}...`);
          await new Promise((resolve) => setTimeout(resolve, 2000 * retries));
          continue;
        }
        throw err;
      }
    }
  };

  const executeTransfer = async (
    privateKey: string,
    sourceChainId: number,
    destinationChainId: number,
    amount: string,
    transferType: "fast" | "standard"
  ) => {
    try {
      const numericAmount = parseUnits(amount, DEFAULT_DECIMALS);
      const account = privateKeyToAccount(`0x${privateKey}`);
      const defaultDestination = account.address;
      const sourceClient = getClients(privateKey, sourceChainId);
      const destinationClient = getClients(privateKey, destinationChainId);
      const checkNativeBalance = async (chainId: SupportedChainId) => {
        const publicClient = getPublicClient(chainId);
        const balance = await publicClient.getBalance({
          address: defaultDestination,
        });
        return balance;
      };

      await approveUSDC(sourceClient, sourceChainId);
      const burnTx = await burnUSDC(
        sourceClient,
        sourceChainId,
        numericAmount,
        destinationChainId,
        defaultDestination,
        transferType
      );
      const attestation = await retrieveAttestation(burnTx, sourceChainId);
      const minBalance = parseEther("0.01"); // 0.01 native token
      const balance = await checkNativeBalance(destinationChainId);
      if (balance < minBalance) {
        throw new Error("Insufficient native token for gas fees");
      }
      await mintUSDC(destinationClient, destinationChainId, attestation);
    } catch (error) {
      setCurrentStep("error");
      addLog(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  };

  const reset = () => {
    setCurrentStep("idle");
    setLogs([]);
    setError(null);
  };

  return {
    currentStep,
    logs,
    error,
    executeTransfer,
    getBalance,
    reset,
  };
}

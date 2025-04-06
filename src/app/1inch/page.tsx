"use client";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useAccount, useSignTypedData, useWriteContract } from "wagmi";

import { getBalance, getQuoteFusion, getQuoteFusionPlus } from "./actions";
import { tokenAddresses, tokens } from "./constants";
import { mainnet, polygon, optimism, arbitrum, base } from "viem/chains";
import { NetworkEnum } from "@1inch/cross-chain-sdk";
import { useSocket } from "../SocketProvider";

interface Token {
  amount: number;
  symbol: string;
  chain: string;
}

interface TokenInputProps {
  label: string;
  value: Token;
  onChange: (value: Token) => void;
  balance?: string;
  disabled?: boolean;
}

const approveABI = [
  {
    constant: false,
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
];

function getChainIcon(chain: string) {
  const chainIcons: { [key: string]: string } = {
    ethereum: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    polygon: "https://cryptologos.cc/logos/polygon-matic-logo.png",
    optimism: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
    arbitrum: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
    base: "https://images.mirror-media.xyz/publication-images/cgqxxPdUFBDjgKna_dDir.png?height=200&width=200",
    bnb: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
  };
  return chainIcons[chain.toLowerCase()] || "https://placeholder.co/16";
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getChain(chain: string) {
  switch (chain) {
    case "ethereum":
      return mainnet;
    case "polygon":
      return polygon;
    case "optimism":
      return optimism;
    case "arbitrum":
      return arbitrum;
    case "base":
      return base;
    default:
      throw new Error("Unsupported chain");
  }
}

function TokenInput({ label, value, onChange, disabled }: TokenInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string>();
  const [selectedChain, setSelectedChain] = useState<string>();
  const [showChains, setShowChains] = useState(false);
  const [balanceValue, setBalanceValue] = useState<string>();

  const { address } = useAccount();

  const chain = label.split("(")[1]?.split(")")[0].toLowerCase();
  const icon = chain ? getChainIcon(chain) : undefined;

  useEffect(() => {
    if (selectedToken && selectedChain && address) {
      setBalanceValue("0.0");

      const tokenAddressesOfChain =
        tokenAddresses[selectedChain as keyof typeof tokenAddresses];

      const tokenAddress =
        tokenAddressesOfChain[
          selectedToken as keyof typeof tokenAddressesOfChain
        ];

      getBalance(address, selectedChain, tokenAddress)
        .then((balance) => {
          console.log("Balance:", balance);

          const selectedTokenBalance = balance.find(
            (token: any) =>
              token.address.toLowerCase() === tokenAddress.toLowerCase()
          );

          if (selectedTokenBalance && selectedTokenBalance.wallets[address]) {
            const rawBalance = selectedTokenBalance.wallets[address].balance;
            const decimals = selectedTokenBalance.decimals;
            const formattedBalance =
              Number(rawBalance) / Math.pow(10, decimals);
            setBalanceValue(formattedBalance.toFixed(4));
          }
        })
        .catch((error) => {
          console.error("Error fetching balance:", error);
        });
    }
  }, [selectedToken, selectedChain, address]);

  const onSelectToken = (token: {
    symbol: string;
    name: string;
    icon: string;
    selectedChain?: string;
  }) => {
    onChange({
      amount: value.amount,
      symbol: token.symbol,
      chain: token.selectedChain || "",
    });
    setIsOpen(false);
  };

  return (
    <div className="bg-[#1C1C1C] rounded-xl p-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-400">{label}</span>
        {balanceValue && (
          <span className="text-sm text-gray-400">
            Balance: {Number(balanceValue) === 0 ? "0.0" : balanceValue}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={
            disabled && value.amount != 0
              ? value.amount.toFixed(6)
              : value.amount || ""
          }
          disabled={disabled}
          onChange={(e) => {
            const inpValue = e.target.value;

            onChange({
              amount: inpValue ? parseFloat(inpValue) : 0,
              symbol: value.symbol,
              chain: value.chain,
            });
          }}
          placeholder="0.0"
          className="w-full bg-transparent text-2xl outline-none text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#2C2C2C] hover:bg-[#3C3C3C] text-white px-3 py-1 rounded-lg text-sm"
          >
            {!chain || !icon ? (
              "Select"
            ) : (
              <div className="flex items-center justify-center gap-1 min-w-20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={icon} alt={chain} className="w-4 h-4" />
                {capitalizeFirstLetter(chain)}
              </div>
            )}
          </button>

          {isOpen && (
            <div className="fixed inset-0 bg-black backdrop-opacity-50 flex items-center justify-center z-50">
              <div className="bg-[#1C1C1C] rounded-xl p-4 w-96 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-medium">Select Token</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2">
                  {tokens.map((token) => {
                    return (
                      <div key={token.symbol}>
                        <button
                          className="w-full flex items-center gap-2 p-2 hover:bg-[#2C2C2C] rounded-lg"
                          onClick={() => {
                            setSelectedToken(token.symbol);

                            if (selectedToken === token.symbol) {
                              setShowChains(!showChains);
                            } else {
                              setShowChains(true);
                            }
                          }}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={token.icon}
                            alt={token.symbol}
                            className="w-8 h-8"
                          />
                          <div className="text-left">
                            <div>{token.symbol}</div>
                            <div className="text-sm text-gray-400">
                              {token.name}
                            </div>
                          </div>
                        </button>
                        {showChains &&
                          selectedToken &&
                          selectedToken === token.symbol && (
                            <div className="bg-[#2C2C2C] rounded-lg p-2 mt-1">
                              <div className="text-sm text-gray-400 mb-2">
                                Select chain:
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {token.chains.map((chain) => (
                                  <button
                                    key={chain}
                                    className="flex items-center gap-1 bg-[#3C3C3C] hover:bg-[#4C4C4C] rounded-full px-3 py-1"
                                    onClick={() => {
                                      setSelectedChain(chain);
                                      onSelectToken({
                                        ...token,
                                        selectedChain: chain,
                                      });
                                    }}
                                  >
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                      src={getChainIcon(chain)}
                                      alt={chain}
                                      className="w-4 h-4"
                                      onError={(e) =>
                                        (e.currentTarget.src =
                                          "https://placeholder.co/16")
                                      }
                                    />
                                    <span className="text-xs capitalize">
                                      {chain}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}

const Page = ({ hidebg }: { hidebg?: boolean }) => {
  const [fromToken, setFromToken] = useState<{
    amount: number;
    symbol: string;
    chain: string;
  }>({
    amount: 0,
    symbol: "",
    chain: "",
  });
  const [toToken, setToToken] = useState<{
    amount: number;
    symbol: string;
    chain: string;
  }>({
    amount: 0,
    symbol: "",
    chain: "",
  });
  const [toTokenAmount, setToTokenAmount] = useState(0);
  const [fromTokenPrice, setFromTokenPrice] = useState(0);
  const [fromTokenVolume, setFromTokenVolume] = useState(0);
  const [toTokenPrice, setToTokenPrice] = useState(0);
  const [toTokenVolume, setToTokenVolume] = useState(0);
  const [slippage, setSlippage] = useState(0);

  const { isConnected, address, connector } = useAccount();
  const { signTypedDataAsync } = useSignTypedData();
  const { data: hash, writeContractAsync } = useWriteContract();

  const { socket, isConnected: isSocketConnected } = useSocket();

  useEffect(() => {
    if (!socket || !address) return;

    socket.on("signTypedData", (data: any) => {
      console.log("Received signTypedData event:", data);
      const { primaryType, domain, types, message } = data;
      signTypedDataAsync({
        primaryType,
        domain,
        types,
        message,
      })
        .then(async (signature) => {
          console.log(
            "Signature:",
            signature,
            `signatureResponse ${address?.toLowerCase()}`
          );
          socket.emit(`signatureResponse ${address?.toLowerCase()}`, signature);
        })
        .catch((error) => {
          console.error("Error signing typed data:", error);
        });
    });

    return () => {
      socket.off("signTypedData");
    };
  }, [socket, address]);

  const interchangeTokens = () => {
    const currentFromToken = fromToken;
    const currentToToken = toToken;
    const currentFromTokenPrice = fromTokenPrice;
    const currentFromTokenVolume = fromTokenVolume;
    const currentToTokenPrice = toTokenPrice;
    const currentToTokenVolume = toTokenVolume;

    setFromToken({
      ...currentToToken,
      amount: toTokenAmount,
    });
    setToToken({
      ...currentFromToken,
    });
    setFromTokenPrice(currentToTokenPrice);
    setFromTokenVolume(currentToTokenVolume);
    setToTokenPrice(currentFromTokenPrice);
    setToTokenVolume(currentFromTokenVolume);
  };

  const swapTokens = async () => {
    if (!address) return;
    console.log("Swapping tokens");

    const fromChain = fromToken.chain as keyof typeof tokenAddresses;
    const fromChainEnum = (() => {
      if (fromChain === "base") return "COINBASE";
      else return fromChain.toUpperCase();
    })();
    const chainId = NetworkEnum[fromChainEnum as keyof typeof NetworkEnum];

    const fromTokenAddresses =
      tokenAddresses[fromToken.chain as keyof typeof tokenAddresses];
    const fromTokenAddress =
      fromTokenAddresses[fromToken.symbol as keyof typeof fromTokenAddresses];

    if (!connector || !connector.switchChain) return;

    await connector.switchChain({ chainId });

    await writeContractAsync({
      abi: approveABI,
      address: fromTokenAddress as `0x`,
      functionName: "approve",
      args: [
        "0x111111125421ca6dc452d289314280a0f8842a65", // aggregation router v6
        2n ** 256n - 1n,
      ],
    });

    socket?.emit("fusionPlusSwap", {
      fromToken,
      toToken,
      walletAddress: address,
    });
  };

  useEffect(() => {
    if (
      fromToken.symbol &&
      fromToken.amount &&
      fromToken.chain &&
      toToken.symbol &&
      toToken.chain
    ) {
      if (fromToken.chain === toToken.chain) {
        getQuoteFusion({
          fromToken,
          toToken,
          walletAddress: address,
        }).then((order) => {
          setFromTokenPrice(fromToken.amount / Number(order.toTokenAmount));
          setFromTokenVolume(Number(order.volume.fromToken));
          setToTokenPrice(Number(order.toTokenAmount) / fromToken.amount);
          setToTokenVolume(Number(order.volume.toToken));
          setSlippage(Number(order.slippage));
          setToTokenAmount(Number(order.toTokenAmount));
        });
      } else {
        getQuoteFusionPlus({
          fromToken,
          toToken,
          walletAddress: address,
        }).then((order) => {
          setFromTokenPrice(fromToken.amount / Number(order.toTokenAmount));
          // setFromTokenVolume(Number(order.volume.fromToken));
          setToTokenPrice(Number(order.toTokenAmount) / fromToken.amount);
          // setToTokenVolume(Number(order.volume.toToken));
          setSlippage(order.slippage ?? Number(order.slippage));
          setToTokenAmount(Number(order.toTokenAmount));
        });
      }
    }
  }, [fromToken, toToken]);

  return (
    <div
      className={`text-white flex items-center justify-center p-4 ${
        hidebg ? "bg-[]" : "bg-[#000] min-h-screen "
      }`}
      style={
        hidebg
          ? {}
          : {
              backgroundImage:
                "url(https://1inch.io/img/main/main-bg-0_1.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
      }
    >
      <div
        className={`w-full max-w-md  rounded-2xl p-4 shadow-xl ${
          hidebg ? "bg-[#000]" : ""
        }`}
      >
        <div className="bg-[#111] p-5 rounded-2xl">
          {isConnected ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="logo_logoWrap__uGZjE flex items-center gap-2 justify-center mb-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-10 h-10"
                    src="https://cdn.1inch.io/logo.png"
                    alt=""
                    loading="lazy"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className=" h-6 "
                    src="https://1inch.io/img/logo-text.svg#text"
                    alt=""
                    loading="lazy"
                    style={{
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </div>
                <button className="text-gray-400 hover:text-white">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1.51 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1.51H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1.51-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <TokenInput
                  label={`From: ${fromToken.symbol} ${
                    fromToken.chain
                      ? `(${capitalizeFirstLetter(fromToken.chain)})`
                      : ""
                  }`}
                  value={fromToken}
                  onChange={setFromToken}
                  balance="0.0"
                />

                <div className="flex justify-center -my-2">
                  <button
                    className="bg-[#1C1C1C] p-2 rounded-full hover:bg-[#2C2C2C]"
                    onClick={interchangeTokens}
                  >
                    <ArrowDownIcon className="w-4 h-4" />
                  </button>
                </div>

                <TokenInput
                  label={`To: ${toToken.symbol} ${
                    toToken.chain
                      ? `(${capitalizeFirstLetter(toToken.chain)})`
                      : ""
                  }`}
                  disabled
                  value={{
                    ...toToken,
                    amount: toTokenAmount,
                  }}
                  onChange={setToToken}
                  balance="0.0"
                />
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-400">
                {slippage ? (
                  <div className="flex justify-between">
                    <span>Slippage</span>
                    <span>{slippage}%</span>
                  </div>
                ) : null}
                <div className="flex justify-between">
                  <span>Price</span>
                  <span>
                    1 {fromToken.symbol} = {toTokenPrice.toFixed(6)}{" "}
                    {toToken.symbol}
                  </span>
                </div>
              </div>

              <button
                className="w-full mt-4 bg-[#fbbf24] hover:bg-[#fbbf24] text-[#000] py-2 rounded-full font-bold"
                onClick={swapTokens}
              >
                Swap
              </button>
            </>
          ) : (
            <>
              <div className="logo_logoWrap__uGZjE flex items-center gap-2 justify-center mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="w-10 h-10"
                  src="https://cdn.1inch.io/logo.png"
                  alt=""
                  loading="lazy"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className=" h-6 "
                  src="https://1inch.io/img/logo-text.svg#text"
                  alt=""
                  loading="lazy"
                  style={{
                    filter: "brightness(0) invert(1)",
                  }}
                />
              </div>
              <div className="text-center text-gray-400">
                Please connect your wallet to use the Swap feature.
              </div>
            </>
          )}
        </div>

        <div className="grid place-content-center connect-wallet mt-3">
          <ConnectButton />
        </div>

        <div className="text-center text-sm text-gray-400 mt-4">
          Powered by <span className="font-bold text-white">⚡ Boop</span>
        </div>
      </div>
    </div>
  );
};

export default Page;

"use server";

import {
  FusionSDK,
  NetworkEnum,
  OrderStatus,
  PrivateKeyProviderConnector,
  Web3Like,
} from "@1inch/fusion-sdk";
import {
  SDK as FusionPlusSDK,
  HashLock,
  PresetEnum,
  Quote,
} from "@1inch/cross-chain-sdk";
import {
  Contract,
  ethers,
  JsonRpcProvider,
  randomBytes,
  solidityPackedKeccak256,
  Wallet,
} from "ethers";
import axios from "axios";
import { mainnet, polygon, optimism, arbitrum, base } from "viem/chains";
import { tokens, tokenAddresses } from "./constants";

const DEV_PORTAL_API_TOKEN = process.env.API_KEY_1INCH;

interface Token {
  amount: number;
  symbol: string;
  chain: string;
}

interface SwapParams {
  fromToken: Token;
  toToken: Token;
  walletAddress?: string;
  signature?: string;
}

function getChainId(chain: string): string {
  const chainIds = {
    mainnet: "1",
    polygon: "137",
    optimism: "10",
    arbitrum: "42161",
    base: "8453",
  };
  return chainIds[chain as keyof typeof chainIds] || "1";
}

async function getQuoteFusion({
  fromToken,
  toToken,
  walletAddress,
}: SwapParams) {
  const fromTokenAddresses =
    tokenAddresses[fromToken.chain as keyof typeof tokenAddresses];
  const toTokenAddresses =
    tokenAddresses[toToken.chain as keyof typeof tokenAddresses];

  const fromTokenAddress =
    fromTokenAddresses[fromToken.symbol as keyof typeof fromTokenAddresses];
  const toTokenAddress =
    toTokenAddresses[toToken.symbol as keyof typeof toTokenAddresses];

  if (!fromTokenAddress || !toTokenAddress) {
    throw new Error("Invalid token symbols");
  }

  const fromTokenInfo = tokens.find((t) => t.symbol === fromToken.symbol);
  const toTokenInfo = tokens.find((t) => t.symbol === toToken.symbol);
  if (!fromTokenInfo) {
    throw new Error("From token information not found");
  }
  if (!toTokenInfo) {
    throw new Error("To token information not found");
  }

  const fromDecimals = fromTokenInfo.decimals;
  const toDecimals = toTokenInfo.decimals;

  const fromChain = fromToken.chain as keyof typeof tokenAddresses;
  const fromChainEnum = (() => {
    if (fromChain === "base") return "COINBASE";
    else return fromChain.toUpperCase();
  })();

  try {
    const sdk = new FusionSDK({
      url: "https://fusion.1inch.io",
      network: NetworkEnum[fromChainEnum as keyof typeof NetworkEnum],
      authKey: DEV_PORTAL_API_TOKEN,
    });

    const quote = await sdk.getQuote({
      fromTokenAddress: fromTokenAddress,
      toTokenAddress: toTokenAddress,
      amount: ethers
        .parseUnits(fromToken.amount.toString(), fromDecimals)
        .toString(),
      walletAddress: walletAddress,
    });

    return {
      volume: quote.volume.usd,
      toTokenAmount: ethers.formatUnits(quote.toTokenAmount, toDecimals),
      slippage: quote.slippage,
    };
  } catch (error) {
    console.error("Quote failed:", error);
    throw error;
  }
}

async function getQuoteFusionPlus({
  fromToken,
  toToken,
  walletAddress,
}: SwapParams) {
  const fromTokenAddresses =
    tokenAddresses[fromToken.chain as keyof typeof tokenAddresses];
  const toTokenAddresses =
    tokenAddresses[toToken.chain as keyof typeof tokenAddresses];

  const fromTokenAddress =
    fromTokenAddresses[fromToken.symbol as keyof typeof fromTokenAddresses];
  const toTokenAddress =
    toTokenAddresses[toToken.symbol as keyof typeof toTokenAddresses];

  if (!fromTokenAddress || !toTokenAddress) {
    throw new Error("Invalid token symbols");
  }

  const fromTokenInfo = tokens.find((t) => t.symbol === fromToken.symbol);
  const toTokenInfo = tokens.find((t) => t.symbol === toToken.symbol);
  if (!fromTokenInfo) {
    throw new Error("From token information not found");
  }
  if (!toTokenInfo) {
    throw new Error("To token information not found");
  }

  const fromDecimals = fromTokenInfo.decimals;
  const toDecimals = toTokenInfo.decimals;

  const fromChain = fromToken.chain as keyof typeof tokenAddresses;
  const fromChainEnum = (() => {
    if (fromChain === "base") return "COINBASE";
    else return fromChain.toUpperCase();
  })();

  const toChain = toToken.chain as keyof typeof tokenAddresses;
  const toChainEnum = (() => {
    if (toChain === "base") return "COINBASE";
    else return toChain.toUpperCase();
  })();

  try {
    const sdk = new FusionPlusSDK({
      url: "https://api.1inch.dev/fusion-plus",
      authKey: DEV_PORTAL_API_TOKEN,
    });

    const quote = await sdk.getQuote({
      srcChainId:
        NetworkEnum[
          fromChainEnum as Exclude<keyof typeof NetworkEnum, "FANTOM">
        ],
      dstChainId:
        NetworkEnum[toChainEnum as Exclude<keyof typeof NetworkEnum, "FANTOM">],
      srcTokenAddress: fromTokenAddress,
      dstTokenAddress: toTokenAddress,
      amount: ethers
        .parseUnits(fromToken.amount.toString(), fromDecimals)
        .toString(),
      enableEstimate: true,
      walletAddress: walletAddress,
    });

    return {
      volume: quote.volume.usd,
      toTokenAmount: ethers.formatUnits(quote.dstTokenAmount, toDecimals),
      slippage: undefined,
    };
  } catch (error) {
    console.error("Quote failed:", error);
    throw error;
  }
}

const getBalance = async (
  walletAddress: string,
  chain: string,
  tokenAddress: string
) => {
  const url = `https://api.1inch.dev/balance/v1.2/${getChainId(
    chain
  )}/aggregatedBalancesAndAllowances/${tokenAddress}`;

  const config = {
    headers: {
      Authorization: `Bearer ${DEV_PORTAL_API_TOKEN}`,
    },
    params: {
      wallets: walletAddress,
      filterEmpty: "true",
    },
    paramsSerializer: {
      indexes: null,
    },
  };

  try {
    const response = await axios.get(url, config);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch portfolio balance:", error);
    throw error;
  }
};

export { getQuoteFusion, getQuoteFusionPlus, getBalance };

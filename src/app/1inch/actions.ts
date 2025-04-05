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
import { mainnet, polygon, optimism, arbitrum, base } from "viem/chains";
import { tokens, tokenAddresses } from "./constants";

const bigNumberify = require("bignumberify");

const DEV_PORTAL_API_TOKEN = process.env.API_KEY_1INCH;

let latestQuote: Quote | null = null;

// const ERC20_ABI = [
//   "function approve(address spender, uint256 amount) public returns (bool)",
//   "function allowance(address owner, address spender) public view returns (uint256)",
// ];

interface Token {
  amount: number;
  symbol: string;
  chain: string;
}

type MerkleLeaf = string & {
  _tag: "MerkleLeaf";
};

interface SwapParams {
  fromToken: Token;
  toToken: Token;
  walletAddress?: string;
  signature?: string;
}

function getNodeUrl(chain: string) {
  switch (chain) {
    case "ethereum":
      return mainnet.rpcUrls.default.http[0];
    case "polygon":
      return polygon.rpcUrls.default.http[0];
    case "optimism":
      return optimism.rpcUrls.default.http[0];
    case "arbitrum":
      return arbitrum.rpcUrls.default.http[0];
    case "base":
      return base.rpcUrls.default.http[0];
    default:
      throw new Error("Unsupported chain");
  }
}

function getRandomBytes32() {
  // for some reason the cross-chain-sdk expects a leading 0x and can't handle a 32 byte long hex string
  return "0x" + Buffer.from(randomBytes(32)).toString("hex");
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

export { getQuoteFusion, getQuoteFusionPlus };

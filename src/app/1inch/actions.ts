"use server";

import {
  FusionSDK,
  NetworkEnum,
  OrderStatus,
  PrivateKeyProviderConnector,
  Web3Like,
} from "@1inch/fusion-sdk";
import { Contract, ethers, JsonRpcProvider, Wallet } from "ethers";
import { tokens, tokenAddresses } from "./constants";

const DEV_PORTAL_API_TOKEN = process.env.API_KEY_1INCH;

// const ERC20_ABI = [
//   "function approve(address spender, uint256 amount) public returns (bool)",
//   "function allowance(address owner, address spender) public view returns (uint256)",
// ];

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

async function getQuoteFusion({ fromToken, toToken }: SwapParams) {
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
    if (fromChain === "bnb") return "BINANCE";
    else return fromChain.toUpperCase();
  })();

  try {
    const sdk = new FusionSDK({
      url: "https://fusion.1inch.io",
      network: NetworkEnum[fromChainEnum as keyof typeof NetworkEnum],
      authKey: DEV_PORTAL_API_TOKEN,
    });

    console.log(sdk);

    const quote = await sdk.getQuote({
      fromTokenAddress: fromTokenAddress,
      toTokenAddress: toTokenAddress,
      amount: ethers
        .parseUnits(fromToken.amount.toString(), fromDecimals)
        .toString(),
    });

    console.log("Order created", quote);

    return {
      volume: quote.volume.usd,
      toTokenAmount: ethers.formatUnits(quote.toTokenAmount, toDecimals),
      slippage: quote.slippage,
    };
  } catch (error) {
    console.error("Order creation failed:", error);
    throw error;
  }
}

// async function swapWithFusion({
//   fromToken,
//   toToken,
//   walletAddress,
//   signature,
// }: SwapParams) {
//   try {
//     const provider = new JsonRpcProvider(process.env.RPC_URL);

//     // Initialize Fusion SDK
//     const sdk = new FusionSDK({
//       url: "https://fusion.1inch.io",
//       network: NetworkEnum.ETHEREUM,
//       authKey: DEV_PORTAL_API_TOKEN,
//     });

//     // Create order
//     const order = await sdk.createOrder({
//       fromTokenAddress: fromToken.address,
//       toTokenAddress: toToken.address,
//       amount: ethers.parseUnits(fromToken.amount.toString(), 18), // Adjust decimals as needed
//       walletAddress: walletAddress,
//     });

//     // Submit order with signature
//     const submittedOrder = await sdk.submitOrder({
//       order,
//       signature,
//     });

//     return {
//       success: true,
//       orderId: submittedOrder.orderHash,
//       status: submittedOrder.status,
//     };
//   } catch (error) {
//     console.error("Swap failed:", error);
//     return {
//       success: false,
//       error: error.message,
//     };
//   }
// }

export { getQuoteFusion };

import { AirdropABI } from "@/constants/AirdropABI";
import { ethers } from "ethers";

export const TokenAirdrop = async ({
  walletAddress,
  amount,
  tokenAddress,
}: {
  walletAddress: string;
  amount: number;
  tokenAddress: string;
}) => {
  try {
    if (!process.env.AIRDROP_KEY) {
      throw new Error("AIRDROP_KEY is not set");
    }

    const config = {
      chainid: 545,
      provider: "https://testnet.evm.nodes.onflow.org",
    };

    const provider = new ethers.JsonRpcProvider(config.provider);
    const wallet = new ethers.Wallet(process.env.AIRDROP_KEY!, provider);
    const contractAddress = "0x220f58F49d4E17E2E0f3A5E17E62DE21E69b2037";
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice;
    const nonce = await provider.getTransactionCount(wallet.address);

    const contract = new ethers.Contract(
      contractAddress,
      AirdropABI as unknown as ethers.InterfaceAbi,
      wallet
    );

    const airdrop = await contract.mint(
      walletAddress,
      ethers.parseEther(amount.toString()).toString(),
      {
        gasPrice: gasPrice,
        nonce,
      }
    );
    console.log(airdrop);

    return airdrop;
  } catch (error) {
    console.log(error);
    return null;
  }
};

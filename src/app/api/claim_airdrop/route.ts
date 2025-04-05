import { TokenAirdrop } from "@/lib/airdrop";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { walletAddress } = await request.json();

  const tx = await TokenAirdrop({
    walletAddress: walletAddress,
    amount: 0.01,
    tokenAddress: "0x0000000000000000000000000000000000000000",
  });

  return NextResponse.json({ message: "Airdrop claimed", hash: tx.hash });
}

"use client";
import { TokenAirdrop } from "@/lib/airdrop";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { toast } from "sonner";
import { useAccount } from "wagmi";

const Page = ({ hidebg }: { hidebg?: boolean }) => {
  const { isConnected, address } = useAccount();

  const handleAirdrop = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }
    await TokenAirdrop({
      walletAddress: address,
      amount: 100,
      tokenAddress: "0x0000000000000000000000000000000000000000",
    });
  };

  return (
    <div
      className={`text-white flex items-center justify-center p-4 ${
        hidebg ? "bg-[]" : "bg-[#000] min-h-screen "
      }`}
      style={
        hidebg
          ? {}
          : {
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
                    src="https://cdn.prod.website-files.com/60f008ba9757da0940af288e/64815c2d323cf5cd2611c08d_2.png"
                    alt=""
                    loading="lazy"
                  />
                  Claim $DUCK
                </div>
              </div>
              <p className="text-sm text-gray-400">
                You are eligible for the airdrop
              </p>
              <button
                className="w-full mt-4 bg-[#fbbf24] hover:bg-[#fbbf24] text-[#000] py-2 rounded-full font-bold"
                onClick={handleAirdrop}
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
                  src="https://cdn.prod.website-files.com/60f008ba9757da0940af288e/64815c2d323cf5cd2611c08d_2.png"
                  alt=""
                  loading="lazy"
                />{" "}
                Claim $DUCK
              </div>
              <div className="text-center text-gray-400">
                Please connect your wallet to claim your airdrop.
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

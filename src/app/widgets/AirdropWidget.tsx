"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { toast } from "sonner";
import { useAccount } from "wagmi";

interface AirdropWidgetProps {
  hidebg?: boolean;
}

const AirdropWidget = ({ hidebg }: AirdropWidgetProps) => {
  const { isConnected, address } = useAccount();
  const [hash, setHash] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAirdrop = async () => {
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/claim_airdrop", {
      method: "POST",
      body: JSON.stringify({ walletAddress: address }),
    });
    const data = await res.json();
    setHash(data.hash);
    setLoading(false);
  };

  return (
    <div
      className={`text-white flex items-center h-[700px] justify-center  ${
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
        className={`w-full  rounded-2xl shadow-xl ${hidebg ? "bg-[#000]" : ""}`}
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

              {hash ? (
                <>
                  <a
                    href={`https://evm-testnet.flowscan.io/tx/${hash}`}
                    target="_BLANK"
                    className="w-full mt-4 bg-[#fbbf24] hover:bg-[#fbbf24] text-[#000] py-2 rounded-full font-bold block text-center"
                  >
                    View Transaction
                  </a>
                </>
              ) : (
                <button
                  className="w-full mt-4 bg-[#fbbf24] hover:bg-[#fbbf24] text-[#000] py-2 rounded-full font-bold"
                  onClick={handleAirdrop}
                  disabled={loading || hash !== null}
                >
                  {loading ? "Claiming..." : hash ? "Claimed" : "Claim $DUCK"}
                </button>
              )}
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

export default AirdropWidget;

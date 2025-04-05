"use client";

import WidgetWrapper from "@/components/widget/WidgetWrapper";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useAccount } from "wagmi";
import { TokenInput } from "../1inch/page";

const OneInchWidget = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const { isConnected } = useAccount();

  return (
    <div className="text-white">
      <WidgetWrapper title="">
        <div className="w-full h-full text-white">
          {isConnected ? (
            <>
              <div className="flex justify-between items-center mb-4">
                <div className="logo_logoWrap__uGZjE flex items-center gap-2 justify-center mb-2">
                  <img
                    className="w-10 h-10"
                    src="https://cdn.1inch.io/logo.png"
                    alt=""
                    loading="lazy"
                  />
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
                  label="From"
                  value={fromAmount}
                  onChange={setFromAmount}
                  balance="0.0"
                />

                <div className="flex justify-center -my-2">
                  <button className="bg-[#1C1C1C] p-2 rounded-full hover:bg-[#2C2C2C]">
                    <ArrowDownIcon className="w-4 h-4" />
                  </button>
                </div>

                <TokenInput
                  label="To"
                  value={toAmount}
                  onChange={setToAmount}
                  balance="0.0"
                />
              </div>

              <div className="mt-4 space-y-2 text-sm text-gray-400">
                <div className="flex justify-between">
                  <span>Price Impact</span>
                  <span>0.00%</span>
                </div>
                <div className="flex justify-between">
                  <span>Minimum received</span>
                  <span>0.00 USDC</span>
                </div>
                <div className="flex justify-between">
                  <span>Price</span>
                  <span>1 MON = 0.00 USDC</span>
                </div>
              </div>

              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium">
                Swap
              </button>
            </>
          ) : (
            <>
              <div className="logo_logoWrap__uGZjE flex items-center gap-2 justify-center mb-4">
                <img
                  className="w-10 h-10"
                  src="https://cdn.1inch.io/logo.png"
                  alt=""
                  loading="lazy"
                />
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

          <div className="grid place-content-center mt-5 widget_connect">
            <ConnectButton />
          </div>
        </div>
      </WidgetWrapper>
    </div>
  );
};

export default OneInchWidget;

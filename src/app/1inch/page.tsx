"use client";

import { ArrowDownIcon } from "@radix-ui/react-icons";
import { useState } from "react";

interface TokenInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  balance?: string;
}

function TokenInput({ label, value, onChange, balance }: TokenInputProps) {
  return (
    <div className="bg-[#1C1C1C] rounded-xl p-4">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-400">{label}</span>
        {balance && (
          <span className="text-sm text-gray-400">Balance: {balance}</span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="0.0"
          className="w-full bg-transparent text-2xl outline-none text-white"
        />
        <button className="bg-[#2C2C2C] hover:bg-[#3C3C3C] text-white px-3 py-1 rounded-lg text-sm">
          Select
        </button>
      </div>
    </div>
  );
}

const Page = () => {
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  return (
    <div
      className="min-h-screen bg-[#000] text-white flex items-center justify-center p-4"
      style={{
        backgroundImage: "url(https://1inch.io/img/main/main-bg-0_1.webp)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full max-w-md  rounded-2xl p-4 shadow-xl">
        <div className="logo_logoWrap__uGZjE flex items-center gap-2 justify-center mb-10">
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
        <div className="bg-[#111] p-5 rounded-2xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Swap</h2>
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
        </div>

        <div className="text-center text-sm text-gray-400 mt-4">
          Powered by <span className="font-bold text-white">⚡ Boop</span>
        </div>
      </div>
    </div>
  );
};

export default Page;

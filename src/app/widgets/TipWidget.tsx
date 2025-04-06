"use client";

import { CardFooter } from "@/components/ui/card";
import WidgetWrapper from "@/components/widget/WidgetWrapper";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { parseEther } from "viem";

import { useAccount, useSendTransaction } from "wagmi";

interface TipWidgetProps {
  hidebg?: boolean;
}

const TipWidget = ({ hidebg }: TipWidgetProps) => {
  const { isConnected } = useAccount();
  const tipAddress = "0xf1996154C34e3dc77b26437a102231785e9aD7fE";
  const [txHash, setTxHash] = useState<any>(null);

  const [value, setValue] = useState("");

  const { sendTransactionAsync } = useSendTransaction();

  const handleTip = async () => {
    const price = `0x${parseEther(value).toString(16)}`;
    const response = await sendTransactionAsync({
      to: tipAddress as `0x${string}`,
      value: BigInt(price),
      chainId: 84532,
    });

    setTxHash(response);
  };

  return (
    <div
      className={`text-white flex items-center justify-center p-4 ${
        hidebg ? "bg-[]" : "bg-[#000]  rounded-2xl "
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
        className={`w-full   rounded-2xl  shadow-xl ${
          hidebg ? "" : "bg-[#000]"
        }`}
      >
        <WidgetWrapper title="" hidebg={!hidebg}>
          <div className="w-full h-full text-white">
            {isConnected ? (
              <>
                <div className="grid place-content-center">
                  <img
                    src="https://images.emojiterra.com/google/android-12l/512px/1f35c.png"
                    className="w-10 h-10"
                  />
                </div>
                <div className="text-center text-gray-400 mt-4 font-bold">
                  Buy me a Ramen
                </div>
                <p className="text-sm mt-4 text-gray-400 text-center">
                  When a Legend falls, a Ramen cart shall rise!
                </p>

                <div className="space-y-4 w-full flex mt-6 text-2xl justify-center items-center">
                  {/* <span className="text-4xl text-white">$</span> */}
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="$50.00"
                    className="bg-transparent text-center text-4xl outline-none text-white ml-2"
                  />
                </div>

                <div className="w-full flex items-center justify-center gap-2 my-4">
                  {[5, 10, 25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setValue(amount.toString())}
                      className=" bg-[#000] text-white border-[#333] border hover:border-[#fbbf24] cursor-pointer py-1 rounded-full font-bold px-4"
                    >
                      {amount}
                    </button>
                  ))}
                </div>

                {txHash ? (
                  <a
                    href={`https://sepolia.basescan.org/tx/${txHash}`}
                    target="_BLANK"
                    className="w-full mt-4 bg-[#fbbf24] hover:bg-[#fbbf24] text-[#000] py-2 rounded-full font-bold block text-center"
                  >
                    View Transaction
                  </a>
                ) : (
                  <button
                    onClick={handleTip}
                    className="w-full mt-4 bg-[#fbbf24] hover:bg-[#fbbf24] text-[#000] py-2 rounded-full font-bold"
                  >
                    💰 Tip
                  </button>
                )}
              </>
            ) : (
              <>
                <div className="grid place-content-center">
                  <img
                    src="https://images.emojiterra.com/google/android-12l/512px/1f35c.png"
                    className="w-10 h-10"
                  />
                </div>
                <div className="text-center text-gray-400 mt-4 font-bold">
                  Buy me a Ramen
                </div>
                <p className="text-sm mt-4 text-gray-400 text-center">
                  When a Legend falls, a Ramen cart shall rise!
                </p>

                <div className="space-y-4 w-full flex mt-6 text-2xl justify-center items-center">
                  {/* <span className="text-4xl text-white">$</span> */}
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="$50.00"
                    className="bg-transparent text-center text-4xl outline-none text-white ml-2"
                  />
                </div>

                <div className="w-full flex items-center justify-center gap-2 my-4">
                  {[5, 10, 25, 50, 100].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setValue(amount.toString())}
                      className={` bg-[#000] text-white border-[#333] border hover:border-[#fbbf24] cursor-pointer py-1 rounded-full font-bold px-4 ${
                        Number(amount) == Number(value)
                          ? "bg-[#fbbf24] text-[#000]"
                          : ""
                      } `}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className="grid place-content-center mt-5 widget_connect connect-wallet">
              <ConnectButton />
            </div>
          </div>
        </WidgetWrapper>
        <CardFooter className="text-center grid place-content-center text-gray-100 text-sm mt-2">
          Powered by ⚡ Boop
        </CardFooter>
      </div>
    </div>
  );
};

export default TipWidget;

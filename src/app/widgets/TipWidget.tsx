"use client";

import { CardFooter } from "@/components/ui/card";
import WidgetWrapper from "@/components/widget/WidgetWrapper";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useAccount } from "wagmi";

const TipWidget = () => {
  const { isConnected } = useAccount();

  const [value, setValue] = useState("");
  return (
    <div className="text-white">
      <WidgetWrapper title="">
        <div className="w-full h-full text-white">
          {isConnected ? (
            <>
              <div className="space-y-4 flex items-center">
                $
                <input
                  type="text"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="0.0"
                  className="w-full bg-transparent text-2xl outline-none text-white ml-2"
                />
              </div>

              <button className="w-full mt-4 bg-[#fbbf24] hover:bg-[#fbbf24] text-white py-3 rounded-full font-bold">
                💰 Tip
              </button>
            </>
          ) : (
            <>
              <div className="grid place-content-center">
                <img
                  src="https://images.emojiterra.com/google/android-12l/512px/1f35c.png"
                  className="w-10 h-10"
                />
              </div>

              <div className="text-center text-gray-400 mt-4">
                Buy me a Ramen
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
  );
};

export default TipWidget;

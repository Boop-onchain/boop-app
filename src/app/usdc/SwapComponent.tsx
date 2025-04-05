"use client";

import { useEffect, useState } from "react";
import { useCrossChainTransfer } from "../../hooks/use-cross-chain-hooks";

import { Timer } from "../../components/timer";
import { TransferLog } from "../../components/transfer-log";

import { SuccessScreen } from "@/components/checkout/SuccessScreen";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import {
  CHAIN_TO_CHAIN_NAME,
  SUPPORTED_CHAINS,
  SupportedChainId,
} from "../../lib/chains";

export default function SwapComponent({
  price = 0.1,
  onComplete,
  onReset,
}: {
  price: number;
  onComplete: () => void;
  onReset: () => void;
}) {
  const { currentStep, logs, error, executeTransfer, getBalance, reset } =
    useCrossChainTransfer();
  const [sourceChain, setSourceChain] = useState<SupportedChainId>(
    SupportedChainId.BASE_SEPOLIA
  );
  const [destinationChain, setDestinationChain] = useState<SupportedChainId>(
    SupportedChainId.ETH_SEPOLIA
  );
  const [amount, setAmount] = useState("0.1");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isTransferring, setIsTransferring] = useState(false);
  const [showFinalTime, setShowFinalTime] = useState(false);
  const [transferType, setTransferType] = useState<"fast" | "standard">("fast");
  const [balance, setBalance] = useState("0");

  const handleStartTransfer = async () => {
    setIsTransferring(true);
    setShowFinalTime(false);
    setElapsedSeconds(0);

    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    if (!privateKey) {
      console.error("Missing private key");
      return;
    }

    await executeTransfer(
      privateKey,
      sourceChain,
      destinationChain,
      amount,
      transferType
    );
    setIsTransferring(false);
    setShowFinalTime(true);

    onComplete();
  };

  const handleReset = () => {
    reset();
    setIsTransferring(false);
    setShowFinalTime(false);
    setElapsedSeconds(0);
  };

  useEffect(() => {
    const privateKey = process.env.NEXT_PUBLIC_PRIVATE_KEY;

    if (!privateKey) return;

    const wrapper = async () => {
      const balance = await getBalance(privateKey, sourceChain);
      setBalance(balance);
    };

    const newDestinationChain = SUPPORTED_CHAINS.find(
      (chainId) => chainId !== sourceChain
    );

    if (newDestinationChain) {
      setDestinationChain(newDestinationChain);
    }

    wrapper();
  }, [sourceChain, showFinalTime]);

  return (
    <div className=" text-white">
      <div className="grid grid-cols-2 gap-4">
        {!showFinalTime ? (
          <div className="flex flex-col justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-sm text-gray-400">Price:</span>
              <span className="text-2xl text-white font-bold">
                ${price.toFixed(2)}
              </span>
            </div>

            <div className="space-y-2 flex justify-start items-center my-4">
              <span className="text-sm text-gray-400">Chain:</span>
              <Select
                value={String(sourceChain)}
                onValueChange={(value) => setSourceChain(Number(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select source chain" />
                </SelectTrigger>
                <SelectContent>
                  {SUPPORTED_CHAINS.map((chainId) => (
                    <SelectItem key={chainId} value={String(chainId)}>
                      {CHAIN_TO_CHAIN_NAME[chainId]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground ml-4">
                {balance} balance
              </p>
            </div>
          </div>
        ) : null}

        {/* <div className="space-y-2">
          <Label>Destination Chain</Label>
          <Select
            value={String(destinationChain)}
            onValueChange={(value) => setDestinationChain(Number(value))}
            disabled={!sourceChain}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select destination chain" />
            </SelectTrigger>
            <SelectContent>
              {SUPPORTED_CHAINS.filter(
                (chainId) => chainId !== sourceChain
              ).map((chainId) => (
                <SelectItem key={chainId} value={String(chainId)}>
                  {CHAIN_TO_CHAIN_NAME[chainId]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
      </div>

      {/* <div className="space-y-2"> */}
      {/* <Label>Amount (USDC)</Label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          min="0"
          max={parseFloat(balance)}
          step="any"
        /> */}
      {/* </div> */}

      {/* <ProgressSteps currentStep={currentStep} /> */}

      {error && <div className="text-red-500 text-center">{error}</div>}

      {!showFinalTime ? (
        <div className="flex justify-center gap-4">
          <Button
            className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black font-semibold rounded-full"
            size="lg"
            onClick={handleStartTransfer}
            disabled={isTransferring || currentStep === "completed"}
          >
            {currentStep === "completed" ? "Completed" : "Buy"}
          </Button>

          {/* {(currentStep === "completed" || currentStep === "error") && (
          <Button variant="outline" onClick={handleReset}>
            Reset
          </Button>
          )} */}
        </div>
      ) : null}

      <div className="text-center mt-2">
        {showFinalTime ? (
          <>
            <SuccessScreen logs={logs} onContinue={() => onReset()} />
            <div className="text-xs font-mono mt-2">
              <span>
                {Math.floor(elapsedSeconds / 60)
                  .toString()
                  .padStart(2, "0")}
              </span>
              :<span>{(elapsedSeconds % 60).toString().padStart(2, "0")}</span>
            </div>
          </>
        ) : (
          <Timer
            isRunning={isTransferring}
            initialSeconds={elapsedSeconds}
            onTick={setElapsedSeconds}
          />
        )}
      </div>

      {showFinalTime ? null : <TransferLog logs={logs} />}
    </div>
  );
}

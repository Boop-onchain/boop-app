import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Mail, Package } from "lucide-react";

interface SuccessScreenProps {
  onContinue: () => void;
  logs: string[];
}

export function SuccessScreen({ onContinue, logs }: SuccessScreenProps) {
  const txId = logs
    .filter((log) => log?.toLowerCase().includes("burn tx"))
    .map((log) => log.split("Burn Tx: ")[1]);

  const finalTx = logs
    .filter((log) => log?.toLowerCase().includes("mint tx"))
    .map((log) => log.split("Mint Tx: ")[1]);

  return (
    <Card className="bg-[#000000] border-[#2f3336]">
      <CardContent className="pt-8 pb-6">
        <div className="flex flex-col items-center justify-center space-y-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#FFD814] flex items-center justify-center">
              <Package className="w-4 h-4 text-black" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold text-white">
              Order Confirmed!
            </h3>
            <p className="text-gray-400 max-w-sm">
              Your order has been successfully placed. We'll send you an email
              with tracking details once it ships.
            </p>
          </div>

          <p className="text-gray-400 max-w-sm text-xs">
            {txId ? (
              <>
                <p className="text-gray-400">Burn Tx:</p>
                <a
                  href={`https://sepolia.basescan.org/tx/${txId}`}
                  target="_blank"
                  className="text-gray-400 hover:text-gray-300"
                >
                  {txId}
                </a>
              </>
            ) : null}
          </p>
          <p className="text-gray-400 max-w-sm text-xs">
            {finalTx ? (
              <>
                <p className="text-gray-400">Received Mint Tx:</p>
                <a
                  href={`https://sepolia.etherscan.io/tx/${finalTx}`}
                  target="_blank"
                  className="text-gray-400 hover:text-gray-300"
                >
                  {finalTx}
                </a>
              </>
            ) : null}
          </p>

          <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-900/50 px-4 py-2 rounded-full">
            <Mail className="w-4 h-4" />
            <span>Check your email for updates</span>
          </div>

          <Button
            onClick={onContinue}
            className="bg-[#FFD814] hover:bg-[#F7CA00] text-black font-semibold w-full max-w-xs"
          >
            Continue Shopping
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

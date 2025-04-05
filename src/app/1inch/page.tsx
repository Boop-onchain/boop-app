"use client";
import { ArrowDownIcon } from "@radix-ui/react-icons";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";
import { useAccount } from "wagmi";

interface Token {
  amount: number;
  symbol: string;
  chain: string;
}

interface TokenInputProps {
  label: string;
  value: Token;
  onChange: (value: Token) => void;
  balance?: string;
}

const tokens = [
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    chains: ["ethereum", "optimism", "arbitrum", "base", "bnb"],
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    chains: ["ethereum", "polygon", "optimism", "arbitrum", "base", "bnb"],
  },
  {
    symbol: "USDT",
    name: "Tether",
    icon: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    chains: ["ethereum", "polygon", "optimism", "arbitrum", "bnb"],
  },
  {
    symbol: "1INCH",
    name: "1inch",
    icon: "https://cryptologos.cc/logos/1inch-1inch-logo.png",
    chains: ["ethereum", "base", "bnb"],
  },
  {
    symbol: "DAI",
    name: "Dai",
    icon: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png",
    chains: ["ethereum", "polygon", "optimism", "arbitrum", "base"],
  },
  {
    symbol: "BNB",
    name: "Binance Coin",
    icon: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    chains: ["ethereum", "bnb"],
  },
];

function getChainIcon(chain: string) {
  const chainIcons: { [key: string]: string } = {
    ethereum: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    polygon: "https://cryptologos.cc/logos/polygon-matic-logo.png",
    optimism: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png",
    arbitrum: "https://cryptologos.cc/logos/arbitrum-arb-logo.png",
    base: "https://images.mirror-media.xyz/publication-images/cgqxxPdUFBDjgKna_dDir.png?height=200&width=200",
    bnb: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
  };
  return chainIcons[chain.toLowerCase()] || "https://placeholder.co/16";
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function TokenInput({
  label,
  value,
  onChange,
  balance,
}: TokenInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState<string>();
  const [showChains, setShowChains] = useState(false);

  const onSelectToken = (token: {
    symbol: string;
    name: string;
    icon: string;
    selectedChain?: string;
  }) => {
    onChange({
      amount: value.amount,
      symbol: token.symbol,
      chain: token.selectedChain || "",
    });
    setIsOpen(false);
  };

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
          type="number"
          value={value.amount || ""}
          onChange={(e) => {
            const inpValue = e.target.value;

            onChange({
              amount: inpValue ? parseFloat(inpValue) : 0,
              symbol: value.symbol,
              chain: value.chain,
            });
          }}
          placeholder="0.0"
          className="w-full bg-transparent text-2xl outline-none text-white"
        />
        <>
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#2C2C2C] hover:bg-[#3C3C3C] text-white px-3 py-1 rounded-lg text-sm"
          >
            Select
          </button>

          {isOpen && (
            <div className="fixed inset-0 bg-black backdrop-opacity-50 flex items-center justify-center z-50">
              <div className="bg-[#1C1C1C] rounded-xl p-4 w-96 max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between mb-4">
                  <h3 className="text-lg font-medium">Select Token</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-2">
                  {tokens.map((token) => {
                    return (
                      <div key={token.symbol}>
                        <button
                          className="w-full flex items-center gap-2 p-2 hover:bg-[#2C2C2C] rounded-lg"
                          onClick={() => {
                            setSelectedToken(token.symbol);

                            if (selectedToken === token.symbol) {
                              setShowChains(!showChains);
                            } else {
                              setShowChains(true);
                            }
                          }}
                        >
                          <img
                            src={token.icon}
                            alt={token.symbol}
                            className="w-8 h-8"
                          />
                          <div className="text-left">
                            <div>{token.symbol}</div>
                            <div className="text-sm text-gray-400">
                              {token.name}
                            </div>
                          </div>
                        </button>
                        {showChains &&
                          selectedToken &&
                          selectedToken === token.symbol && (
                            <div className="bg-[#2C2C2C] rounded-lg p-2 mt-1">
                              <div className="text-sm text-gray-400 mb-2">
                                Select chain:
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {token.chains.map((chain) => (
                                  <button
                                    key={chain}
                                    className="flex items-center gap-1 bg-[#3C3C3C] hover:bg-[#4C4C4C] rounded-full px-3 py-1"
                                    onClick={() => {
                                      onSelectToken({
                                        ...token,
                                        selectedChain: chain,
                                      });
                                    }}
                                  >
                                    <img
                                      src={getChainIcon(chain)}
                                      alt={chain}
                                      className="w-4 h-4"
                                      onError={(e) =>
                                        (e.currentTarget.src =
                                          "https://placeholder.co/16")
                                      }
                                    />
                                    <span className="text-xs capitalize">
                                      {chain}
                                    </span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </>
      </div>
    </div>
  );
}

const Page = () => {
  const [fromToken, setFromToken] = useState<{
    amount: number;
    symbol: string;
    chain: string;
  }>({
    amount: 0,
    symbol: "",
    chain: "",
  });
  const [toToken, setToToken] = useState<{
    amount: number;
    symbol: string;
    chain: string;
  }>({
    amount: 0,
    symbol: "",
    chain: "",
  });
  const { isConnected } = useAccount();

  console.log("fromToken", fromToken);
  console.log("toToken", toToken);

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
        <div className="bg-[#111] p-5 rounded-2xl">
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
                  label={`From: ${fromToken.symbol} ${
                    fromToken.chain
                      ? `(${capitalizeFirstLetter(fromToken.chain)})`
                      : ""
                  }`}
                  value={fromToken}
                  onChange={setFromToken}
                  balance="0.0"
                />

                <div className="flex justify-center -my-2">
                  <button
                    className="bg-[#1C1C1C] p-2 rounded-full hover:bg-[#2C2C2C]"
                    onClick={() => {
                      console.log("Switching tokens");
                      const currentFromToken = fromToken;
                      const currentToToken = toToken;
                      setFromToken({
                        ...currentToToken,
                      });
                      setToToken({
                        ...currentFromToken,
                      });
                    }}
                  >
                    <ArrowDownIcon className="w-4 h-4" />
                  </button>
                </div>

                <TokenInput
                  label={`To: ${toToken.symbol} ${
                    toToken.chain
                      ? `(${capitalizeFirstLetter(toToken.chain)})`
                      : ""
                  }`}
                  value={toToken}
                  onChange={setToToken}
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
        </div>

        <div className="grid place-content-center">
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

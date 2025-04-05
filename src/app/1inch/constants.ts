const tokens = [
  {
    symbol: "ETH",
    name: "Ethereum",
    icon: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    chains: ["ethereum", "optimism", "arbitrum", "base", "bnb"],
    decimals: 18,
  },
  {
    symbol: "USDC",
    name: "USD Coin",
    icon: "https://cryptologos.cc/logos/usd-coin-usdc-logo.png",
    chains: ["ethereum", "polygon", "optimism", "arbitrum", "base", "bnb"],
    decimals: 6,
  },
  {
    symbol: "USDT",
    name: "Tether",
    icon: "https://cryptologos.cc/logos/tether-usdt-logo.png",
    chains: ["ethereum", "polygon", "optimism", "arbitrum", "bnb"],
    decimals: 6,
  },
  {
    symbol: "1INCH",
    name: "1inch",
    icon: "https://cryptologos.cc/logos/1inch-1inch-logo.png",
    chains: ["ethereum", "base", "bnb"],
    decimals: 18,
  },
  {
    symbol: "DAI",
    name: "Dai",
    icon: "https://cryptologos.cc/logos/multi-collateral-dai-dai-logo.png",
    chains: ["ethereum", "polygon", "optimism", "arbitrum", "base"],
    decimals: 18,
  },
  {
    symbol: "BNB",
    name: "Binance Coin",
    icon: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    chains: ["ethereum", "bnb"],
    decimals: 18,
  },
];

const tokenAddresses = {
  ethereum: {
    ETH: "native",
    USDC: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    USDT: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    "1INCH": "0x111111111117dc0aa78b770fa6a738034120c302",
    DAI: "0x6b175474e89094c44da98b954eedeac495271d0f",
    BNB: "0xB8c77482e45F1F44dE1745F52C74426C631bDD52",
  },
  polygon: {
    USDC: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174",
    USDT: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f",
    DAI: "0x8f3cf7ad23cd3cadbd9735aff958023239c6a063",
  },
  optimism: {
    ETH: "native",
    USDC: "0x0b2c639c533813f4aa9d7837caf62653d097ff85",
    USDT: "0x94b008aa00579c1307b0ef2c499ad98a8ce58e58",
    DAI: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
  },
  arbitrum: {
    ETH: "native",
    USDC: "0xaf88d065e77c8cc2239327c5edb3a432268e5831",
    USDT: "0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9",
    DAI: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
  },
  base: {
    ETH: "native",
    USDC: "0x833589fcd6edb6e08f4c7c32d4f71b54bda02913",
    "1INCH": "0xc5fecC3a29Fb57B5024eEc8a2239d4621e111CBE",
    DAI: "0x50c5725949a6f0c72e6c4a641f24049a917db0cb",
  },
  bnb: {
    ETH: "0x2170ed0880ac9a755fd29b2688956bd959f933f8",
    USDC: "0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d",
    USDT: "0x55d398326f99059ff775485246999027b3197955",
    "1INCH": "0x111111111117dc0aa78b770fa6a738034120c302",
    BNB: "native",
  },
};

export { tokens, tokenAddresses };

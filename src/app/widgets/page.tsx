import { CodeBlock } from "@/components/ui/code-block";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import OneInchWidget from "../1inch/page";
import CheckoutPage from "../checkout/page";
import AirdropWidget from "./AirdropWidget";
import TipWidget from "./TipWidget";

const Page = () => {
  const code = `<BoopWidget 
  widget="1inch" 
  fromAddress="0x0000000000000000000000000000000000000000" 
  fromChainId="1"
  toAddress="0x0000000000000000000000000000000000000000" 
  toChainId="1"
  amount="1" 
  slippage="0.5" 
/>`;
  const code2 = `<BoopWidget widget="tip" message="Buy me a Ramen" emoji="🍜" walletAddress="[WALLET_ADDRESS]" />`;
  const code3 = `<BoopWidget widget="checkout" product={{
  name: "SONY WH-1000XM5",
  description:
    "High-quality wireless headphones with noise cancellation. Features include 40-hour battery life, premium sound quality, and comfortable ear cushions.",
  price: 299.99,
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    "https://images.pexels.com/photos/1476055/pexels-photo-1476055.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
  ],
  rating: 4.5,
  reviewCount: 2547,
}} />`;

  const code4 = `<BoopWidget 
token={{
  symbol: "DUCK",
  address: "0x0000000000000000000000000000000000000000",
  decimals: 18,
  image: "https://cdn.prod.website-files.com/60f008ba9757da0940af288e/64815c2d323cf5cd2611c08d_2.png"
}}
/>`;

  return (
    <>
      <header className="border-b py-2 border-gray-900">
        <div className="mx-auto max-w-screen-xl">
          <Link href="/">
            <img src="/logo.svg" alt="Boop Logo" className="w-30" />
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-screen-xl mb-10">
        <h1 className="text-2xl font-bold my-5">Widgets</h1>

        <Tabs defaultValue="swap" className="w-full">
          <TabsList className="w-full justify-start mb-6 bg-[#1C1C1C] border border-[#2a2a2a] py-6 px-2">
            <TabsTrigger
              value="swap"
              className="data-[state=active]:bg-[#000] data-[state=active]:text-white text-gray-400 py-4"
            >
              Swap Boop
            </TabsTrigger>
            <TabsTrigger
              value="tip"
              className="data-[state=active]:bg-[#000] data-[state=active]:text-white text-gray-400 py-4"
            >
              Tip Boop
            </TabsTrigger>
            <TabsTrigger
              value="checkout"
              className="data-[state=active]:bg-[#000] data-[state=active]:text-white text-gray-400 py-4"
            >
              Checkout Boop
            </TabsTrigger>
            <TabsTrigger
              value="airdrop"
              className="data-[state=active]:bg-[#000] data-[state=active]:text-white text-gray-400 py-4"
            >
              Airdrop Boop
            </TabsTrigger>
          </TabsList>

          <TabsContent value="swap" className="mt-0">
            <section className="rounded-xl p-1 grid grid-cols-1">
              <div className="w-1/3 mx-auto">
                <OneInchWidget hidebg />
              </div>
              <div className="mt-4">
                <p>1. Install Package</p>
                <CodeBlock
                  code="pnpm install @boop-widgets/boop-widget"
                  language="bash"
                  className="text-sm my-2 ml-2"
                />
                <p>2. Add Widget</p>
                <CodeBlock code={code} language="tsx" className="text-sm" />

                <p>
                  <a
                    target="_BLANK"
                    rel="noopener noreferrer"
                    href="/widget-example/1inch"
                    className="bg-[#2C2C2C]  px-4 py-1  mt-2 block w-fit rounded-full text-gray-300 hover:bg-[#3C3C3C] transition-all duration-300"
                  >
                    Example 1inch Widget
                  </a>
                </p>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="tip" className="mt-0 pb-10 mb-10">
            <section className="rounded-xl p-1 grid grid-cols-1">
              <div className="w-1/3 mx-auto">
                <TipWidget hidebg />
              </div>
              <div className="mt-4">
                <p>1. Install Package</p>
                <CodeBlock
                  code="pnpm install @boop-widgets/boop-widget"
                  language="bash"
                  className="text-sm my-2 ml-2"
                />
                <p>2. Add Widget</p>
                <CodeBlock code={code2} language="tsx" className="text-sm" />
              </div>
            </section>
          </TabsContent>

          <TabsContent value="checkout" className="mt-0">
            <section className="rounded-xl p-1 grid grid-cols-2">
              <div className="w-3/4 mx-auto">
                <CheckoutPage className="rounded-2xl" />
              </div>
              <div className="mt-4">
                <p>1. Install Package</p>
                <CodeBlock
                  code="pnpm install @boop-widgets/boop-widget"
                  language="bash"
                  className="text-sm my-2 ml-2"
                />
                <p>2. Add Widget</p>
                <CodeBlock code={code3} language="tsx" className="text-sm" />
              </div>
            </section>
          </TabsContent>
          <TabsContent value="airdrop" className="mt-0">
            <section className="rounded-xl p-1 grid grid-cols-2">
              <div className="w-3/4 mx-auto">
                <AirdropWidget hidebg />
              </div>
              <div className="mt-4">
                <p>1. Install Package</p>
                <CodeBlock
                  code="pnpm install @boop-widgets/boop-widget"
                  language="bash"
                  className="text-sm my-2 ml-2"
                />
                <p>2. Add Widget</p>
                <CodeBlock code={code4} language="tsx" className="text-sm" />
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;

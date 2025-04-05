import Link from "next/link";
import OneInchWidget from "./OneInchWidget";
import TipWidget from "./TipWidget";

const Page = () => {
  const code = `<BoopWidget widget="1inch"  />`;
  const code2 = `<BoopWidget widget="tip"  />`;

  return (
    <>
      <header className="border-b py-2 border-gray-900">
        <div className="mx-auto max-w-screen-xl ">
          <Link href="/">
            <img src="/logo.svg" alt="Boop Logo" className="w-30" />
          </Link>
        </div>
      </header>
      <div className="mx-auto max-w-screen-xl ">
        <h1 className="text-2xl font-bold my-5">Widgets</h1>
        <div className="grid grid-cols-1 gap-2 mt-10 space-y-10">
          <section>
            <h1 className="text-xl font-bold mb-4">1Inch Swap </h1>
            <section className="bg-[#3333335e] rounded-xl p-1 grid grid-cols-2">
              <div className="w-3/4 mx-auto">
                <OneInchWidget />
              </div>
              <div className=" mt-4">
                <p>1. Install Package</p>

                <pre className="text-sm my-2 ml-2">
                  <pre className="bg-[#000] rounded-xl p-2">
                    <code>pnpm install @boop-widgets/boop-widget</code>
                  </pre>
                </pre>
                <p>2. Add Widget</p>
                <pre className="bg-[#000] rounded-xl p-2">
                  <code>{code}</code>
                </pre>
              </div>
            </section>
          </section>
          <section>
            <h1 className="text-xl font-bold mb-4">Tip Widget </h1>
            <section className="bg-[#3333335e] rounded-xl p-1 grid grid-cols-2">
              <div className="w-3/4 mx-auto">
                <TipWidget />
              </div>
              <div className="mt-4">
                <p>1. Install Package</p>

                <pre className="text-sm my-2 ml-2">
                  <pre className="bg-[#000] rounded-xl p-2">
                    <code>pnpm install @boop-widgets/boop-widget</code>
                  </pre>
                </pre>
                <p>2. Add Widget</p>
                <pre className="bg-[#000] rounded-xl p-2">
                  <code>{code2}</code>
                </pre>
              </div>
            </section>
          </section>
        </div>
      </div>
    </>
  );
};

export default Page;

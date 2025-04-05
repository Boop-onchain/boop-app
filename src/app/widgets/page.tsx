import OneInchWidget from "./OneInchWidget";
import TipWidget from "./TipWidget";

const Page = () => {
  const code = `<BoopWidget widget="1inch"  />`;

  return (
    <>
      <header className="border-b py-2 border-gray-900">
        <div className="mx-auto max-w-screen-xl ">
          <img src="/logo.svg" alt="Boop Logo" className="w-30" />
        </div>
      </header>
      <div className="mx-auto max-w-screen-xl ">
        <h1 className="text-2xl font-bold my-5">Widgets</h1>
        <div className="grid grid-cols-1 gap-2 mt-10">
          <section>
            <h1 className="text-xl font-bold mb-4">1Inch Swap </h1>
            <section className="bg-[#333] rounded-xl p-1 grid grid-cols-2">
              <OneInchWidget />
              <div className="ml-2">
                <h3 className="text-l ml-2 font-bold my-2">Swap Widget</h3>

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
            <section className="bg-[#333] rounded-xl p-1 grid grid-cols-2">
              <TipWidget />
              <div className="ml-2">
                <h3 className="text-l ml-2 font-bold my-2">Tip Widget</h3>

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
        </div>
      </div>
    </>
  );
};

export default Page;

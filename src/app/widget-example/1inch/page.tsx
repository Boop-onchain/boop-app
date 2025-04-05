import OneInchWidget from "@/app/widgets/OneInchWidget";

const Page = () => {
  return (
    <div className="bg-[#fffbf0]">
      <div className="mx-auto max-w-screen-xl bg-[#fffbf0]">
        <div className="min-h-screen  text-white  p-4">
          <div className="w-full h-full text-white">
            <div className="w-full h-full text-white grid grid-cols-2 gap-5 ">
              <div className="pt-20">
                <h3
                  className="text-2xl font-bold mb-5"
                  style={{ color: "rgb(245, 158, 11)" }}
                >
                  Unearth Legendary Cards: Rare Finds Await!
                </h3>

                <p className="text-l text-gray-400 w-3/4">
                  Dive into our curated selection of highly sought-after sports
                  cards. Discover limited edition releases, autographed
                  memorabilia, and potential investment gems. Elevate your
                  collection today!
                </p>
              </div>

              <OneInchWidget />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

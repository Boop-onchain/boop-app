import OneInchWidget from "@/app/1inch/page";

const Page = () => {
  return (
    <div className="bg-[#fffbf0]">
      <div className="mx-auto max-w-screen-xl bg-[#fffbf0]">
        <img
          src="https://www.cnet.com/a/img/resize/62646b39d013a95886ec06128e8ec37e4f5235fc/hub/2023/05/23/3d837042-d6a2-4659-bb84-e7f622e92fa0/munckin-card-game.jpg?auto=webp&fit=crop&height=675&width=1200"
          className="w-full h-90 object-cover rounded-b-2xl "
        />
        <div className="min-h-screen  text-white  p-4">
          <div className="w-full h-full text-white">
            <div className="w-full h-full text-white grid grid-cols-2 gap-5 ">
              <div className="-pt-20">
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

                <p className="text-l text-gray-400 w-3/4 mt-6">
                  Swap the coins you have for the ones you want.
                </p>
              </div>
              <div className="-pt-40 relative -top-36">
                <div className="mx-auto w-3/4">
                  <OneInchWidget hidebg={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

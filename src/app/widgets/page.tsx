import WidgetWrapper from "@/components/widget/WidgetWrapper";

const Page = () => {
  return (
    <div className="min-h-screen bg-[#000] text-white  p-4">
      <div className="grid grid-cols-3 gap-5">
        <WidgetWrapper title="1inch Swap Widget">
          <div className="w-full h-full text-white">Swap feature here!</div>
        </WidgetWrapper>
      </div>
    </div>
  );
};

export default Page;

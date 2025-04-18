interface WidgetWrapperProps {
  title?: string | React.ReactNode;
  children: React.ReactNode;
  hidebg?: boolean;
}

const WidgetWrapper = ({ title, children, hidebg }: WidgetWrapperProps) => {
  return (
    <div
      className="w-full h-full bg-[#333] border-gray-900 border rounded-xl p-4"
      style={
        hidebg
          ? {
              background: "#000000",
              borderRadius: "10px",
            }
          : {
              background:
                "linear-gradient(180deg, hsla(220, 12%, 15%, 1) 0%, hsla(220, 10%, 5%, 1) 100%)",
              backdropFilter: "blur(20px)",
              boxShadow: "inset 0 1px 1px #585858",
            }
      }
    >
      <div className="w-full text-white text-l font-bold mb-5">{title}</div>
      {children}
    </div>
  );
};

export default WidgetWrapper;

const sizes = {
  sm: "w-6 h-6",
  md: "w-10 h-10",
  lg: "w-16 h-16",
};
const Loader = ({ size = "md", fullScreen = false }) => {
  const spinner = (
    <div
      className={`${sizes[size]} border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin`}
    ></div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        {" "}
        {spinner}{" "}
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-12"> {spinner} </div>
  );
};

export default Loader;

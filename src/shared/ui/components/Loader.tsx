const Loader = () => {
  return (
    <div className="flex-center-center flex-1 p-6">
      <span className="w-[50px] aspect-[1] grid border-4 border-accent border-l-transparent border-r-transparent rounded-full animate-loader before:area-1/1 before:m-0.5 before:rounded-[50%] before:border-4 before:border-primary before:border-l-transparent before:border-r-transparent after:area-1/1 after:border-4 after:border-accent after:border-l-transparent after:border-r-transparent after:rounded-[50%]  before:animate-loader-reverse after:m-2"></span>
    </div>
  );
};

export default Loader;

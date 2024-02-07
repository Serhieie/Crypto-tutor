export const NoPage: React.FC = () => {
  return (
    <div
      className="select-none mt-0 h-[100vh-64px] flex 
    flex-col items-center justify-center"
    >
      <div
        className="relative bg-transparent bg-opacity-20 p-14 pt-4 
       rounded-[60px] backdrop-filter backdrop-blur-sm"
      >
        <h1
          className={` text-slate-600 font-montserrat md:text-[120px] 
          text-[200px] text-center select-none font-extrabold p-0 mt-0`}
        >
          404
        </h1>
        <p className={` text-slate-600 text-lg font-pixel text-center mt-0 px-2`}>
          Page not found
        </p>
      </div>
    </div>
  );
};

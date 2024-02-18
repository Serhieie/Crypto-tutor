import { LoginFormButtonProps } from "./Login.types";
import { PulseLoader } from "react-spinners";

export const LoginFormButton: React.FC<LoginFormButtonProps> = ({
  text,
  isLoading,
  onClick,
  resended,
  styles,
}) => {
  //styles for btn
  const themeStyles: string = `
  'shadow-none hover:bg-blue-700 text-buttonTextColorDark  bg-blue-900'
     text-center text-lg md:w-48 font-semibold w-52 h-11 rounded-md border-none outline-none 
      mx-auto cursor-pointer shadow-md  mb-8 flex items-center justify-around transition-all duration-300 
      ssm:w-48 ssm:h-10 md2:text-sm disabled:opacity-30 font-montserrat ${styles}`;

  return (
    <button
      id="log-btn"
      type="submit"
      disabled={isLoading || resended ? true : false}
      onClick={onClick}
      className={themeStyles}
    >
      {isLoading ? <PulseLoader size="large" /> : <>{text}</>}
    </button>
  );
};

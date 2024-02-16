import { Spin } from "antd";
import { LoginFormButtonProps } from "./Login.types";

export const LoginFormButton: React.FC<LoginFormButtonProps> = ({
  text,
  isLoading,
  onClick,
  resended,
  timeRemaining,
}) => {
  //styles for btn
  const themeStyles: string = `
  'shadow-none hover:bg-blue-700 text-buttonTextColorDark  bg-blue-900'
     text-center text-lg md:w-48 font-light w-40 h-11 rounded-md border-none outline-none 
      mx-auto cursor-pointer shadow-md  mb-8 flex items-center justify-around transition-all duration-300 
      ssm:w-40 ssm:h-10 md2:text-sm disabled:opacity-30 `;

  return (
    <button
      id="log-btn"
      type="submit"
      disabled={isLoading || resended ? true : false}
      onClick={onClick}
      className={themeStyles}
    >
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <>{resended ? `${timeRemaining} sec` : text}</>
      )}
    </button>
  );
};

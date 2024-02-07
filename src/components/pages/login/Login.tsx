import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LoginFormButton } from "./LoginFormButton";
import { LoginInputs } from "./LoginInputs";
import { login } from "../../../redux/auth/operations-auth";
import { getisLoadingUser } from "../../../redux/auth/selectors-auth";
import { useEffect, useState, FormEvent } from "react";
import { CredentialsLogin } from "../../../redux/auth/redux-auth.type";
import { useDispatch } from "react-redux";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading: boolean = useSelector(getisLoadingUser);
  const [windowSize, setWindowSize] = useState<{
    height: number;
    width: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = (): void => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = async (evt: FormEvent<HTMLFormElement>): Promise<void> => {
    evt.preventDefault();
    const formElement = evt.currentTarget;
    const userEmail = formElement.elements.namedItem("userEmail") as HTMLInputElement;
    const userPassword = formElement.elements.namedItem(
      "userPassword"
    ) as HTMLInputElement;

    const userData: CredentialsLogin = {
      email: userEmail.value.trim(),
      password: userPassword.value.trim(),
    };

    dispatch(login(userData) as any);
    userPassword.value = "";
  };

  const formWidthClass =
    windowSize.height > 460 ? "md3:w-5/12 pb-12" : "md3:w-10/12   md2:mt-1 pb-1";
  const formThemeStyles =
    " shadow-shadowBoxDark from-smallWraperGradient1Dark to-smallWraperGradient2Dark ";

  return (
    <>
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        className={`
        ${formWidthClass} 
         ${formThemeStyles}  flex gap-2 flex-col   pt-20  px-10 rounded-xl
          shadow-lg bg-gradient-to-tr md2:mt-4  md2:pt-8  md:pb-14 md:px-5 md:min-h-0 md:w-[96%]
          transition-all  ssm2:-mt-4 ssm2:pt-28  mx-auto z-20 mt-2 `}
      >
        <h1
          className="text-center text-4xl m-0 md:text-2xl
         md2:text-2xl font-medium mt-2 text-darkFontDark font-montserrat"
        >
          Login
        </h1>
        <LoginInputs windowSize={windowSize} />
        <Link
          className={`text-blue-400 font-medium  mt-12 flex gap-4 font-montserrat `}
          to={"/registration"}
        >
          <p className={`text-slate-300 font-medium font-montserrat`}>Have no account?</p>
          Registrate now
        </Link>
        <LoginFormButton text="Sign in" isLoading={isLoading} />
      </form>
    </>
  );
};

export default Login;

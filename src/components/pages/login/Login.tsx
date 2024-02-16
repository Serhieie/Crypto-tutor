import { Link } from "react-router-dom";
import { setIsVerifyModalOpen, setResended } from "../../../redux/auth/slice-auth";
import { LoginFormButton } from "./LoginFormButton";
import { LoginInputs } from "./LoginInputs";
import { ForgotPasswordPage } from "./ForgotPasswordPage";
import { login, resentEmailVerify } from "../../../redux/auth/operations-auth";
import { useEffect, useState, FormEvent } from "react";
import { CredentialsLogin } from "../../../redux/auth/redux-auth.type";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../helpers/hooks/authSelector";
import { useCryptoState } from "../../../helpers/hooks/cryptoSelector";
import { Modal } from "antd";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const { isLoading } = useCryptoState();
  const { isVerifyModalOpen, isRefreshing, user, resended } = useAuth();
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [windowSize, setWindowSize] = useState<{
    height: number;
    width: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResentEmail = () => {
    dispatch(setResended(true));
    dispatch(resentEmailVerify({ email: user.email }) as any);
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId);
          dispatch(setResended(false));
          return 30;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
  };

  const closeVerifyModal = () => {
    dispatch(setIsVerifyModalOpen(false));
  };

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
      <Modal open={isVerifyModalOpen} onCancel={closeVerifyModal} footer={null}>
        <h1 className=" text-3xl text-center mb-8 text-slate-700">
          Email is not verified
        </h1>
        <p className="text-lg text-center text-slate-500">
          Before start you should verify email
        </p>
        <p className="mt-3 text-lg text-center text-blue-900  font-semibold">
          {user.email}
        </p>
        <div className="flex mt-12">
          <LoginFormButton
            text="Accept"
            isLoading={isRefreshing}
            onClick={closeVerifyModal}
          />
          <LoginFormButton
            text="Resent Email"
            isLoading={isRefreshing}
            onClick={handleResentEmail}
            resended={resended}
            timeRemaining={timeRemaining}
          />
        </div>
      </Modal>
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
        <ForgotPasswordPage />
        <Link
          className={`text-blue-400 font-medium  mt-4 mb-28 flex gap-4 font-montserrat `}
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

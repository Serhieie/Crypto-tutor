import { Modal } from "antd";
import { useAuth } from "../../../helpers/hooks/authSelector";
import { useState } from "react";
import { setResended } from "../../../redux/auth/slice-auth";
import { LoginFormButton } from "./LoginFormButton";
import { useDispatch } from "react-redux";
import { changePasswordRequest } from "../../../redux/auth/operations-auth";

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { isRefreshing, user, resended } = useAuth();
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const [email, setEmail] = useState<string>("");

  const closeChangePasswordModal = () => {
    setIsChangePasswordModalOpen(false);
  };

  const openChangePasswordModal = () => {
    setIsChangePasswordModalOpen(true);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleChangePassword = () => {
    dispatch(setResended(true));
    dispatch(changePasswordRequest({ email }) as any);
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

  return (
    <>
      <Modal
        open={isChangePasswordModalOpen}
        onCancel={closeChangePasswordModal}
        footer={null}
      >
        <h1 className=" text-3xl text-center mb-6 mt-8 text-slate-700">
          Forgot your Password?
        </h1>
        <p className="text-lg text-center text-slate-500 mb-3">
          Send your email and confirm change password request
        </p>
        <input
          type="text"
          placeholder={user.email}
          onChange={handleChange}
          value={email}
          className={`text-slate-700 bg-slate-200 placeholder:text-darkFontDark 
 w-[80%] mx-auto py-1 rounded-lg px-5  h-12 
          border-0 outline-none font-montserrat
           placeholder:font-base flex
             md:h-10 text-xl md:py-0.5 md:px-2 placeholder:opacity-50 
           ssm:text-base  font-medium  transition-all  2xl2:text-2xl `}
        />
        <div className="flex mt-8">
          <LoginFormButton
            text="Send"
            isLoading={isRefreshing}
            onClick={handleChangePassword}
            resended={resended}
            timeRemaining={timeRemaining}
          />
        </div>
      </Modal>
      <button
        onClick={openChangePasswordModal}
        aria-label="change password button"
        id="forgot-password"
        type="button"
        //   onClick={}
        className={`text-blue-400 font-medium font-montserrat 
        border-none bg-transparent w-44 outline-none select-none `}
      >
        Forgot your password?
      </button>
    </>
  );
};

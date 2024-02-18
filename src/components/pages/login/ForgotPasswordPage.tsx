import { Modal } from "antd";
import { useAuth } from "../../../helpers/hooks/authSelector";
import { useState } from "react";
import { setResended } from "../../../redux/auth/slice-auth";
import { setIsChangePasswordModalOpen } from "../../../redux/auth/slice-auth";
import { useDispatch } from "react-redux";
import { changePasswordRequest } from "../../../redux/auth/operations-auth";

export const ForgotPasswordPage = () => {
  const dispatch = useDispatch();
  const { isRefreshing, user, resended, isChangePasswordModalOpen } = useAuth();
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [email, setEmail] = useState<string>("");

  const closeChangePasswordModal = () => {
    dispatch(setIsChangePasswordModalOpen(false));
    dispatch(setResended(false));
  };

  const openChangePasswordModal = () => {
    dispatch(setIsChangePasswordModalOpen(true));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setEmail(value);
  };

  const handleChangePassword = () => {
    if (!email) return;
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
    console.log(timeRemaining);
  };

  if (timeRemaining < 30) {
    if (isRefreshing) dispatch(setResended(false));
  }

  const themeStyles: string = `
  'shadow-none hover:bg-blue-700 text-buttonTextColorDark  bg-blue-900'
     text-center text-lg md:w-48 font-semibold w-40 h-11 rounded-md border-none outline-none 
      mx-auto cursor-pointer shadow-md  mb-8 flex items-center justify-around transition-all duration-300 
      ssm:w-40 ssm:h-10 md2:text-sm disabled:opacity-30 font-montserrat `;
  return (
    <>
      <Modal
        onCancel={closeChangePasswordModal}
        open={isChangePasswordModalOpen}
        footer={null}
      >
        <h1 className=" text-3xl text-center  mb-6 mt-8 text-slate-700 font-montserrat ">
          Forgot your Password?
        </h1>
        <p className="text-lg text-center text-slate-500 mb-3 font-montserrat ">
          Send your email and confirm change password request
        </p>
        <form action="Form Validation">
          <label htmlFor="inputEmailChangePass">
            <input
              type="text"
              name="inputEmailChangePass"
              placeholder={user.email}
              onChange={handleChange}
              value={email}
              required
              className={`text-slate-700 bg-slate-200 placeholder:text-darkFontDark 
 w-[80%] mx-auto py-1 rounded-lg px-5  h-12 
          border-0 outline-none font-montserrat
           placeholder:font-base flex
             md:h-10 text-xl md:py-0.5 md:px-2 placeholder:opacity-50 
           ssm:text-base  font-medium  transition-all  2xl2:text-2xl `}
            />
          </label>

          <div className="flex mt-8">
            <button
              type="button"
              onClick={handleChangePassword}
              disabled={resended || timeRemaining < 30 ? true : false}
              className={themeStyles}
            >
              {timeRemaining < 30 ? `${timeRemaining} sec` : "Send"}
            </button>
          </div>
        </form>
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

import { Field, ErrorMessage } from "formik";
import { useState } from "react";
import { PiEyeClosedBold } from "react-icons/pi";
import { HiMiniEye } from "react-icons/hi2";
import { InputProps } from "../Registration.types";

export const PasswordAndConfirm: React.FC<InputProps> = ({
  withInputClass,
  fieldsStyle,
}) => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePassword = (field: number): void => {
    if (field === 1) {
      setShowPassword1((prevShowPassword) => !prevShowPassword);
    } else if (field === 2) {
      setShowPassword2((prevShowPassword) => !prevShowPassword);
    }
  };

  const showPasswordBtnStyles: string = ` text-slate-200   bg-sky-900 
  placeholder:text-darkFontDark rounded-r-lg w-12 transition-all `;
  const labelStyles: string = `
    ${withInputClass}
    mt-2 text-xl flex items-center gap-2 md:ml-2 
    md2:text-sm font-medium text-darkFontDark sm:mt-1 font-montserrat `;

  return (
    <>
      {" "}
      <label className={labelStyles} htmlFor="user-phone">
        {" "}
        Password{" "}
      </label>
      <div className="flex">
        <Field
          className={`${fieldsStyle}  rounded-l-lg rounded-r-none`}
          type={showPassword1 ? "text" : "password"}
          name="password"
          id="password"
          min={7}
          placeholder="Enter your password"
          required
        />
        <button
          id="reg-psw-btn"
          className={showPasswordBtnStyles}
          type="button"
          onClick={() => togglePassword(1)}
        >
          {showPassword1 ? <HiMiniEye size={24} /> : <PiEyeClosedBold size={24} />}
        </button>
      </div>
      <div className="text-sm h-4 w-full text-center -mt-2">
        <ErrorMessage
          className=" text-[orangered] text-center m-0 p-0"
          name="password"
          component="div"
        />
      </div>
      <label className={labelStyles} htmlFor="user-confirm-password">
        Confirm Password
      </label>
      <div className="flex">
        <Field
          className={`${fieldsStyle}  rounded-l-lg rounded-r-none`}
          type={showPassword2 ? "text" : "password"}
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm your password"
          required
        />
        <button
          id="reg-conf-psw-btn"
          className={showPasswordBtnStyles}
          type="button"
          onClick={() => togglePassword(2)}
        >
          {showPassword2 ? <HiMiniEye size={24} /> : <PiEyeClosedBold size={24} />}
        </button>
      </div>
      <div className="text-sm h-4 w-full text-center -mt-2">
        <ErrorMessage
          className=" text-[orangered] text-center m-0 p-0"
          name="confirmPassword"
          component="div"
        />
      </div>
    </>
  );
};

import { useDispatch, useSelector } from "react-redux";
import { changeUserEmail } from "../../../redux/auth/slice-auth";
import { getUserData } from "../../../redux/auth/selectors-auth";
import { getShowPassword, setShowPassword } from "../../../redux/dashboardSlice";
import { PiEyeClosedBold } from "react-icons/pi";
import { HiMiniEye } from "react-icons/hi2";
import { LoginInputsProps } from "./Login.types";

export const LoginInputs: React.FC<LoginInputsProps> = ({ windowSize }) => {
  const showPassword = useSelector(getShowPassword);
  const dispatch = useDispatch();
  const user = useSelector(getUserData);

  //by the way better to leave it here with use state
  //Im not shure need I set it in LS or not that why its with redux
  const togglePasswordVisibility = () => {
    dispatch(setShowPassword());
  };

  //setting email to LS
  const handleInputEmailChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    dispatch(changeUserEmail(value));
  };

  //resize styles
  const formWidthClass = windowSize.height > 460 ? "md3:mt-9" : "md3:mt-0";

  return (
    <>
      <label
        className={`
        ${formWidthClass}
        mt-9 text-xl flex items-center gap-2 md:ml-2 font-medium
      md2:text-sm  sm:mt-1 font-montserrat text-darkFontDark `}
        htmlFor="userEmail"
      >
        {" "}
        Email{" "}
      </label>
      <input
        onChange={handleInputEmailChange}
        className={`text-[#CBD5E1] bg-slate-500 placeholder:text-darkFontDark 
         mx-auto w-full py-1 rounded-lg px-5  h-12 
          border-0 outline-none font-montserrat
           placeholder:font-base
             md:h-10 text-xl md:py-0.5 md:px-2 placeholder:opacity-50 
           ssm:text-base  font-medium  transition-all  2xl2:text-2xl`}
        type="email"
        name="userEmail"
        id="userEmail"
        placeholder="Balambino@mail.com"
        value={user.email || ""}
        required
      />
      <label
        className={` mt-2 text-xl flex items-center gap-2 md:ml-2 
       md2:text-sm text-darkFontDark font-medium sm:mt-1`}
        htmlFor="userPassword"
      >
        {" "}
        Password{" "}
      </label>
      <div className="flex">
        <input
          className={` text-[#CBD5E1] bg-slate-500 placeholder:text-darkFontDark 
             mx-auto  py-1 px-5 rounded-l-lg h-12 border-0 outline-none   
           placeholder:font-base font-montserrat
            md:h-10 text-xl md:py-0.5 md:px-2 placeholder:opacity-50 
           ssm:text-base w-full  font-medium  transition-all  2xl2:text-2xl`}
          type={`${!showPassword ? "password" : "text"}`}
          name="userPassword"
          id="userPassword"
          placeholder="Enter your password"
          min={7}
          required
        />
        <button
          id="login-psw-btn"
          className={`text-[#CBD5E1]  font-montserrat
           placeholder:text-darkFontDark
           rounded-r-lg w-12 transition-all`}
          type="button"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <HiMiniEye size={24} /> : <PiEyeClosedBold size={24} />}
        </button>
      </div>
    </>
  );
};

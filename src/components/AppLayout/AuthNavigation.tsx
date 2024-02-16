import { NavLink } from "react-router-dom";
import { SiBitcoincash } from "react-icons/si";

export const navLinkStyles: string = ` md:text-sm ssm:text-xs md3:text-2xl 
           py-0 relative opacity-50 hover:opacity-100  duration-[600ms]
           font-montserrat hover:brightness-60  hover flex flex-col
           font-medium`;

export const AuthNav: React.FC = () => {
  const navStyles = ` text-darkFontDark  ${navLinkStyles} `;
  return (
    <div className=" flex gap-8 w-full bg-[#0F172A]  md:px-3 h-20 px-16 items-center ">
      <NavLink className={navStyles} to="/">
        <p
          className="flex items-center gap-2 md:text-xs text-xl 
      font-montserrat font-thin text-slate-600"
        >
          <SiBitcoincash size={26} /> CryptoApp
        </p>
      </NavLink>

      <div className="flex gap-8 ml-auto">
        <NavLink className={navStyles} to="/">
          Login
          <span className="w-full absolute scale-x-0  top-8 bg-transparent"></span>
        </NavLink>
        <NavLink className={navStyles} to="/registration">
          Registration
        </NavLink>
      </div>
    </div>
  );
};

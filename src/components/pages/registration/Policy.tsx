import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";

interface PolicyProps {
  windowSize: { height: number; width: number };
}

export const Policy: React.FC<PolicyProps> = ({ windowSize }) => {
  const [isChecked, setIsChecked] = useState<boolean>(false);

  //just stilization of checkbox
  const handleCheckboxChange = (): void => {
    setIsChecked((prevState) => !prevState);
  };

  const widthClass: string = ` ${
    windowSize.height > 460 ? "md3:mt-9" : "md3:mt-2"
  }  mt-10 w-full max-w-[500px] mx-auto flex relative 1xl2:mt-3 font-montserrat `;
  const checkBoxStyle: string = ` border-none checked:bg-blue-700
   bg-blue-950 mr-4 mt-0.5   appearance-none rounded border
   checked:border-transparent focus:outline-none font-montserrat `;

  return (
    <div className={widthClass}>
      <input
        className={checkBoxStyle}
        style={{ flex: "none", width: "24px", height: "24px" }}
        name="user-privacy"
        type="checkbox"
        id="user-privacy"
        value="true"
        required
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      {isChecked && (
        <span
          className="absolute top-1 text-darkFontDark left-0.5 
        pointer-events-none p-0.5 w-full"
        >
          <FaCheck size={16} className="pointer-events-none" />
        </span>
      )}

      <label
        className=" select-none text-darkFontDark font-medium"
        htmlFor="user-privacy"
      >
        I accept the terms and conditions of the{" "}
        <span className={`text-blue-400 font-bold ml-2 cursor-pointer`}>
          Privacy Policy
        </span>
      </label>
    </div>
  );
};

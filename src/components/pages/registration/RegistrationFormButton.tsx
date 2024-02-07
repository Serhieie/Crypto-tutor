import { PulseLoader } from "react-spinners";
import { RegistrationFormButtonProps } from "./Registration.types";
import { registrationSubmitBtnStyles } from "./Registration.styles";

export const RegistrationFormButton: React.FC<RegistrationFormButtonProps> = ({
  isLoading,
}) => {
  const btnStyles: string = `shadow-none hover:bg-buttonHoverColorDark 
  text-buttonTextColorDark rounded-md 
  bg-buttonColorDark  ${registrationSubmitBtnStyles}`;

  return (
    <button id="reg-btn" type="submit" disabled={isLoading} className={btnStyles}>
      {isLoading ? <PulseLoader color={`#3f78cc `} size="6px" /> : <>Registration</>}
    </button>
  );
};

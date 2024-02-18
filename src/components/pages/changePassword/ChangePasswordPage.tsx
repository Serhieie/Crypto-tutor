import { PasswordAndConfirm } from "../registration/RegistrationInputs/PasswordAndConfirm";
import { changePasswordSchema } from "../../../helpers/schema";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../redux/auth/operations-auth";
import { registrationFormStyles } from "../registration/Registration.styles";
import { inputsStyles } from "../registration/Registration.styles";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../helpers/hooks/authSelector";
import { initialValuesTypes } from "../registration/Registration.types";
import { LoginFormButton } from "../login/LoginFormButton";

const initialValues: initialValuesTypes = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const ChangePasswordPage: React.FC = () => {
  const dispatch = useDispatch();
  const { changePasswordCode } = useParams<{ changePasswordCode: string }>();
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const { isRefreshing, changingPass } = useAuth();

  const withInputClass = windowSize.height > 460 ? "md3:mt-2" : "md3:mt-0";
  const formStyles: string = ` 
     shadow-shadowBoxDark from-smallWraperGradient1Dark
     to-smallWraperGradient2Dark  ${registrationFormStyles} `;
  const fieldsStyle: string = ` text-slate-200 bg-sky-900 placeholder:text-darkFontDark  ${inputsStyles}`;

  const handleResize = () => {
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

  const handleSubmit = async (
    values: { password: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    const { password } = values;
    if (!changePasswordCode) return;
    const newPassword = {
      password: password.trim(),
      changePasswordCode,
    };
    dispatch(changePassword(newPassword) as any);
    resetForm();
  };

  return (
    <>
      {changingPass ? (
        <Formik
          initialValues={initialValues}
          validationSchema={changePasswordSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
          validateOnBlur={false}
        >
          <Form autoComplete="off" className={formStyles}>
            <h1
              className="text-center text-3xl m-0 md:text-2xl
         md2:text-2xl font-medium mt-2 text-darkFontDark font-montserrat"
            >
              Change your password
            </h1>{" "}
            <PasswordAndConfirm
              withInputClass={withInputClass}
              fieldsStyle={fieldsStyle}
              labelText={"New password"}
            />
            <LoginFormButton
              isLoading={isRefreshing}
              text="Change Password"
              styles=" py-6 mt-4"
            />
          </Form>
        </Formik>
      ) : null}
    </>
  );
};

import { handleRegistration } from "../../../helpers/validateRegistration";
import { useAuth } from "../../../helpers/hooks/authSelector";
import { RegistrationFormButton } from "./RegistrationFormButton";
import { useEffect, useState } from "react";
import { Policy } from "./Policy";
import { RegLogInputs } from "./RegistrationInputs/RegistrInputs";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { registrationSchema } from "../../../helpers/schema";
import { registrationFormStyles } from "./Registration.styles";
import { initialValuesTypes } from "./Registration.types";

//Formik state
const initialValues: initialValuesTypes = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

//Registration form is not have setting to LS option
const Registration: React.FC = () => {
  const [windowSize, setWindowSize] = useState<{
    width: number;
    height: number;
  }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  //resize listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = async (
    values: { name: string; email: string; password: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    const { name, email, password } = values;
    const userData = {
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    //validation for inputs
    handleRegistration(userData, dispatch);
    resetForm();
  };

  const formStyles: string = ` 
     shadow-shadowBoxDark from-smallWraperGradient1Dark
     to-smallWraperGradient2Dark  ${registrationFormStyles} `;

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={registrationSchema}
        onSubmit={handleSubmit}
        validateOnChange={false}
        validateOnBlur={false}
      >
        <Form autoComplete="off" className={formStyles}>
          <h1
            className="text-center text-3xl m-0 md:text-2xl
         md2:text-2xl font-medium mt-2 text-darkFontDark font-montserrat"
          >
            Registration
          </h1>
          <RegLogInputs windowSize={windowSize} />
          <Policy windowSize={windowSize} />
          <RegistrationFormButton isLoading={isRefreshing} />
        </Form>
      </Formik>
    </>
  );
};

export default Registration;

import { handleRegistration } from "../../../helpers/validateRegistration";
import { Modal } from "antd";
import { useAuth } from "../../../helpers/hooks/authSelector";
import { RegistrationFormButton } from "./RegistrationFormButton";
import { useEffect, useState } from "react";
import { Policy } from "./Policy";
import { resentEmailVerify } from "../../../redux/auth/operations-auth";
import { RegLogInputs } from "./RegistrationInputs/RegistrInputs";
import { useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { registrationSchema } from "../../../helpers/schema";
import { registrationFormStyles } from "./Registration.styles";
import { initialValuesTypes } from "./Registration.types";
import { setIsVerifyModalOpen } from "../../../redux/auth/slice-auth";

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
  const { isRefreshing, isVerifyModalOpen, user } = useAuth();
  const [resended, setResended] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState(30);

  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const handleResentEmail = () => {
    setResended(true);
    dispatch(resentEmailVerify({ email: user.email }) as any);

    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId);
          setResended(false);
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
    const error = handleRegistration(userData, dispatch);
    if (!error) {
      resetForm();
    }
  };

  const formStyles: string = ` 
     shadow-shadowBoxDark from-smallWraperGradient1Dark
     to-smallWraperGradient2Dark  ${registrationFormStyles} `;

  return (
    <>
      <Modal open={isVerifyModalOpen} onCancel={closeVerifyModal} footer={null}>
        <h1 className=" text-3xl text-center mb-8">Registration is succes</h1>
        <p className="text-lg text-center">Before start you should verify email</p>
        <p className="mt-3 text-lg text-center">{user.email}</p>
        <div className="flex mt-12">
          <RegistrationFormButton
            isLoading={isRefreshing}
            onClick={closeVerifyModal}
            text="Accept"
          />
          <RegistrationFormButton
            text="Resent Email"
            isLoading={isRefreshing}
            onClick={handleResentEmail}
            resended={resended}
            timeRemaining={timeRemaining}
          />
        </div>
      </Modal>
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
          <RegistrationFormButton isLoading={isRefreshing} text="Registration" />
        </Form>
      </Formik>
    </>
  );
};

export default Registration;

import { Dispatch } from "redux";
import { register } from "../redux/auth/operations-auth";
import { failedRegistrationValidation } from "./notiflix";
import { changeIsLoadingToken, setIsVerifyModalOpen } from "../redux/auth/slice-auth";

interface UserData {
  name: string;
  email: string;
  password: string;
}

interface Errors {
  name?: string;
  email?: string;
  password?: string;
}

interface Credentials {
  name: string;
  email: string;
  password: string;
}

const convertToCredentials = (userData: UserData): Credentials => {
  return {
    name: userData.name,
    email: userData.email,
    password: userData.password,
  };
};

export const validateRegistration = (userData: UserData): Errors => {
  let errors: Errors = {};

  if (
    !userData.name ||
    userData.name.trim().length < 2 ||
    userData.name.trim().length > 16
  ) {
    errors = {
      ...errors,
      name: "Please enter a name with at least 2 characters.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!userData.email || !emailRegex.test(userData.email.trim())) {
    errors = { ...errors, email: "Please enter a valid email address." };
  }

  if (!userData.password || userData.password.trim().length < 7) {
    errors = {
      ...errors,
      password: "Password should be at least 7 characters long.",
    };
  }

  return errors;
};

export const handleRegistration = (
  userData: UserData,
  dispatch: Dispatch<any>
): Errors | void => {
  const errors: Errors = validateRegistration(userData);

  if (Object.keys(errors).length === 0) {
    const credentials: Credentials = convertToCredentials(userData);
    dispatch(register(credentials));
    dispatch(setIsVerifyModalOpen(true));
  } else {
    failedRegistrationValidation();
    dispatch(changeIsLoadingToken(false));
    return errors;
  }
};

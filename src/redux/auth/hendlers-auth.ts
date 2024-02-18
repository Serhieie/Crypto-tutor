import { AuthState } from "./redux-auth.type";
import { succesChangePasswordEmail, succesChangePassword } from "../../helpers/notiflix";

const handlePending = (state: AuthState): AuthState => {
  return { ...state, isLoadingUser: true };
};

const handleRejected = (state: AuthState): AuthState => {
  return { ...state, error: true, isLoadingUser: false };
};

const handleRegisterFulfilled = (
  state: AuthState,
  action: { payload: any }
): AuthState => {
  if (action.payload && action.payload.user) {
    return {
      ...state,
      user: {
        name: action.payload.user?.name || "",
        email: action.payload.user?.email || "",
      },
      token: action.payload.token,
      isLoadingUser: false,
      isLoggedIn: false,
      isVerifyModalOpen: true,
    };
  }
  return state;
};

const handleRegisterRejected = (
  state: AuthState,
  action: { payload: any }
): AuthState => {
  return {
    ...state,
    isLoadingUser: false,
    user: {
      name: action.payload.user?.name || "",
      email: action.payload.user?.email || "",
    },
    token: null,
    isLoggedIn: false,
    error: true,
    isVerifyModalOpen: false,
  };
};

const handleLoginFulfilled = (state: AuthState, action: { payload: any }): AuthState => {
  if (action.payload && action.payload.user) {
    return {
      ...state,
      user: action.payload.user,
      token: action.payload.token,
      isLoggedIn: true,
      isLoadingUser: false,
      changingPass: false,
    };
  }
  return state;
};

const handleLogoutFulfilled = (state: AuthState): AuthState => {
  return {
    ...state,
    isLoadingUser: false,
    user: {
      name: "",
      email: "",
    },
    token: null,
    isLoggedIn: false,
    avatar: "",
  };
};

const handleFetchCurrentUserFulfilled = (
  state: AuthState,
  action: { payload: any }
): AuthState => {
  if (action.payload) {
    return {
      ...state,
      user: { ...action.payload },
      isLoadingUser: false,
      isLoggedIn: true,
    };
  }
  return state;
};

const handleResentEmailVerifyFulfilled = (state: AuthState): AuthState => {
  succesChangePasswordEmail();
  return { ...state, isLoadingUser: false };
};

const handleChangePasswordRequestFulfilled = (state: AuthState): AuthState => {
  succesChangePasswordEmail();
  return { ...state, isLoadingUser: false, changingPass: true };
};

const handleChangePasswordFulfilled = (state: AuthState): AuthState => {
  succesChangePassword();
  return { ...state, isLoadingUser: false, changingPass: false };
};
export {
  handlePending,
  handleRegisterFulfilled,
  handleRegisterRejected,
  handleLoginFulfilled,
  handleLogoutFulfilled,
  handleFetchCurrentUserFulfilled,
  handleRejected,
  handleResentEmailVerifyFulfilled,
  handleChangePasswordRequestFulfilled,
  handleChangePasswordFulfilled,
};

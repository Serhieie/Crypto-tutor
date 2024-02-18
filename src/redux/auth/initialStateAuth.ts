import { AuthState } from "./redux-auth.type";

export const initialStateAuth: AuthState = {
  user: { name: "", email: "" },
  token: null,
  isLoggedIn: false,
  isLoadingUser: false,
  avatar: "",
  error: false,
  isVerifyModalOpen: false,
  isChangePasswordModalOpen: false,
  timeRemaining: 30,
  changingPass: false,
  resended: false,
};

import { useSelector } from "react-redux";
import { AuthState } from "../../redux/auth/redux-auth.type";
import {
  getUserAuth,
  getError,
  getisLoadingUser,
  getToken,
  getLogedIn,
  getUserData,
  getAvatar,
  getIsVerifyModalOpen,
  getIsChangePasswordModalOpen,
  getChangingPass,
  getResended,
  getTimeRemaining,
} from "../../redux/auth/selectors-auth";

export interface useAuthReturn {
  isLoggedIn: boolean;
  isRefreshing: boolean;
  user: { name: string; email: string };
  error: boolean;
  token: string | null;
  avatar: string;
  fullAuth: AuthState;
  isVerifyModalOpen: boolean;
  isChangePasswordModalOpen: boolean;
  changingPass: boolean;
  resended: boolean;
  timeRemaining: number;
}

export const useAuth = (): useAuthReturn => {
  const isLoggedIn: boolean = useSelector(getLogedIn);
  const isRefreshing: boolean = useSelector(getisLoadingUser);
  const user: { name: string; email: string } = useSelector(getUserData);
  const error: boolean = useSelector(getError);
  const token: string | null = useSelector(getToken);
  const avatar: string = useSelector(getAvatar);
  const fullAuth: AuthState = useSelector(getUserAuth);
  const isVerifyModalOpen: boolean = useSelector(getIsVerifyModalOpen);
  const isChangePasswordModalOpen: boolean = useSelector(getIsChangePasswordModalOpen);
  const changingPass: boolean = useSelector(getChangingPass);
  const resended: boolean = useSelector(getResended);
  const timeRemaining: number = useSelector(getTimeRemaining);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    fullAuth,
    token,
    error,
    avatar,
    isVerifyModalOpen,
    isChangePasswordModalOpen,
    changingPass,
    resended,
    timeRemaining,
  };
};

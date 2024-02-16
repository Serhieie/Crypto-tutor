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
  getChangingPass,
  getResended,
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
  changingPass: boolean;
  resended: boolean;
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
  const changingPass: boolean = useSelector(getChangingPass);
  const resended: boolean = useSelector(getResended);

  return {
    isLoggedIn,
    isRefreshing,
    user,
    fullAuth,
    token,
    error,
    avatar,
    isVerifyModalOpen,
    changingPass,
    resended,
  };
};

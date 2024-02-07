import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getLogedIn, getToken } from "../redux/auth/selectors-auth";
import { RedirectProps } from "./Redirect.type";

const ToLoginRoute: React.FC<RedirectProps> = ({ children, redirectTo = "/" }) => {
  const token = useSelector(getToken);
  const isLoggedIn = useSelector(getLogedIn);

  // If the user has no token and is not logged in and not loading, then redirect
  const shouldRedirect = !isLoggedIn && token;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <>{children}</>;
};

export default ToLoginRoute;

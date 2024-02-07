import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getLogedIn, getToken } from "../redux/auth/selectors-auth";
import { RedirectProps } from "./Redirect.type";

const RestrictedRoute: React.FC<RedirectProps> = ({ children, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(getLogedIn);
  const token = useSelector(getToken);
  const shouldRedirect = isLoggedIn && token;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <>{children}</>;
};

export default RestrictedRoute;

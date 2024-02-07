import { Navigate } from "react-router-dom";
import { RedirectProps } from "./Redirect.type";
import { useAuth } from "../helpers/hooks/authSelector";

const RestrictedRoute: React.FC<RedirectProps> = ({ children, redirectTo = "/" }) => {
  const { token, isLoggedIn } = useAuth();
  const shouldRedirect = isLoggedIn && token;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <>{children}</>;
};

export default RestrictedRoute;

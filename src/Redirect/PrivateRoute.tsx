import { Navigate } from "react-router-dom";
import { RedirectProps } from "./Redirect.type";
import { useAuth } from "../helpers/hooks/authSelector";

const PrivateRoute: React.FC<RedirectProps> = ({ children, redirectTo = "/" }) => {
  const { token, isLoggedIn, isRefreshing } = useAuth();

  const shouldRedirect = !isRefreshing && !isLoggedIn && !token;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <>{children}</>;
};

export default PrivateRoute;

import { useAuth } from "../helpers/hooks/authSelector";
import { Navigate } from "react-router-dom";
import { RedirectProps } from "./Redirect.type";

const ToLoginRoute: React.FC<RedirectProps> = ({ children, redirectTo = "/" }) => {
  const { isLoggedIn, changingPass } = useAuth();

  // If the user has no token and is not logged in and not loading, then redirect
  const shouldRedirect = !isLoggedIn && !changingPass;

  return shouldRedirect ? <Navigate to={redirectTo} /> : <>{children}</>;
};

export default ToLoginRoute;

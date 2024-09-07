import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/ui/Spinner/Spinner";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Spinner />;
  if (user) return children;
  return <Navigate to="/signin" state={location.pathname} replace="true" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.element,
};

export default PrivateRoute;

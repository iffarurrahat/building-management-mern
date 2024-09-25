import PropTypes from "prop-types";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router-dom";
import Spinner from "../components/ui/Spinner/Spinner";

const AdminRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <Spinner />;

  if (role === "admin") return children;

  return <Navigate to="/dashboard" />;
};

AdminRoute.propTypes = {
  children: PropTypes.element,
};
export default AdminRoute;

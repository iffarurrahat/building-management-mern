import PropTypes from "prop-types";
import useRole from "../hooks/useRole";
import { Navigate } from "react-router-dom";
import Spinner from "../components/ui/Spinner/Spinner";

const MemberRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <Spinner />;

  if (role === "member") return children;

  return <Navigate to="/dashboard" />;
};

MemberRoute.propTypes = {
  children: PropTypes.element,
};
export default MemberRoute;

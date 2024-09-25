import { Navigate } from "react-router-dom";
import useRole from "../../hooks/useRole";

const DashboardDefaultRoute = () => {
  const [role] = useRole();

  if (role === "admin") {
    return <Navigate to="/dashboard/admin-profile" />;
  } else {
    return <Navigate to="/dashboard/my-profile" />;
  }
};

export default DashboardDefaultRoute;

import { Navigate } from "react-router-dom";
import useRole from "../../hooks/useRole";
import Spinner from "../../components/ui/Spinner/Spinner";

const DashboardDefaultRoute = () => {
  const [role, isLoading] = useRole();

  // Show a spinner while the role is being determined
  if (isLoading) {
    return <Spinner />;
  }

  // Redirect based on the role once the loading is finished
  if (role === "admin") {
    return <Navigate to="/dashboard/admin-profile" />;
  } else {
    return <Navigate to="/dashboard/my-profile" />;
  }
};

export default DashboardDefaultRoute;

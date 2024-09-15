import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Auth/SignUp";
import SignIn from "../pages/Auth/SignIn";
import Apartment from "../pages/Apartment/Apartment";
import Blogs from "../pages/Blogs/Blogs";
import DashboardLayout from "../layout/DashboardLayout";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MyProfile from "../pages/Dashboard/Common/MyProfile";
import MakePayment from "../pages/Dashboard/Member/MakePayment";
import PaymentHistory from "../pages/Dashboard/Member/PaymentHistory";
import Announcements from "../pages/Dashboard/Common/Announcements";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import ManageMembers from "../pages/Dashboard/Admin/ManageMembers";
import AgreementRequests from "../pages/Dashboard/Admin/AgreementRequests";
import ManageCoupons from "../pages/Dashboard/Admin/ManageCoupons";
import MakeAnnouncement from "../pages/Dashboard/Admin/MakeAnnouncement";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <p>Error</p>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/apartment",
        element: <Apartment />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <Statistics />,
      },
      {
        path: "my-profile",
        element: <MyProfile />,
      },
      {
        path: "make-payment",
        element: <MakePayment />,
      },
      {
        path: "payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "announcements",
        element: <Announcements />,
      },
      {
        path: "admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "manage-members",
        element: <ManageMembers />,
      },
      {
        path: "make-announcement",
        element: <MakeAnnouncement />,
      },
      {
        path: "agreement-requests",
        element: <AgreementRequests />,
      },
      {
        path: "manage-coupons",
        element: <ManageCoupons />,
      },
    ],
  },
]);

export default router;

import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Auth/SignUp";
import SignIn from "../pages/Auth/SignIn";
import Apartment from "../pages/Apartment/Apartment";
import Blogs from "../pages/Blogs/Blogs";
import DashboardLayout from "../layout/DashboardLayout";
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
import DashboardDefaultRoute from "../pages/Dashboard/DashboardDefaultRoute";
import ErrorPage from "../pages/ErrorPage";
import AdminRoute from "./AdminRoute";
import MemberRoute from "./MemberRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
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
        element: (
          <PrivateRoute>
            <DashboardDefaultRoute />
          </PrivateRoute>
        ),
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "announcements",
        element: (
          <PrivateRoute>
            <Announcements />
          </PrivateRoute>
        ),
      },
      {
        path: "make-payment",
        element: (
          <PrivateRoute>
            <MemberRoute>
              <MakePayment />
            </MemberRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "payment-history",
        element: (
          <PrivateRoute>
            <MemberRoute>
              <PaymentHistory />
            </MemberRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "admin-profile",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AdminProfile />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-members",
        element: (
          <PrivateRoute>
            <PrivateRoute>
              <ManageMembers />
            </PrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "make-announcement",
        element: (
          <PrivateRoute>
            <PrivateRoute>
              <MakeAnnouncement />
            </PrivateRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "agreement-requests",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <AgreementRequests />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-coupons",
        element: (
          <PrivateRoute>
            <PrivateRoute>
              <ManageCoupons />
            </PrivateRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;

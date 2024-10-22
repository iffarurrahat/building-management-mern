import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import AdminRoute from "./AdminRoute";
import MemberRoute from "./MemberRoute";
import SignUp from "../pages/Auth/SignUp";
import PrivateRoute from "./PrivateRoute";
import SignIn from "../pages/Auth/SignIn";
import ErrorPage from "../pages/ErrorPage";
import Apartment from "../pages/Apartment/Apartment";
import DashboardLayout from "../layout/DashboardLayout";
import AboutUsPage from "../pages/AboutUsPage/AboutUsPage";
import MyProfile from "../pages/Dashboard/Common/MyProfile";
import MakePayment from "../pages/Dashboard/Member/MakePayment";
import AdminProfile from "../pages/Dashboard/Admin/AdminProfile";
import ManageMembers from "../pages/Dashboard/Admin/ManageMembers";
import ManageCoupons from "../pages/Dashboard/Admin/ManageCoupons";
import Announcements from "../pages/Dashboard/Common/Announcements";
import PaymentHistory from "../pages/Dashboard/Member/PaymentHistory";
import MakeAnnouncement from "../pages/Dashboard/Admin/MakeAnnouncement";
import AgreementRequests from "../pages/Dashboard/Admin/AgreementRequests";
import DashboardDefaultRoute from "../pages/Dashboard/DashboardDefaultRoute";

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
        path: "/about",
        element: <AboutUsPage />,
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
            <AdminRoute>
              <ManageMembers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "make-announcement",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <MakeAnnouncement />
            </AdminRoute>
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
            <AdminRoute>
              <ManageCoupons />
            </AdminRoute>
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
    ],
  },
]);

export default router;

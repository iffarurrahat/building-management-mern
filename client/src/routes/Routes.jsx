import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import SignUp from "../pages/Auth/SignUp";
import SignIn from "../pages/Auth/SignIn";
import Apartment from "../pages/Apartment/Apartment";
import PrivateRoute from "./PrivateRoute";
import Blogs from "../pages/Blogs/Blogs";

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
        element: (
          <PrivateRoute>
            <Apartment />
          </PrivateRoute>
        ),
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
]);

export default router;

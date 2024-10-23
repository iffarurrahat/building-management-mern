import Drawer from "./Drawer";
import { useState } from "react";
import toast from "react-hot-toast";
import Container from "../ui/Container";
import useAuth from "../../hooks/useAuth";
import logoImg from "../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { RiCloseLine, RiMenu2Line } from "react-icons/ri";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logOut, setLoading } = useAuth();
  // New state for drawer
  const [drawerOpen, setDrawerOpen] = useState(false);

  // logout
  const handleSignOut = () => {
    logOut();
    const toastId = toast.loading("Loading...");

    try {
      toast.success("Logout Successful", { id: toastId });
      setDrawerOpen(false); // Close drawer on logout
    } catch (error) {
      if (error.message) {
        setLoading(false);
        toast.error("Something wrong", { id: toastId });
      }
    }
  };

  const routes = [
    { id: 1, path: "/", name: "Home" },
    { id: 2, path: "/apartment", name: "Apartment" },
    { id: 5, path: "/about", name: "About US" },
  ];

  // Conditionally add dashboard route if user is logged in
  if (user) {
    routes.push({ id: 3, path: "/dashboard", name: "Dashboard" });
  } else {
    routes.push({ id: 4, path: "/signin", name: "Signin" });
  }

  return (
    <div className="font-roboto text-sm font-semibold absolute top-0 left-0 right-0 z-50 md:text-white">
      <Container>
        <div className="flex items-center justify-between py-4 md:py-0">
          <Link to="/">
            <img
              src={logoImg}
              alt="logo"
              className="w-20 md:w-28 lg:w-32 cursor-pointer"
            />
          </Link>
          <div>
            <div
              className="md:hidden text-xl sm:text-2xl text-primary cursor-pointer"
              onClick={() => setOpen(!open)}
            >
              {open ? <RiCloseLine /> : <RiMenu2Line />}
            </div>
            <ul
              className={`md:flex items-center gap-14 absolute md:static mr-4 md:mr-0 md:pr-0 right-0 rounded-lg ${
                open
                  ? "py-6 min-w-44 text-center top-12 shadow-lg md:shadow-transparent bg-white md:bg-transparent space-y-3.5 md:space-y-0 duration-700"
                  : "-top-60 py-6 min-w-44 space-y-3.5 md:space-y-0 text-center duration-0"
              }`}
            >
              {routes.map((route) => (
                <li key={route.id}>
                  <NavLink
                    to={route.path}
                    className={({ isActive }) =>
                      isActive && route.name !== "Logout"
                        ? "border-2 border-primary md:border-white text-primary md:text-white text-[15px] px-3 py-1 rounded"
                        : ""
                    }
                    onClick={route.onClick ? route.onClick : null}
                  >
                    {route.name}
                  </NavLink>
                </li>
              ))}

              {user && (
                <div className="flex justify-center">
                  <img
                    src={user?.photoURL}
                    className="border-2 border-primary cursor-pointer w-10 h-10 rounded-full p-[2px]"
                    onClick={() => setDrawerOpen(true)} // Set drawerOpen to true on click
                  />
                </div>
              )}
            </ul>
          </div>
        </div>
      </Container>

      {/* Add Drawer component */}
      <Drawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={user}
        handleSignOut={handleSignOut}
      />
    </div>
  );
};

export default Navbar;

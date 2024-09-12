import { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { BsGraphUp } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { FaHistory } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { AiOutlineBars } from "react-icons/ai";
import { TfiAnnouncement } from "react-icons/tfi";

import useAuth from "../../../hooks/useAuth";
import logoImg from "../../../assets/logo.png";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);

  // Sidebar Responsive Handler
  const handleToggle = () => {
    setActive(!isActive);
  };
  return (
    <>
      {/* Small Screen Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img
                // className='hidden md:block'
                src={logoImg}
                alt="logo"
                width="100"
                height="100"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-5 shadow rounded-lg justify-center items-center mx-auto border">
              <Link to="/">
                <img
                  // className='hidden md:block'
                  src={logoImg}
                  alt="logo"
                  className="md:w-28 lg:w-32"
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            {/* Conditional toggle button here.. */}

            {/*  Menu Items */}
            <nav>
              {/* Statistics */}
              <NavLink
                to="/dashboard"
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <BsGraphUp className="w-5 h-5" />

                <span className="mx-4 font-medium">Statistics</span>
              </NavLink>

              {/* My Profile */}
              <NavLink
                to="my-profile"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <ImProfile className="w-5 h-5" />

                <span className="mx-4 font-medium">My Profile</span>
              </NavLink>

              {/* Make payment */}
              <NavLink
                to="make-payment"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <MdPayment className="w-5 h-5" />

                <span className="mx-4 font-medium">Make payment</span>
              </NavLink>

              {/* Payment history */}
              <NavLink
                to="payment-history"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <FaHistory className="w-5 h-5" />

                <span className="mx-4 font-medium">Payment History</span>
              </NavLink>

              {/* Announcements */}
              <NavLink
                to="announcements"
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 my-5  transition-colors duration-300 transform  hover:bg-gray-300   hover:text-gray-700 ${
                    isActive ? "bg-gray-300  text-gray-700" : "text-gray-600"
                  }`
                }
              >
                <TfiAnnouncement className="w-5 h-5" />

                <span className="mx-4 font-medium">Announcements</span>
              </NavLink>
            </nav>
          </div>
        </div>

        <div>
          <hr />
          <button
            onClick={logOut}
            className="flex w-full items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-300   hover:text-gray-700 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />

            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;

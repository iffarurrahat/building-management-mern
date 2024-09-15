import { useState } from "react";
import { Link } from "react-router-dom";
import { GrLogout } from "react-icons/gr";
import { BsGraphUp } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { FaHistory } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { AiOutlineBars } from "react-icons/ai";
import { TfiAnnouncement } from "react-icons/tfi";

import useAuth from "../../../hooks/useAuth";
import logoImg from "../../../assets/logo.png";
import MenuItem from "./Menu/MenuItem";

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
              <MenuItem
                label="Statistics"
                address="/dashboard"
                icon={BsGraphUp}
              />

              {/* My Profile */}
              <MenuItem
                label="My Profile"
                address="my-profile"
                icon={ImProfile}
              />

              {/* Make payment */}
              <MenuItem
                label="Make Payment"
                address="make-payment"
                icon={MdPayment}
              />

              {/* Payment history */}
              <MenuItem
                label="Payment History"
                address="payment-history"
                icon={FaHistory}
              />

              {/* Announcements */}
              <MenuItem
                label="Announcements"
                address="announcements"
                icon={TfiAnnouncement}
              />
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

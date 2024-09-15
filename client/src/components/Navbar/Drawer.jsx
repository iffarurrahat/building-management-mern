import PropTypes from "prop-types";
import { MdVerified } from "react-icons/md";

const Drawer = ({ isOpen, onClose, user, handleSignOut }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-64 bg-white h-full shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out z-50`}
    >
      <div className="p-4 flex items-center justify-between text-black">
        <h2 className="text-xl font-semibold">Profile</h2>
        <button onClick={onClose} className="text-2xl">
          &times;
        </button>
      </div>
      <div className="p-4">
        <div className="relative">
          <img
            src={
              user?.photoURL || "https://i.ibb.co/FHzbGp2/default-profile.png"
            }
            className="border-2 border-primary w-20 h-20 rounded-full mx-auto"
            alt="User Avatar"
          />
          {user?.emailVerified === true && (
            <MdVerified className="text-green-600  text-xl absolute bottom-3 left-[140px]" />
          )}
        </div>
        <h3 className="text-center mt-2 text-black pointer-events-none uppercase">
          {user?.displayName || "User name not found"}
        </h3>
        <p className="text-center text-sm text-black pointer-events-auto">
          {user?.email}
        </p>

        <div className="absolute bottom-4 w-full px-10">
          <button
            onClick={onClose}
            className="mb-4 w-full py-2 bg-primary text-white rounded"
          >
            Close Drawer
          </button>

          <button
            onClick={handleSignOut}
            className="w-full py-2 bg-red-600 text-white rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

Drawer.propTypes = {
  user: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  handleSignOut: PropTypes.func.isRequired,
};
export default Drawer;

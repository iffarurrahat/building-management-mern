import PropTypes from "prop-types";
import { MdVerified } from "react-icons/md";

const Drawer = ({ isOpen, onClose, user, handleSignOut }) => {
  return (
    <div
      className={`fixed top-0 right-0 w-64 bg-white h-full shadow-lg transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}
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
        <h3 className="text-center mt-2 text-black">
          {user?.displayName || "User name not found"}
        </h3>
        <p className="text-center text-sm text-black">{user?.email}</p>
        <button
          onClick={handleSignOut}
          className="mt-4 w-full py-2 bg-primary text-white rounded"
        >
          Logout
        </button>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 bg-primary text-white rounded"
        >
          Close Drawer
        </button>
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

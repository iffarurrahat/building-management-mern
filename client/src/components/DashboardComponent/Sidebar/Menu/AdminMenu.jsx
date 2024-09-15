import MenuItem from "./MenuItem";
import { RiCoupon2Fill } from "react-icons/ri";
import { PiMemberOfFill } from "react-icons/pi";
import { MdAnnouncement } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoGitPullRequestSharp } from "react-icons/io5";

const AdminMenu = () => {
  return (
    <>
      {/* Admin Profile */}
      <MenuItem
        icon={MdAdminPanelSettings}
        label="Admin Profile"
        address="admin-profile"
      />

      {/* Manage Members */}
      <MenuItem
        icon={PiMemberOfFill}
        label="Manage Members"
        address="manage-members"
      />

      {/* Make Announcement */}
      <MenuItem
        icon={MdAnnouncement}
        label="Make Announcement"
        address="make-announcement"
      />

      {/* Agreement Requests */}
      <MenuItem
        icon={IoGitPullRequestSharp}
        label="Agreement Requests"
        address="agreement-requests"
      />

      {/* Manage Coupons */}
      <MenuItem
        icon={RiCoupon2Fill}
        label="Manage Coupons"
        address="manage-coupons"
      />
    </>
  );
};

export default AdminMenu;

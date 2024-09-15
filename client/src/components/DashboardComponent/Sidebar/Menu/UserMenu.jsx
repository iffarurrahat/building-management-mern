import MenuItem from "./MenuItem";
import { ImProfile } from "react-icons/im";
import { TfiAnnouncement } from "react-icons/tfi";

const UserMenu = () => {
  return (
    <>
      {/* My Profile */}
      <MenuItem label="My Profile" address="my-profile" icon={ImProfile} />

      {/* Announcements */}
      <MenuItem
        label="Announcements"
        address="announcements"
        icon={TfiAnnouncement}
      />
    </>
  );
};

export default UserMenu;

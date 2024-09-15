import { ImProfile } from "react-icons/im";
import { FaHistory } from "react-icons/fa";
import { MdPayment } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import MenuItem from "./MenuItem";

const MemberMenu = () => {
  return (
    <>
      {/* My Profile */}
      <MenuItem label="My Profile" address="my-profile" icon={ImProfile} />

      {/* Make payment */}
      <MenuItem label="Make Payment" address="make-payment" icon={MdPayment} />

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
    </>
  );
};

export default MemberMenu;

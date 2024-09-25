import PropTypes from "prop-types";
import { MdDateRange } from "react-icons/md";
import { MdOutlineAnnouncement } from "react-icons/md";

const NoticeCard = ({ notice }) => {
  const { title, details, postDate } = notice || {};
  return (
    <div className="max-w-4xl mx-auto px-8 py-4 rounded-lg shadow border bg-gray-100/50">
      <span className="text-sm font-light flex items-center gap-1 mb-1">
        <MdDateRange /> {new Date(postDate).toLocaleDateString()}
      </span>

      <div>
        <p className="sm:text-lg md:text-xl font-bold hover:underline mb-2 flex items-center gap-1.5">
          <MdOutlineAnnouncement className="text-yellow-400" /> {title}
        </p>
        <p className="text-sm md:text-base">{details}</p>
      </div>
    </div>
  );
};

NoticeCard.propTypes = {
  notice: PropTypes.object.isRequired,
};
export default NoticeCard;

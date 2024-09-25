import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import image from "../../assets/breadcrumb-bg.png";

const EmptyStateMain = ({ title, pathname }) => {
  return (
    <div className="relative">
      <img
        src={image}
        className="bg-no-repeat object-cover w-full h-72 md:h-80 lg:h-96 brightness-50 bg-black"
        alt=""
      />
      <div className="absolute inset-0 bg-black opacity-40 pointer-events-none"></div>
      <div className="max-w-screen-xl mx-auto text-center flex justify-center">
        <div className="absolute top-1/3 md:top-1/2">
          <h2 className="text-2xl md:text-4xl text-white font-bold text-center">
            {title}
          </h2>

          <Link to="/">
            <div className="text-white px-3 py-2 rounded mt-1 md:mt-2 text-xs sm:text-base flex items-center gap-1 md:gap-2">
              <span>{pathname}</span>
              <span className="font-bold text-xs md:text-lg">::</span>
              <p>
                <span>{title}</span>
                <span> Grid View</span>
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

EmptyStateMain.propTypes = {
  title: PropTypes.string.isRequired,
  // image: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
  btn: PropTypes.string,
  route: PropTypes.string,
};

export default EmptyStateMain;

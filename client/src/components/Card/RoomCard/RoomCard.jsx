import "./RoomCard.css";
import PropTypes from "prop-types";
import { IoCartOutline } from "react-icons/io5";
import useAuth from "../../../hooks/useAuth";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  const { user } = useAuth();
  const { image, rent, apartmentNo, floorNo, blockName } = room || {};
  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto image-modifier ">
      <div className="image-style w-full">
        <img
          src={image}
          className="object-cover rounded-lg shadow-md h-48 sm:h-56 md:h-60 lg:h-64 w-full image-effect"
          alt=""
        />
      </div>

      <div className="w-4/5 sm:w-3/4 md:w-4/5 lg:w-3/4 -mt-20 overflow-hidden bg-white rounded-lg shadow-lg z-40">
        <h3 className="pt-2 md:font-medium tracking-wide px-3 text-primary">
          Apartment No {apartmentNo}
        </h3>

        <div className="flex items-center justify-between text-xs my-1 px-3 font-light">
          <p> Floor No {floorNo}</p>
          <p>Block Name {blockName}</p>
        </div>

        <div className="flex items-center justify-between px-3 py-2 bg-primary">
          <span className="font-bold text-gray-800 dark:text-gray-200">
            ${rent}
          </span>
          {user ? (
            <button className="px-2 py-1 text-xs font-semibold text-white transition-colors duration-300 transform bg-[#5E17EB] rounded hover:bg-primary  focus:bg-[#5E17EB] flex items-center gap-0.5">
              <IoCartOutline className="font-bold" />
              Agreement
            </button>
          ) : (
            <Link to="/signin">
              <button className="px-2 py-1 text-xs font-semibold text-white transition-colors duration-300 transform bg-[#5E17EB] rounded hover:bg-primary  focus:bg-[#5E17EB] flex items-center gap-0.5">
                <IoCartOutline className="font-bold" />
                Agreement
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

RoomCard.propTypes = {
  room: PropTypes.object.isRequired,
};
export default RoomCard;

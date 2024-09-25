import "./RoomCard.css";
import { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { IoCartOutline } from "react-icons/io5";
import { useMutation } from "@tanstack/react-query";
import BookingModal from "../../Modal/BookingModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { addMonths, differenceInMonths, format } from "date-fns";

const RoomCard = ({ room }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const { image, rent, apartmentNo, floorNo, blockName, booked } = room || {};

  const agreementReqDate = format(new Date(), "yyyy-MM-dd");

  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: addMonths(new Date(), 1), // Initial date range is set for 1 month
    key: "selection",
  });

  const handleDates = (item) => {
    setDates(item.selection);
  };

  const { mutateAsync } = useMutation({
    mutationFn: async (booking) => {
      const { data } = await axiosSecure.post("/booking", booking);
      return data;
    },
    onSuccess: () => {
      toast.success("Booking successfully!");
      setIsOpen(false);
    },
  });

  //handle Book Apartment
  const handleBookApartment = async (info) => {
    // Ensure that dates are valid and startDate is before endDate
    if (dates.startDate >= dates.endDate) {
      toast.error("End date must be after start date.");
      return;
    }

    // // Calculate booking duration in months
    const bookingDuration =
      differenceInMonths(dates.endDate, dates.startDate) + 1;

    // Check if the duration is at least one month
    if (bookingDuration < 1) {
      toast.error("Booking must be for at least one full month!");
      return;
    }

    const bookingUser = {
      booking_name: user?.displayName,
      booking_email: user?.email,
    };

    const bookingInfo = {
      booking_id: info._id,
      floor_no: info.floorNo,
      block_name: info.blockName,
      apartment_no: info.apartmentNo,
      rent: info.rent,
      status: "Requested",
      bookingUser,
      to: dates.endDate,
      from: dates.startDate,
      bookingDuration: bookingDuration,
      agreementReqDate,
    };

    try {
      await mutateAsync(bookingInfo);
      navigate("/dashboard/my-profile");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto image-modifier ">
      <div className="image-style w-full">
        <img
          src={image}
          className="object-cover rounded-lg shadow-md h-48 sm:h-56 md:h-60 lg:h-64 w-full image-effect"
          alt=""
        />
      </div>

      <div className="w-4/5 sm:w-3/4 md:w-4/5 lg:w-3/4 -mt-20 overflow-hidden bg-white rounded-lg shadow-lg z-10">
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
            <>
              <button
                disabled={booked === true}
                onClick={() => setIsOpen(true)}
                className="px-2 py-1 text-xs font-semibold text-white transition-colors duration-300 transform bg-[#5E17EB] rounded hover:bg-primary focus:bg-[#5E17EB]"
              >
                {booked === true ? (
                  <span>Booked</span>
                ) : (
                  <span className="flex items-center gap-0.5">
                    <IoCartOutline className="font-bold" />
                    Agreement
                  </span>
                )}
              </button>
              {/* Modal */}
              <BookingModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                bookingInfo={{
                  ...room,
                  member: {
                    name: user?.displayName,
                    email: user?.email,
                    image: user?.photoURL,
                  },
                }}
                handleBookApartment={handleBookApartment}
                handleDates={handleDates}
                dates={dates}
              />
            </>
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

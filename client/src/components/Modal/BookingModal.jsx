import Modal from "./Modal";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { addMonths } from "date-fns";
import { DateRange } from "react-date-range";
import { Transition, TransitionChild } from "@headlessui/react";

const BookingModal = ({
  isOpen,
  setIsOpen,
  bookingInfo,
  handleBookApartment,
  handleDates,
  dates,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={"Review Info Before Book Apartment"}
    >
      <Transition appear show={isOpen} as={Fragment}>
        <div className="flex min-h-full items-center justify-center text-center transform">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white text-left align-middle">
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 pt-2 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="border p-2 text-xs">Floor No</th>
                        <th className="border p-2 text-xs">Apartment No</th>
                        <th className="border p-2 text-xs">Block Name</th>
                        <th className="border p-2 text-xs">Rent</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border p-2 text-xs">
                          {bookingInfo?.floorNo}
                        </td>
                        <td className="border p-2 text-xs">
                          {bookingInfo?.apartmentNo}
                        </td>
                        <td className="border p-2 text-xs">
                          {bookingInfo?.blockName}
                        </td>
                        <td className="border p-2 text-xs">
                          $ {bookingInfo?.rent}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-2">
                <label
                  htmlFor="location"
                  className="block text-gray-600 text-sm mb-1 font-bold"
                >
                  Which mount you want book apartment
                </label>
                {/* Calender */}
                <DateRange
                  rangeColors={["#8c52ff"]}
                  editableDateInputs={true}
                  onChange={(item) => handleDates(item)}
                  moveRangeOnFirstSelection={false}
                  ranges={[dates]}
                  minDate={new Date()} // Prevent selecting past dates
                  maxDate={addMonths(new Date(), 12)} // Allow up to 12 months of booking
                  className="w-full"
                />
              </div>

              <hr />
              <div className="flex mt-2 justify-around">
                <button
                  onClick={() => handleBookApartment(bookingInfo)}
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                  Book Apartment
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Transition>
    </Modal>
  );
};

BookingModal.propTypes = {
  bookingInfo: PropTypes.object,
  modalHandler: PropTypes.func,
  handleDates: PropTypes.func,
  dates: PropTypes.object,
  handleBookApartment: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default BookingModal;

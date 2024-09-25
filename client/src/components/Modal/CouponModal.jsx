import Modal from "./Modal";
import { Fragment } from "react";
import PropTypes from "prop-types";
import { Transition, TransitionChild } from "@headlessui/react";

const CouponModal = ({ isOpen, setIsOpen, handleCoupon }) => {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title={"Here is your coupons filed !!"}
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
            <form
              onSubmit={handleCoupon}
              className="w-full max-w-md transform rounded-2xl bg-white mt-3"
            >
              <div className="flex items-center gap-3">
                <div>
                  <label className="block mb-1 text-start text-xs">
                    Coupon Code
                  </label>
                  <input
                    type="text"
                    name="couponCode"
                    required
                    placeholder="Coupon Code"
                    className="w-full p-2 border rounded-md border-gray-300 focus:outline-primary text-gray-900 placeholder:text-xs"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-start text-xs">
                    Discount Percentage
                  </label>
                  <input
                    type="number"
                    name="percentage"
                    required
                    placeholder="Percentage"
                    className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary text-gray-900 placeholder:text-xs"
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="block mb-1 text-start text-xs">
                  Coupon Description
                </label>
                <textarea
                  type="text"
                  name="description"
                  required
                  placeholder="Coupon Description"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary text-gray-900 placeholder:text-xs"
                ></textarea>
              </div>

              <hr className="my-2" />
              <div className="flex justify-around">
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </TransitionChild>
        </div>
      </Transition>
    </Modal>
  );
};

CouponModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  handleCoupon: PropTypes.func,
};

export default CouponModal;

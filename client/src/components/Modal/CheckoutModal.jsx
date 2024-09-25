import axios from "axios";
import Modal from "./Modal";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import Spinner from "../ui/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import { Transition, TransitionChild } from "@headlessui/react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Form/CheckoutForm";
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutModal = ({ isOpen, setIsOpen, booking, refetch }) => {
  // State to store coupon input and button disabled status
  const [couponCode, setCouponCode] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [discountedTotal, setDiscountedTotal] = useState(
    booking?.bookingDuration * booking?.rent
  );

  // Fetch the latest coupon data
  const { data: latestCoupon, isLoading } = useQuery({
    queryKey: ["latestCoupon"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/coupons/latest`
      );
      return data;
    },
  });

  // Handle coupon code input change
  const handleCouponInputChange = (e) => {
    const enteredCode = e.target.value;
    setCouponCode(enteredCode);

    // Enable the Apply button if the entered coupon matches the latest coupon
    if (enteredCode === latestCoupon?.couponCode) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  // Handle applying the coupon
  const handleApplyCoupon = () => {
    if (couponCode === latestCoupon?.couponCode) {
      const discount =
        (latestCoupon.percentage / 100) *
        (booking?.bookingDuration * booking?.rent);
      setDiscountedTotal(booking?.bookingDuration * booking?.rent - discount);

      // Disable the coupon input and Apply button after applying the coupon
      setIsCouponApplied(true);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={"Your Payment"}>
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
            <div className="w-full max-w-md transform bg-white text-left align-middle">
              <div>
                <div className="flex items-center mb-5 mt-3 w-full">
                  <div className="w-full">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={handleCouponInputChange}
                      disabled={isCouponApplied} // Disable input if coupon is applied
                      placeholder="Type Coupon"
                      className="block w-full placeholder:text-xs rounded-l-lg border border-gray-200 bg-white px-3 py-2 text-gray-700 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    disabled={isButtonDisabled || isCouponApplied} // Disable button if no match or coupon is applied
                    className={`px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform ${
                      isButtonDisabled || isCouponApplied
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-primary border-primary"
                    } border rounded-r-lg focus:outline-none focus:ring focus:ring-opacity-80`}
                  >
                    Applied
                  </button>
                </div>

                {/* payment details  */}
                <table className="min-w-full">
                  <thead>
                    <tr className="text-xs text-center">
                      <th className="border p-1">Duration</th>
                      <th className="border p-1">Rent</th>
                      <th className="border p-1">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="text-xs text-center">
                      <td className="border p-1">
                        {booking?.bookingDuration} /mon
                      </td>
                      <td className="border p-1">${booking?.rent}</td>
                      <td className="border p-1">$ {discountedTotal}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr className="my-5" />
              <Elements stripe={stripePromise}>
                {/* checkout form */}
                <CheckoutForm
                  refetch={refetch}
                  setIsOpen={setIsOpen}
                  booking={booking}
                  totalAmount={discountedTotal}
                />
              </Elements>
            </div>
          </TransitionChild>
        </div>
      </Transition>
    </Modal>
  );
};

CheckoutModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  booking: PropTypes.object.isRequired,
  refetch: PropTypes.func,
};
export default CheckoutModal;

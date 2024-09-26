import { useState } from "react";
import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { MdOutlinePayment } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/ui/Spinner/Spinner";
import CheckoutModal from "../../../components/Modal/CheckoutModal";

const MakePayment = () => {
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth() || {};
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/booking/${user?.email}`);
      return data;
    },
  });

  if (isLoading || loading) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>Make Payment | Dashboard</title>
      </Helmet>
      <div>
        <h1 className="max-w-4xl mx-auto text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold md:mt-10 lg:mt-16 xl:mt-20 2xl:mt-28 flex items-center gap-1">
          Make Payment <MdOutlinePayment />
        </h1>
        {/* make payment details only read */}
        {bookings.map((booking) => (
          <div key={booking._id}>
            <form className="max-w-4xl mx-auto overflow-hidden bg-primary/5 p-3 md:p-5 mt-5 md:mt-10 rounded">
              {/* apartment_no and block_name and floor_no */}
              <div className="flex item-center gap-5">
                <div className="w-full">
                  <label className="block mb-1 text-sm text-primary">
                    Apartment No
                  </label>
                  <input
                    className="block w-full px-4 py-2.5 border border-primary text-primary rounded"
                    defaultValue={booking.apartment_no}
                    disabled
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-1 text-sm text-primary">
                    Block Name
                  </label>
                  <input
                    className="block w-full px-4 py-2.5 border border-primary text-primary rounded"
                    defaultValue={booking.block_name}
                    disabled
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-1 text-sm text-primary">
                    Floor No
                  </label>
                  <input
                    className="block w-full px-4 py-2.5 border border-primary text-primary rounded"
                    defaultValue={booking.floor_no}
                    disabled
                  />
                </div>
              </div>

              {/* apartment_no and block_name and floor_no */}
              <div className="flex item-center gap-5 mt-5">
                <div className="w-full">
                  <label className="block mb-1 text-sm text-primary">
                    Rent
                  </label>
                  <input
                    className="block w-full px-4 py-2.5 border border-primary text-primary rounded"
                    defaultValue={booking.rent}
                    disabled
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-1 text-sm text-primary whitespace-nowrap">
                    Booking Duration
                  </label>
                  <input
                    className="block w-full px-4 py-2.5 border border-primary text-primary rounded"
                    defaultValue={booking.bookingDuration}
                    disabled
                  />
                </div>
                <div className="w-full">
                  <label className="block mb-1 text-sm text-primary">
                    Status
                  </label>
                  <input
                    className="block w-full px-4 py-2.5 border border-primary text-primary rounded"
                    defaultValue={booking.status}
                    disabled
                  />
                </div>
              </div>

              {/* booking start and end */}
              <div className="sm:flex item-center gap-5 my-5">
                <div className="w-full">
                  <label className="block mb-1 text-sm text-primary">
                    Booking to
                  </label>
                  <input
                    className="block w-full px-4 py-2.5 border border-primary text-primary rounded"
                    defaultValue={new Date(booking.to).toLocaleString()}
                    disabled
                  />
                </div>
                <div className="w-full mt-5 sm:mt-0">
                  <label className="block mb-1 text-sm text-primary">
                    Booking from
                  </label>
                  <input
                    className="block w-full px-4 py-2.5 border border-primary text-primary rounded"
                    defaultValue={new Date(booking.from).toLocaleString()}
                    disabled
                  />
                </div>
              </div>

              {/* booking name and booking email */}
              <div className="sm:flex item-center gap-5 my-5">
                <div className="w-full">
                  <label className="block mb-1 text-sm text-primary">
                    Booking Email
                  </label>
                  <input
                    className="block w-full px-4 py-2.5 border border-primary text-primary rounded"
                    defaultValue={booking?.bookingUser?.email}
                    disabled
                  />
                </div>
                <div className="w-full mt-5 sm:mt-0">
                  <label className="block mb-1 text-sm text-primary">
                    Booking Email
                  </label>
                  <input
                    className="block w-full px-4 py-2.5 border border-primary text-primary rounded"
                    defaultValue={booking?.bookingUser?.name}
                    disabled
                  />
                </div>
              </div>

              <CheckoutModal
                refetch={refetch}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                booking={booking}
              />
              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={() => setIsOpen(true)}
                  type="button"
                  className="px-10 py-3 text-sm font-medium text-white bg-primary rounded-lg"
                >
                  Payment
                </button>
              </div>
            </form>
          </div>
        ))}
      </div>
    </>
  );
};

export default MakePayment;

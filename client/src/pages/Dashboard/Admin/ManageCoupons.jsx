import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaArrowDown } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import { useMutation, useQuery } from "@tanstack/react-query";
import CouponModal from "../../../components/Modal/CouponModal";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import Spinner from "../../../components/ui/Spinner/Spinner";
import CouponsDataRow from "../../../components/DashboardComponent/Sidebar/TableRows/CouponsDataRow";

const ManageCoupons = () => {
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();

  const {
    data: coupons = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["coupons"],
    queryFn: async () => {
      const { data } = await axiosSecure("/coupons");
      return data;
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: async (coupons) => {
      const { data } = await axiosSecure.post("/coupons", coupons);
      return data;
    },
    onSuccess: () => {
      toast.success("Coupons Add Successfully");
    },
  });

  // Handle the form submission
  const handleCoupon = async (e) => {
    e.preventDefault();
    const form = e.target;
    const couponCode = form.couponCode.value;
    const percentage = form.percentage.value;
    const description = form.description.value;

    const coupons = { couponCode, percentage, description };

    try {
      await mutateAsync(coupons);
      refetch();
    } catch (err) {
      toast.error(err.message);
    }

    // Close the modal after submission
    setIsOpen(false);
  };

  if (isLoading) return <Spinner />;
  return (
    <>
      <Helmet>
        <title>Manage Coupons | Dashboard</title>
      </Helmet>
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-primary md:mt-5 lg:mt-10 xl:mt-16 2xl:mt-20 flex items-center justify-center gap-3 ">
          Manage Coupons <RiCoupon2Line />
        </h1>

        <div className="md:max-w-md lg:max-w-4xl xl:max-w-screen-lg mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto scrollbar-thin scrollbar-webkit">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-bold whitespace-nowrap"
                      >
                        Coupon Code
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-bold whitespace-nowrap"
                      >
                        Discount Percentage
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-bold whitespace-nowrap"
                      >
                        Coupon Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((coupon) => (
                      <CouponsDataRow key={coupon._id} coupon={coupon} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <h1 className="sm:text-xl md:text-2xl lg:text-3xl text-center font-bold mt-3 md:mt-5 border-2 border-black w-fit mx-auto p-2 rounded flex items-center gap-3">
          Click the Add Button Fill up the filed Coupons <FaArrowDown />
        </h1>
        <div className="flex justify-center mt-3">
          <button
            onClick={() => setIsOpen(true)}
            className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-primary focus:outline-none"
          >
            Add Button
          </button>
          {/* Coupon Modal */}
          <CouponModal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            handleCoupon={handleCoupon}
          />
        </div>
      </div>
    </>
  );
};

export default ManageCoupons;

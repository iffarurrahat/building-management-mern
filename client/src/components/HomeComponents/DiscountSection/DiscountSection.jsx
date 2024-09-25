import { Link } from "react-router-dom";
import Container from "../../ui/Container";
import "./DiscountSection.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../../ui/Spinner/Spinner";

const DiscountSection = () => {
  const { data: latestCoupon, isLoading } = useQuery({
    queryKey: ["latestCoupon"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/coupons/latest`
      );
      return data;
    },
  });

  if (isLoading) return <Spinner />;

  return (
    <div className=" mb-8 sm:mb-12 md:mb-20">
      <Container>
        {/* <!-- offer section --> */}
        <section>
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
            Best offers for you
          </h3>
          <div className="md:flex gap-6">
            {/* <!-- left side --> */}
            <div className="flex gap-3 md:gap-16 lg:gap-32 justify-evenly items-center py-12 w-full bg-[#FFBF0F] rounded-3xl relative shadow">
              <div className="space-y-1 md:space-y-2 px-3 md:px-0">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-extrabold">
                  {latestCoupon?.percentage}% OFF
                </h3>
                <h4 className="text-sm">{latestCoupon?.description}</h4>
                <p className="text-[#03071266]">use by October 2024</p>
              </div>
              <div className="px-3 md:px-0">
                <h3 className="text-xl md:text-2xl font-bold">
                  {latestCoupon?.couponCode}
                </h3>
                <p className="text-[#03071266]">Coupon Code</p>
              </div>
              {/* <!-- circle and dash --> */}
              <div className="absolute bg-white w-12 h-12 rounded-full -top-4 right-1/3"></div>
              <div className="absolute bg-white w-12 h-12 rounded-full -bottom-4 right-1/3"></div>
              <div className="absolute outline-dashed outline-1 outline-offset-3 outline-white h-full right-[40%] lg:right-[37%]"></div>
            </div>
            {/* <!-- right side --> */}
            <div className="flex gap-3 md:gap-16 lg:gap-32 justify-evenly items-center py-12 w-full bg-[#F78C9C] rounded-3xl relative mt-5 md:mt-0 shadow">
              <div className="space-y-1 md:space-y-2 px-3 md:px-0">
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-extrabold">
                  {latestCoupon?.percentage}% OFF
                </h3>
                <h4 className="text-sm">{latestCoupon?.description}</h4>
                <p className="text-[#03071266]">use by October 2024</p>
              </div>
              <div className="text-center px-3 md:px-0">
                <h3 className="text-xl md:text-2xl font-bold">
                  {latestCoupon?.couponCode}
                </h3>
                <p className="text-[#03071266]">Coupon Code</p>
              </div>
              <div className="absolute bg-white w-12 h-12 rounded-full -top-4 right-1/3"></div>
              <div className="absolute bg-white w-12 h-12 rounded-full -bottom-4 right-1/3"></div>
              <div className="absolute outline-dashed outline-1 outline-offset-3 outline-white h-full right-[40%] lg:right-[37%]"></div>
            </div>
          </div>
          <div className="text-center">
            <Link to="/apartment">
              <button className="text-primary px-8 py-3 border-2 border-primary rounded-lg cursor-pointer font-bold mt-14 hover:bg-primary hover:text-white transition-all">
                Purchase
              </button>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default DiscountSection;

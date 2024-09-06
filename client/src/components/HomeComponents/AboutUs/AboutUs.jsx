import Container from "../../ui/Container";
import { MdPhoneInTalk } from "react-icons/md";
import { RiTeamLine } from "react-icons/ri";
import { TbBuildingBank } from "react-icons/tb";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import aboutImg1 from "../../../assets/about-img-1.jpg";
import aboutImg2 from "../../../assets/about-img-2.jpg";

const AboutUs = () => {
  return (
    <Container>
      <div className="md:flex gap-12 mt-8 sm:mt-12 md:mt-20 mb-32">
        {/* LEFT Side */}
        <div className="md:flex-1">
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2 sm:mb-3 md:mb-6">
            About Us
          </h2>
          <p className="text-[#6E7070] text-base leading-8 md:text-lg md:leading-10">
            We are a real estate firm with over 20 years of expertise, and our
            main goal is to provide amazing locations to our partners and
            clients. Within the luxury real estate market, our agency offers
            customized solutions. We are a real estate firm with over 20 years
            of expertise. Our main goal is to provide amazing locations to our
            partners and clients.
          </p>
          <div className="flex justify-between mt-4 md:mt-8">
            <div>
              <ul className="space-y-2 md:space-y-3 lg:space-y-4 font-medium">
                <li className="flex items-center gap-1 text-[#6E7070]">
                  <IoMdCheckmarkCircleOutline className="text-lg md:text-xl" />
                  <span className="text-sm sm:text-base md:text-lg">
                    Quality real estate services
                  </span>
                </li>
                <li className="flex items-center gap-1 text-[#6E7070]">
                  <IoMdCheckmarkCircleOutline className="text-sm sm:text-lg md:text-xl" />
                  <span className="text-sm sm:text-base md:text-lg">
                    100% Satisfaction guarantee
                  </span>
                </li>
                <li className="flex items-center gap-1 text-[#6E7070]">
                  <IoMdCheckmarkCircleOutline className="text-sm sm:text-lg md:text-xl" />
                  <span className="text-sm sm:text-base md:text-lg">
                    Highly professional team
                  </span>
                </li>
                <li className="flex items-center gap-1 text-[#6E7070]">
                  <IoMdCheckmarkCircleOutline className="text-sm sm:text-lg md:text-xl" />
                  <span className="text-sm sm:text-base md:text-lg">
                    Dealing always on time
                  </span>
                </li>
              </ul>
            </div>
            <div className="border-r-[1px]"></div>
            <div className="space-y-1 md:space-y-2">
              <p className="bg-[#364440] p-1.5 md:p-3 rounded-full text-white inline-block">
                <MdPhoneInTalk className="md:text-xl" />
              </p>
              <h5 className="text-sm md:text-lg">Call Us 24/7</h5>
              <h4 className="md:text-xl font-medium">+01 234 56789</h4>
            </div>
          </div>
          <button className="bg-black text-white px-5 md:px-8 py-2.5 md:py-4 rounded-full mt-4 md:mt-8 flex items-center gap-2 text-xs md:text-base font-medium">
            More About <FaArrowRightLong />
          </button>
        </div>

        {/* LEFT Side */}
        <div className="md:flex-1 mt-6 md:mt-0">
          <div className="grid grid-cols-2 gap-2.5 sm:gap-5 md:gap-8">
            <div className="flex items-center justify-center shadow">
              <div>
                <RiTeamLine className="text-4xl md:text-5xl mx-auto" />
                <h2 className="text-lg sm:text-2xl md:text-3xl text-center my-2 md:my-3">
                  Strong Team
                </h2>
                <p className="text-center text-xs md:text-sm text-[#777777] px-2 md:px-5">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor.
                </p>
              </div>
            </div>
            <div className="">
              <img src={aboutImg1} alt="about image" />
            </div>
            <div className="">
              <img src={aboutImg2} alt="about image" />
            </div>
            <div className="flex items-center justify-center shadow bg-[#222222]">
              <div>
                <TbBuildingBank className="text-4xl md:text-5xl mx-auto text-[#4C6275]" />
                <h2 className="text-lg sm:text-2xl md:text-3xl text-center my-2 md:my-3 text-white">
                  Luxury Apartment
                </h2>
                <p className="text-center text-xs md:text-sm text-white px-2 md:px-5">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;

import { RiTeamLine } from "react-icons/ri";
import { TbBuildingBank } from "react-icons/tb";
import aboutImg1 from "../../../assets/about-img-1.jpg";
import aboutImg2 from "../../../assets/about-img-2.jpg";
import Container from "../../ui/Container";
import "./Discover.css";
import { Link } from "react-router-dom";

const Discover = () => {
  return (
    <div className="relative py-10 md:py-16 mb-8 sm:mb-12 md:mb-20">
      <Container>
        <div className="md:flex gap-10">
          {/* Left Side */}
          <div className="md:flex-1 mt-6 md:mt-0">
            <div className="grid grid-cols-2 gap-2.5 sm:gap-5 md:gap-8">
              <div className="flex items-center justify-center shadow bg-white">
                <div className="py-8 px-2">
                  <RiTeamLine className="text-4xl md:text-5xl mx-auto" />
                  <h2 className="text-lg sm:text-2xl md:text-3xl text-center my-2 md:my-3">
                    Strong Team
                  </h2>
                  <p className="text-center text-xs md:text-sm text-[#777777] px-2 md:px-5">
                    Our dedicated team delivers professional, reliable, and
                    timely building management solutions.
                  </p>
                </div>
              </div>
              <div>
                <img
                  src={aboutImg1}
                  alt="about image"
                  className="sm:w-full sm:h-full object-cover"
                />
              </div>
              <div>
                <img
                  src={aboutImg2}
                  alt="about image"
                  className="sm:w-full sm:h-full object-cover"
                />
              </div>
              <div className="flex items-center justify-center shadow bg-[#222222]">
                <div className="py-8 px-2">
                  <TbBuildingBank className="text-4xl md:text-5xl mx-auto text-[#4C6275]" />
                  <h2 className="text-lg sm:text-2xl md:text-3xl text-center my-2 md:my-3 text-white">
                    Luxury Apartment
                  </h2>
                  <p className="text-center text-xs md:text-sm text-white px-2 md:px-5">
                    Experience modern, elegant living with premium amenities in
                    our luxury apartments.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Right Side */}
          <div className="flex md:flex-1 justify-center items-center mt-5 md:mt-0 discover-bottom-img md:px-5">
            <div>
              <h5 className="font-bold text-[#777777]">Design</h5>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl mt-2 mb-5 font-serif">
                Discover Our Apartments.
              </h1>
              <p className="text-[#777777] text-base leading-8 md:text-lg md:leading-10">
                Explore our thoughtfully designed apartments, crafted with
                modern architecture and premium materials. Each unit offers
                spacious layouts, stylish interiors, and high-end finishes,
                ensuring comfort and elegance. Experience an exceptional living
                environment tailored to your lifestyle
              </p>
              <Link to="/apartment">
                <button className="bg-black text-white px-5 md:px-8 py-2.5 md:py-4 rounded mt-4 md:mt-8 text-xs md:text-base font-medium">
                  Book Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Discover;

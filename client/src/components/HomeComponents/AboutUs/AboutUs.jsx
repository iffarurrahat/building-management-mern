import "./AboutUs.css";
import Container from "../../ui/Container";
import { useEffect, useState } from "react";
import { MdPhoneInTalk } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

import "swiper/css";
import "swiper/swiper-bundle.css";
import "swiper/css/navigation";

const AboutUs = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("aboutSlider.json")
      .then((res) => res.json())
      .then((data) => setSlides(data));
  }, []);

  return (
    <Container>
      <div className="md:flex gap-12 my-8 sm:my-12 md:my-20 w-full">
        {/* LEFT Side */}
        <div className="md:flex-1 md:w-1/2">
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

        {/* RIGHT Side */}
        <div className="md:flex-1 md:w-1/2 slider-section mt-8 md:mt-0">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            navigation={{
              nextEl: ".button-next-slide",
              prevEl: ".button-prev-slide",
            }}
            coverflowEffect={{
              rotate: 0,
              stretch: 50,
              depth: 150,
              modifier: 2,
              slideShadows: true,
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="mySwiper"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide._id}>
                <div className="testimonialBox">
                  <img
                    src={slide.image}
                    className="h-96 sm:h-[420px] md:h-[500px] lg:h-[550px] w-72 sm:w-80 md:w-96 lg:w-[400px] mx-auto border-r-8 border-primary rounded-xl object-cover overflow-hidden"
                  />
                </div>
              </SwiperSlide>
            ))}

            <div className="button-next-slide absolute bottom-2 right-10 top-[50%] z-10 bg-primary border-2 md:border-4 border-white text-white grid place-items-center cursor-pointer rounded-full w-6 md:w-8 lg:w-10 h-6 md:h-8 lg:h-10">
              <HiOutlineArrowNarrowRight />
            </div>
          </Swiper>
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
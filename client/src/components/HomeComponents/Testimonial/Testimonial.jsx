import "./Testimonial.css";
import Rating from "react-rating";
import { useEffect, useState } from "react";
import Container from "../../ui/Container";
import { PiHouseBold } from "react-icons/pi";
import {
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import image from "../../../assets/thumbnail.png";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import toast from "react-hot-toast";

const Testimonial = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch("reviews.json");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        toast.error(err.message);
      }
    };
    loadData();
  }, []);

  return (
    <div className="mb-8 sm:mb-12 md:mb-20">
      <div>
        <img
          src={image}
          alt="thumbnail image"
          className="h-72 sm:h-80 md:h-[450px] w-full"
        />
      </div>
      <Container>
        <div className="py-5 sm:py-10 md:py-16 lg:py-20 px-5 sm:px-6 md:px-8 lg:px-10 testimonial__wrapper -mt-[25%]">
          <div className="md:flex gap-5 ">
            {/* left side */}
            <div className="md:w-1/4 text-white">
              <h5 className="text-lg md:text-xl font-medium">Testimonial</h5>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold my-1 sm:my-2 md:my-4">
                Review Our Clients
              </h2>
              <div className="flex items-center gap-2">
                <div>
                  <p className="bg-white w-14 h-[1px] mb-1 ml-auto"></p>
                  <p className="bg-white w-16 h-[1px]"></p>
                </div>
                <PiHouseBold />
              </div>
            </div>
            {/* right side */}
            <div className="md:w-3/4 mt-6 md:mt-0">
              <Swiper
                navigation={{
                  nextEl: ".button-next-slide",
                  prevEl: ".button-prev-slide",
                }}
                loop={true}
                modules={[Navigation]}
                className="mySwiper"
              >
                {reviews.map((review, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="text-white">
                      <div className="flex gap-5 mb-2 md:mb-5">
                        <img
                          src={review.image}
                          alt="image"
                          className="rounded-full w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24"
                        />
                        <div>
                          <Rating
                            emptySymbol={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                                />
                              </svg>
                            }
                            fullSymbol={
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            }
                            initialRating={review.rating}
                            readOnly
                          />

                          <p className="text-xs md:font-medium my-0.5 md:mb-1 md:mt-3">
                            Happy Customer
                          </p>
                          <h4 className="text-sm md:text-xl font-medium">
                            {review.name}
                          </h4>
                        </div>
                      </div>
                      <p className="text-sm leading-6 sm:text-base sm:leading-8 md:text-lg md:leading-10 w-full sm:w-11/12 lg:w-3/4">
                        {review.review}
                      </p>
                    </div>
                  </SwiperSlide>
                ))}

                <div className="mt-12 sm:mt-16 md:mt-0">
                  <div className="button-next-slide absolute bottom-2 right-0 z-10 bg-black text-white grid place-items-center cursor-pointer">
                    <p className="flex items-center px-3 py-1.5">
                      <span className="text-sm sm:text-base">Next</span>
                      <MdOutlineKeyboardDoubleArrowRight className="text-lg sm:text-xl" />
                    </p>
                  </div>
                  <div className="button-prev-slide absolute z-10 bottom-2 right-24 bg-black text-white grid place-items-center cursor-pointer">
                    <p className="flex items-center px-3 py-1.5">
                      <MdOutlineKeyboardDoubleArrowLeft className="text-lg sm:text-xl" />
                      <span className="text-sm sm:text-base">Prev</span>
                    </p>
                  </div>
                </div>
              </Swiper>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Testimonial;

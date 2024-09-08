import "./PartnerSection.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

// import required modules
import { Autoplay, EffectFade } from "swiper/modules";
import Container from "../../ui/Container";

const images = [
  {
    _id: 1,
    image: "https://themecraze.net/html/alexis/assets/images/partners/one.png",
  },
  {
    _id: 2,
    image: "https://themecraze.net/html/alexis/assets/images/partners/two.png",
  },
  {
    _id: 3,
    image:
      "https://themecraze.net/html/alexis/assets/images/partners/three.png",
  },
  {
    _id: 4,
    image: "https://themecraze.net/html/alexis/assets/images/partners/four.png",
  },
  {
    _id: 5,
    image: "https://themecraze.net/html/alexis/assets/images/partners/five.png",
  },
  {
    _id: 4,
    image: "https://themecraze.net/html/alexis/assets/images/partners/four.png",
  },
  {
    _id: 5,
    image: "https://themecraze.net/html/alexis/assets/images/partners/five.png",
  },
];

const PartnerSection = () => {
  return (
    <div className="mb-36">
      <Container>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          modules={[Autoplay, EffectFade]}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 5,
            },
          }}
        >
          {images.map((item, idx) => (
            <SwiperSlide key={idx}>
              <div className="flex justify-center slider-active-color">
                <img src={item.image} className="invert" alt="" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </div>
  );
};

export default PartnerSection;

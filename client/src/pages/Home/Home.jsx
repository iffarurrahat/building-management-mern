import AboutUs from "../../components/HomeComponents/AboutUs/AboutUs";
import Banner from "../../components/HomeComponents/Banner/Banner";
import Discover from "../../components/HomeComponents/Discover/Discover";
import GoogleMap from "../../components/HomeComponents/GoogleMap/GoogleMap";
import PartnerSection from "../../components/HomeComponents/PartnerSection/PartnerSection";
import Testimonial from "../../components/HomeComponents/Testimonial/Testimonial";

const Home = () => {
  return (
    <div>
      <Banner />
      <AboutUs />
      <Discover />
      <GoogleMap />
      <Testimonial />
      <PartnerSection />
    </div>
  );
};

export default Home;

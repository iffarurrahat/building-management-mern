import AboutUs from "../../components/HomeComponents/AboutUs/AboutUs";
import Banner from "../../components/HomeComponents/Banner/Banner";
import Counter from "../../components/HomeComponents/Counter/Counter";
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
      <Counter />
      <GoogleMap />
      <Testimonial />
      <PartnerSection />
    </div>
  );
};

export default Home;

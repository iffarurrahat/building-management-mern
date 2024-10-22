import { Helmet } from "react-helmet-async";
import AboutUs from "../../components/HomeComponents/AboutUs/AboutUs";
import Banner from "../../components/HomeComponents/Banner/Banner";
import Counter from "../../components/HomeComponents/Counter/Counter";
import DiscountSection from "../../components/HomeComponents/DiscountSection/DiscountSection";
import Discover from "../../components/HomeComponents/Discover/Discover";
import GoogleMap from "../../components/HomeComponents/GoogleMap/GoogleMap";
import PartnerSection from "../../components/HomeComponents/PartnerSection/PartnerSection";
import Testimonial from "../../components/HomeComponents/Testimonial/Testimonial";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Building Management</title>
      </Helmet>

      <div>
        <Banner />
        <AboutUs />
        <Discover />
        <Counter />
        <GoogleMap />
        <DiscountSection />
        <Testimonial />
        <PartnerSection />
      </div>
    </>
  );
};

export default Home;

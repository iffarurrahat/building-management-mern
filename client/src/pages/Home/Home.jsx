import AboutUs from "../../components/HomeComponents/AboutUs/AboutUs";
import Banner from "../../components/HomeComponents/Banner/Banner";
import Discover from "../../components/HomeComponents/Discover/Discover";
import PartnerSection from "../../components/HomeComponents/PartnerSection/PartnerSection";

const Home = () => {
  return (
    <div>
      <Banner />
      <AboutUs />
      <Discover />
      <PartnerSection />
    </div>
  );
};

export default Home;

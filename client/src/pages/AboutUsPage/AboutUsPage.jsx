import "./AboutUsPage.css";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Container from "../../components/ui/Container";
import image1 from "../../assets/about-page-img-1.png";
import image2 from "../../assets/about-page-img-2.png";
import image3 from "../../assets/about-page-img-3.png";
import image4 from "../../assets/about-page-img-4.png";
import bgImage from "../../assets/about-page-bg-image.png";
import EmptyStateMain from "../../components/EmptyState/EmptyStateMain";

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <EmptyStateMain title="About US" pathname="Home" />

      <div className="bg-image w-full mt-10 sm:mt-16 md:mt-20">
        <Container>
          <div className="lg:flex justify-between gap-6 w-full lg:h-screen">
            {/* left_side */}
            <div className="lg:flex-1 relative w-full">
              <div className="">
                <img
                  src={image1}
                  alt="image"
                  className="rounded-xl z-10 w-2/3 md:w-fit relative"
                />
              </div>
              <div>
                <img
                  src={image2}
                  alt="image"
                  className="absolute top-10 left-1/4 rounded-xl z-50 w-2/3 md:w-fit"
                />
              </div>
              <div className="w-full overflow-hidden">
                <img
                  src={bgImage}
                  alt="image"
                  className="elements-img absolute top-0 left-0 -z-10 w-full h-full object-cover opacity-50"
                />
              </div>
            </div>

            {/* right_side */}
            <div className="lg:flex-1 mt-16 lg:mt-0 lg:px-14">
              <h3 className="bg-gray-200 text-sm sm:text-lg inline-block px-4 py-1.5 rounded-full">
                Property Overview
              </h3>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mt-3">
                Apartment Rent Portal Elegance in Every Detail
              </h1>
              <div className="space-y-3 mt-2 sm:mt-5 text-sm sm:text-base text-[#4E5352]">
                <p className="leading-7">
                  Experience the pinnacle of modern apartment living at our
                  exclusive portal, where every detail has been meticulously
                  crafted to provide a seamless rental experience. Nestled in
                  the heart of your city, this platform offers an unparalleled
                  opportunity to manage your rental needs effortlessly.
                </p>
                <p className="leading-7">
                  Discover the convenience of renting with ease on Building
                  Management Apartment Rent Portal, where modern technology and
                  user comfort converge.
                </p>
              </div>
              <Link to="/apartment">
                <button className="bg-black text-white px-5 md:px-8 py-2.5 md:py-4 rounded-full mt-4 md:mt-8 flex items-center gap-2 text-xs md:text-base font-medium">
                  View Our Listings
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </div>

      <div className="bg-[#F1F4F3] mb-16 mt-10 sm:mt-16 md:mt-20 lg:mt-0 pt-10 sm:pt-20  pb-28 sm:pb-32 md:pb-24 lg:pb-20">
        <Container>
          <div className="lg:flex justify-between gap-6 ">
            {/* LEFT_PART */}
            <div className="lg:flex-1">
              <h3 className="bg-gray-200 text-sm sm:text-lg inline-block px-4 py-1.5 rounded-full">
                CITY APARTMENT
              </h3>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mt-3">
                We Offer The Best City Rentals
              </h1>
              <div className="space-y-3 mt-2 sm:mt-5 text-sm sm:text-base text-[#4E5352]">
                <p className="leading-7">
                  We offer the best city apartments tailored to your modern
                  urban lifestyle. Whether {`you're`} looking for a stylish
                  downtown apartment or a peaceful retreat in the city, our
                  diverse rental listings have you covered.
                </p>
                <p className="leading-7">
                  With dedicated rental specialists, we are committed to
                  providing personalized service, guiding you through every step
                  of your apartment search with ease and expertise.
                </p>
              </div>
              <Link to="/apartment">
                <button className="bg-black text-white px-5 md:px-8 py-2.5 md:py-4 rounded-full mt-4 md:mt-8 flex items-center gap-2 text-xs md:text-base font-medium">
                  View Our Listings
                </button>
              </Link>
            </div>

            {/* RIGHT_PART */}
            <div className="lg:flex-1 relative w-full mt-8 sm:mt-10 md:mt-16 lg:mt-0">
              <div className="">
                <img
                  src={image3}
                  alt="image"
                  className="rounded-xl z-10 w-2/3 md:w-2/4 lg:w-fit relative"
                />
              </div>
              <div>
                <img
                  src={image4}
                  alt="image"
                  className="absolute top-1/4 left-1/4 lg:left-[10%] xl:left-1/4 rounded-xl z-50 w-2/3 md:w-2/4 lg:w-fit"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AboutUsPage;

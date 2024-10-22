import "./AboutUsPage.css";
import { Helmet } from "react-helmet-async";
import Container from "../../components/ui/Container";
import EmptyStateMain from "../../components/EmptyState/EmptyStateMain";
import image1 from "../../assets/apartment-img-1.png";
import image2 from "../../assets/apartment-img-2.png";
import image3 from "../../assets/elements.png";

const AboutUsPage = () => {
  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <EmptyStateMain title="About US" pathname="Home" />

      <div className="bg-image w-full mt-10 sm:mt-16 md:mt-20 mb-36">
        <Container>
          <div className="lg:flex justify-between gap-6 w-full">
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
                  src={image3}
                  alt="image"
                  className="elements-img absolute top-0 left-0 -z-10 h-full object-cover opacity-50"
                />
              </div>
            </div>

            {/* right_side */}
            <div className="lg:flex-1 mt-16 lg:mt-0 lg:px-20">
              <h3 className="bg-gray-200 text-sm sm:text-lg inline-block px-4 py-1.5 rounded-full">
                Property Overview
              </h3>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold mt-3">
                Property Overview: Elegance in Every Detail
              </h1>
              <div className="space-y-3 mt-2 sm:mt-5 text-sm sm:text-base">
                <p className="leading-7">
                  Experience the pinnacle of modern apartment living with our
                  Building Management Apartment Rent Portal, where every detail
                  has been thoughtfully designed to provide an unparalleled
                  rental experience. Our platform makes managing apartment
                  listings and monthly payments effortless and secure.
                </p>
                <p className="leading-7">
                  Discover the essence of luxury our exclusive property in
                  Dallas, where timeless elegance and modern best comfort
                  converge
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AboutUsPage;

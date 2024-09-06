/* eslint-disable react/no-unescaped-entities */
import { BiLogoMediumOld } from "react-icons/bi";
import { FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { FaFacebookF, FaTelegramPlane } from "react-icons/fa";
import Container from "../ui/Container";
import logoImg from "./../../assets/logo.png";

const Footer = () => {
  return (
    <div className=" relative">
      <div className="bg-[#141d2a] pt-32 pb-12 sm:pb-20 md:pb-32">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            <div>
              <img
                src={logoImg}
                alt="footer"
                className="w-20 md:w-28 lg:w-32 cursor-pointer"
              />
              <p className="text-xs text-[#666873] mt-0.5">© 2024</p>
            </div>
            <div>
              <h4 className="font-bold text-white">Customers</h4>
              <ul className="text-sm text-[#666873] space-y-2 mt-3 md:mt-5">
                <li>Buyer</li>
                <li>Supplier</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white">Company</h4>
              <ul className="text-sm text-[#666873] space-y-2 mt-3 md:mt-5">
                <li>About us</li>
                <li>Careers</li>
                <li>Contact us</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white">Further Information</h4>
              <ul className="text-sm text-[#666873] space-y-2 mt-3 md:mt-5">
                <li>Terms & Conditions</li>
                <li>Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white">Follow us</h4>
              <ul className="mt-3 md:mt-5 text-white flex gap-2">
                <li className="bg-primary p-2 rounded-full">
                  <FaFacebookF size={12} />
                </li>
                <li className="bg-primary p-2 rounded-full">
                  <FaXTwitter size={12} />
                </li>
                <li className="bg-primary p-2 rounded-full">
                  <FaLinkedinIn size={12} />
                </li>
                <li className="bg-primary p-2 rounded-full">
                  <BiLogoMediumOld size={12} />
                </li>
                <li className="bg-primary p-2 rounded-full">
                  <FaTelegramPlane size={12} />
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
      <div className="absolute -top-16 left-0 right-0">
        <Container>
          {/* <div className="bg-black/15 h-10 -ml-5"></div> */}
          <div className="sm:flex justify-between items-center bg-primary px-8 py-3 md:py-5 shadow-3xl">
            <div>
              <h1 className="text-2xl lg:text-3xl text-white">
                Ready for a next project?
              </h1>
              <h3 className="text-lg md:text-xl mt-1 md:mt-2 text-[#343a40">
                Let's get started!
              </h3>
            </div>
            <div>
              <button className="px-5 py-2.5 bg-[#343a40] text-white mt-1.5 sm:mt-0 text-xs md:text-base">
                Contact Us
              </button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Footer;

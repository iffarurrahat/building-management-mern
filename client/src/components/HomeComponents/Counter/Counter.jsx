import "./Counter.css";
import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import Container from "../../ui/Container";
import { PiHouseBold } from "react-icons/pi";
import { SiBandsintown } from "react-icons/si";
import { FaLaptopHouse } from "react-icons/fa";
import { MdFireHydrantAlt } from "react-icons/md";
import { ImHappy } from "react-icons/im";

// Custom hook to detect when an element is in the viewport
const useOnScreen = (ref) => {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setIntersecting(entry.isIntersecting)
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref]);

  return isIntersecting;
};

const Counter = () => {
  const counterRef = useRef(null);
  const counterOn = useOnScreen(counterRef);

  return (
    <div className="counter mb-8 sm:mb-12 md:mb-20">
      <Container>
        <div className="text-white text-center">
          <p className="md:text-lg font-medium mb-1 md:mb-2">Properties No</p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold">
            Funfacts Real Estate
          </h3>

          <div className="flex justify-center items-center gap-2 mt-2.5 md:mt-5">
            <div>
              <p className="bg-white w-14 h-[1px] mb-1 ml-auto"></p>
              <p className="bg-white w-16 h-[1px]"></p>
            </div>
            <PiHouseBold />
            <div>
              <p className="bg-white w-14 h-[1px] mb-1"></p>
              <p className="bg-white w-16 h-[1px]"></p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 mt-8">
          <div className="p-2 md:p-5 text-white">
            <div className="flex justify-center">
              <p className="thumb">
                <SiBandsintown className="text-5xl" />
              </p>
            </div>
            <div ref={counterRef}>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-center">
                {counterOn && (
                  <CountUp start={0} end={20500} duration={2} delay={0} />
                )}
                +
              </p>
            </div>
            <p className="text-lg backdrop:font-medium text-center">
              Completed Property
            </p>
          </div>
          <div className="p-2 md:p-5 text-white">
            <div className="flex justify-center">
              <p className="thumb">
                <FaLaptopHouse className="text-5xl" />
              </p>
            </div>
            <div ref={counterRef}>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-center">
                {counterOn && (
                  <CountUp start={0} end={7600} duration={2} delay={0} />
                )}
                +
              </p>
            </div>
            <p className="text-lg backdrop:font-medium text-center">
              Property Sales
            </p>
          </div>
          <div className="p-2 md:p-5 text-white">
            <div className="flex justify-center">
              <p className="thumb">
                <MdFireHydrantAlt className="text-5xl" />
              </p>
            </div>
            <div ref={counterRef}>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-center">
                {counterOn && (
                  <CountUp start={0} end={20500} duration={2} delay={0} />
                )}
                +
              </p>
            </div>
            <p className="text-lg backdrop:font-medium text-center">
              Apartment Rent
            </p>
          </div>
          <div className="p-2 md:p-5 text-white">
            <div className="flex justify-center">
              <p className="thumb">
                <ImHappy className="text-5xl" />
              </p>
            </div>
            <div ref={counterRef}>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 text-center">
                {counterOn && (
                  <CountUp start={0} end={20500} duration={2} delay={0} />
                )}
                +
              </p>
            </div>
            <p className="text-lg backdrop:font-medium text-center">
              Happy Clients
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Counter;

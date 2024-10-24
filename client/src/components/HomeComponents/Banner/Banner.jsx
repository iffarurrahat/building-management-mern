import { useState, useEffect } from "react";
import Slider from "./Slider";
import toast from "react-hot-toast";

const Banner = () => {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSlides = async () => {
      try {
        const res = await fetch("slider.json");
        const data = await res.json();
        setSlides(data);
        setLoading(false);
      } catch (error) {
        toast.error(error);
        setLoading(false);
      }
    };
    loadSlides();
  }, []);

  if (loading) {
    // Show background color while loading, no text
    return (
      <div className="flex justify-center items-center h-[450px] sm:h-[550px] md:h-[700px] lg:h-screen bg-gray-800">
        {/* No loading message, just background */}
      </div>
    );
  }
  return (
    <div>
      <Slider slides={slides} />
    </div>
  );
};

export default Banner;

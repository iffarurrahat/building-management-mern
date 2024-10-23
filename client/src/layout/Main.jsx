import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Preloader from "../components/ui/Preloader/Preloader";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      // Hide the preloader after everything is loaded
      setIsLoading(false);
    };

    // Add event listener for when the page is fully loaded
    window.addEventListener("load", handleLoad);

    return () => {
      // Cleanup the event listener
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div>
      {/* Show Preloader when isLoading is true */}
      {isLoading && <Preloader />}

      {!isLoading && (
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Main;

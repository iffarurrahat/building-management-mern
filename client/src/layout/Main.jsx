import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { Outlet, useNavigation } from "react-router-dom";
import Preloader from "../components/ui/Preloader/Preloader";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation(); // Detect route changes
  const { loading } = useAuth(); // Replace with your auth logic

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false); // Hide preloader after the page is loaded
    };

    window.addEventListener("load", handleLoad);

    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    // Show the Preloader while the authentication state is loading
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loading]);

  useEffect(() => {
    // Show the Preloader when navigation (route change) is in progress
    if (navigation.state === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [navigation.state]);

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

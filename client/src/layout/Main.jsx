import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import { Outlet, useNavigation } from "react-router-dom";
import Preloader from "../components/ui/Preloader/Preloader";

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();
  const { loading } = useAuth();

  // Combine loading logic: based on both authentication and navigation
  useEffect(() => {
    // Set loading state based on both user loading and navigation
    if (loading || navigation.state === "loading") {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loading, navigation.state]);

  useEffect(() => {
    // Handle initial window load
    const handleLoad = () => {
      setIsLoading(false);
    };

    window.addEventListener("load", handleLoad);

    return () => {
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

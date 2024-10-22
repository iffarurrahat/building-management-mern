import Container from "../../components/ui/Container";
import RoomCard from "../../components/Card/RoomCard/RoomCard";
import EmptyStateMain from "../../components/EmptyState/EmptyStateMain";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../../components/ui/Spinner/Spinner";
import { Helmet } from "react-helmet-async";

const Apartment = () => {
  const [loading, setLoading] = useState(true);
  const [itemsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [rooms, setRooms] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const { data } = await axios(
        `${
          import.meta.env.VITE_API_URL
        }/rooms?page=${currentPage}&size=${itemsPerPage}`
      );
      setRooms(data);
      setLoading(false);
    };
    getData();
  }, [currentPage, itemsPerPage]);

  //count
  useEffect(() => {
    const getCount = async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/rooms-count`
      );
      setCount(data.count);
    };
    getCount();
  }, []);

  const numberOfPages = Math.ceil(count / itemsPerPage);
  const pages = [...Array(numberOfPages).keys()].map((element) => element + 1);

  // handle pagination button
  const handlePaginationButton = (value) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Helmet>
        <title>Apartments</title>
      </Helmet>

      <div>
        <EmptyStateMain title="Apartments" pathname="Home" />
        <Container>
          {loading ? (
            <div className="flex justify-center items-center min-h-80">
              <Spinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
              {rooms?.map((room) => (
                <RoomCard key={room._id} room={room} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {!loading && (
            <div className="flex justify-center mt-12 px-3">
              {/* Previous Button */}
              <button
                disabled={currentPage === 1}
                onClick={() => handlePaginationButton(currentPage - 1)}
                className="px-2 sm:px-4 py-1 sm:py-2 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-primary  hover:text-white"
              >
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 sm:w-6 h-3 sm:h-6 mx-1 rtl:-scale-x-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 16l-4-4m0 0l4-4m-4 4h18"
                    />
                  </svg>

                  <span className="text-xs sm:text-base">previous</span>
                </div>
              </button>

              {/* Numbers */}
              {pages.map((btnNum) => (
                <button
                  onClick={() => handlePaginationButton(btnNum)}
                  key={btnNum}
                  className={`${
                    currentPage === btnNum ? "bg-primary text-white" : ""
                  } px-2 sm:px-4 py-1 sm:py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-primary  hover:text-white text-sm sm:text-base`}
                >
                  {btnNum}
                </button>
              ))}

              {/* Next Button */}
              <button
                disabled={currentPage === numberOfPages}
                onClick={() => handlePaginationButton(currentPage + 1)}
                className="px-2 sm:px-4 py-1 sm:py-2 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-primary disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500"
              >
                <div className="flex items-center">
                  <span className="text-xs sm:text-base">Next</span>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 sm:w-6 h-3 sm:h-6 rtl:-scale-x-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </button>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default Apartment;

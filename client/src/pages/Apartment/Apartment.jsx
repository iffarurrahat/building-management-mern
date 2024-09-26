import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Container from "../../components/ui/Container";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Spinner from "../../components/ui/Spinner/Spinner";
import RoomCard from "../../components/Card/RoomCard/RoomCard";
import EmptyStateMain from "../../components/EmptyState/EmptyStateMain";

const Apartment = () => {
  // eslint-disable-next-line no-unused-vars
  const [itemPerPage, setItemPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const axiosPublic = useAxiosPublic();

  const { data: rooms = [], isLoading } = useQuery({
    queryKey: ["rooms", currentPage],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/rooms?page=${currentPage}&size=${itemPerPage}`
      );
      return data;
    },
  });
  console.log(rooms.length);

  // eslint-disable-next-line no-unused-vars
  const { data: roomCountData } = useQuery({
    queryKey: ["rooms-count"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/rooms-count");
      setCount(data.count);
      return data;
    },
  });

  const numberOfPage = Math.ceil(count / itemPerPage);

  // Generate the pagination range with ellipsis
  const getPaginationRange = () => {
    const range = [];
    const totalPagesToShow = 4;

    if (numberOfPage <= totalPagesToShow) {
      // If total pages are less than or equal to the pages to show, just show all pages
      for (let i = 1; i <= numberOfPage; i++) {
        range.push(i);
      }
    } else {
      let startPage = Math.max(
        1,
        currentPage - Math.floor(totalPagesToShow / 2)
      );
      let endPage = startPage + totalPagesToShow - 1;

      if (endPage > numberOfPage) {
        endPage = numberOfPage;
        startPage = Math.max(1, endPage - totalPagesToShow + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        range.push(i);
      }

      if (endPage < numberOfPage) {
        range.push("...");
        range.push(numberOfPage);
      }
    }

    return range;
  };

  const paginationRange = getPaginationRange();

  const handlePaginationButton = (value) => {
    if (value === "...") return; // Ignore ellipsis clicks
    setCurrentPage(value);
  };

  if (isLoading) return <Spinner />;

  return (
    <div>
      <EmptyStateMain title="Apartments" pathname="Home" />
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10">
          {rooms.map((room, idx) => (
            <RoomCard key={idx} room={room} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 px-3">
          {/* Previous Button */}
          <button
            disabled={currentPage === 1}
            onClick={() => handlePaginationButton(currentPage - 1)}
            className="px-2 sm:px-4 py-1 sm:py-2 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-primary  hover:text-white"
          >
            <div className="flex items-center ">
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
          {paginationRange.map((btnNum) => (
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
            disabled={currentPage === numberOfPage}
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
      </Container>
    </div>
  );
};

export default Apartment;

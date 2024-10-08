import PropTypes from "prop-types";
const NoDataFound = ({ title, text }) => {
  return (
    <div className="flex justify-center items-center h-96 sm:h-[500px] md:h-screen">
      <div className="max-w-2xl bg-base-200/30  p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="text-center">
          <div className="flex justify-center">
            <img
              src="https://i.ibb.co.com/C0BNS95/no-data-found.png"
              alt="data not found"
              className=""
            />
          </div>
          <h1 className="md:text-xl font-medium mt-1 md:mt-2 lg:mt-3 text-primary">
            {title}
          </h1>
          <h4 className="text-[#a2a5b9] font-medium mt-1 text-xs sm:text-sm md:text-base">
            {text}
          </h4>
        </div>
      </div>
    </div>
  );
};

NoDataFound.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  imgSize: PropTypes.string,
  h1Size: PropTypes.string,
  h4Size: PropTypes.string,
};
export default NoDataFound;

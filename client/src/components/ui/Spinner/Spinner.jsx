import { CircleLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-[40vh] mt-20">
      <CircleLoader size={50} color="#8c52ff" />
    </div>
  );
};

export default Spinner;

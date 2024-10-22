import { HashLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[40vh] mt-20">
      <HashLoader size={50} color="#8c52ff" />
    </div>
  );
};

export default Spinner;

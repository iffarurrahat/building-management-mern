import Lottie from "lottie-react";
import SpinnerLottie from "../../../../public/spinner-loader.json";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center min-h-[10vh] mt-20">
      <Lottie animationData={SpinnerLottie} loop={true}></Lottie>
    </div>
  );
};

export default Spinner;

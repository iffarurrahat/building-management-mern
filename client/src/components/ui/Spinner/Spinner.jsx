import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-[60vh] mt-20">
      <svg
        viewBox="0 0 240 240"
        height="140"
        width="140"
        // className="h-32 sm:h-40 md:h-52 lg:h-60 w-32 sm:w-40 md:w-52 lg:w-60"
      >
        <circle
          strokeLinecap="round"
          strokeDashoffset="-330"
          strokeDasharray="0 660"
          strokeWidth="20"
          stroke="#000"
          fill="none"
          r="105"
          cy="120"
          cx="120"
          className="pl__ring pl__ring--a"
        ></circle>
        <circle
          strokeLinecap="round"
          strokeDashoffset="-110"
          strokeDasharray="0 220"
          strokeWidth="20"
          stroke="#000"
          fill="none"
          r="35"
          cy="120"
          cx="120"
          className="pl__ring pl__ring--b"
        ></circle>
        <circle
          strokeLinecap="round"
          strokeDasharray="0 440"
          strokeWidth="20"
          stroke="#000"
          fill="none"
          r="70"
          cy="120"
          cx="85"
          className="pl__ring pl__ring--c"
        ></circle>
        <circle
          strokeLinecap="round"
          strokeDasharray="0 440"
          strokeWidth="20"
          stroke="#000"
          fill="none"
          r="70"
          cy="120"
          cx="155"
          className="pl__ring pl__ring--d"
        ></circle>
      </svg>
    </div>
  );
};

export default Spinner;

import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import Spinner from "../ui/Spinner/Spinner";

// const data = [
//   ["Day", "Sales"],
//   ["9", 1000],
//   ["10", 1170],
//   ["11", 660],
//   ["12", 1030],
// ];

const options = {
  title: "Sales Performance Over Time",
  curveType: "function",
  legend: { position: "bottom" },
  series: [{ color: "#F43F5E" }],
};

const SalesLineChart = ({ data }) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return (
    <>
      {loading ? (
        <Spinner smallHeight />
      ) : data.length > 1 ? (
        <Chart
          chartType="LineChart"
          width="100%"
          data={data}
          options={options}
        />
      ) : (
        <>
          <Spinner smallHeight />
          <p className="text-center">
            Not enough data available for this section!
          </p>
        </>
      )}
    </>
  );
};

SalesLineChart.propTypes = {
  data: PropTypes.array,
};
export default SalesLineChart;

import PropTypes from "prop-types";

const CouponsDataRow = ({ coupon }) => {
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
        <p className="text-gray-900 whitespace-no-wrap">{coupon.couponCode}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
        <p className="text-gray-900 ml-10">{coupon.percentage}%</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs whitespace-no-wrap">
        <p className="text-gray-900">{coupon.description}</p>
      </td>
    </tr>
  );
};

CouponsDataRow.propTypes = {
  coupon: PropTypes.object.isRequired,
};
export default CouponsDataRow;

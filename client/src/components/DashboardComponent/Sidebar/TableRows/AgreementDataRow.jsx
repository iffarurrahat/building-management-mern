import PropTypes from "prop-types";
const AgreementDataRow = ({
  book,
  handleRequestAccepted,
  handleRequestRejected,
}) => {
  const {
    bookingUser,
    floor_no,
    block_name,
    apartment_no,
    rent,
    agreementReqDate,
  } = book || {};
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs whitespace-nowrap">
        <p className="text-gray-900">{bookingUser.booking_name}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
        <p className="text-gray-900 whitespace-no-wrap">
          {bookingUser.booking_email}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs whitespace-no-wrap">
        <p className="text-gray-900 text-center">{apartment_no}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
        <p className="text-gray-900 whitespace-no-wrap text-center">
          {floor_no}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
        <p className="text-gray-900 whitespace-no-wrap text-center">
          {block_name}
        </p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
        <p className="text-gray-900">${rent}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs whitespace-no-wrap">
        <p className="text-gray-900 text-center">{agreementReqDate}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
        <button
          onClick={() => handleRequestAccepted(bookingUser.booking_email)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Acepted</span>
        </button>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-xs">
        <button
          onClick={() => handleRequestRejected(bookingUser.booking_email)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-500 opacity-50 rounded-full"
          ></span>
          <span className="relative">Rejected</span>
        </button>
      </td>
    </tr>
  );
};

AgreementDataRow.propTypes = {
  book: PropTypes.object,
  handleRequestAccepted: PropTypes.func,
  handleRequestRejected: PropTypes.func,
};

export default AgreementDataRow;

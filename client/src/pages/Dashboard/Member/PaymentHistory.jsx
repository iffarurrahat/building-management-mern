import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { useQuery } from "@tanstack/react-query";
import PaymentDataRow from "../../../components/DashboardComponent/Sidebar/TableRows/PaymentDataRow";
import NoDataFound from "../../../components/EmptyState/NoDataFound";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // fetch all the booking for this logged in user
  const {
    data: payments = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["my-payments", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/my-payments/${user?.email}`);
      return data;
    },
  });

  // console.log(payments);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>Payment History | Dashboard</title>
      </Helmet>
      {payments.length > 0 ? (
        <div className="container mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Info
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        TransactionId
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        Price
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        From
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal"
                      >
                        To
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.map((data) => (
                      <PaymentDataRow
                        key={data._id}
                        data={data}
                        refetch={refetch}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <NoDataFound
          title="No Payment History Is Available"
          text="Please confirm that you have not paid for your apartment yet"
        />
      )}
    </>
  );
};

export default PaymentHistory;

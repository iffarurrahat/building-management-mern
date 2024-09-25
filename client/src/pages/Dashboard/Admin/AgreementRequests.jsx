import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/ui/Spinner/Spinner";
import { useMutation, useQuery } from "@tanstack/react-query";
import AgreementDataRow from "../../../components/DashboardComponent/Sidebar/TableRows/AgreementDataRow";

const AgreementRequests = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: bookings = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["booking"],
    queryFn: async () => {
      const { data } = await axiosSecure("/booking");
      return data;
    },
  });

  // update user role --> Accepted by admin
  const { mutateAsync: updateUserRole } = useMutation({
    mutationFn: async ({ role, status, email }) => {
      // Destructure here
      const { data } = await axiosSecure.patch(`/users/update/${email}`, {
        role,
        status,
      });
      return data;
    },
    onSuccess: () => {
      refetch();
    },
  });

  // update user role --> Rejected by admin
  const handleRequestAccepted = async (email) => {
    const userRole = {
      role: "member",
      status: "Verified",
      email: email, // Include email in the object
    };

    try {
      await updateUserRole(userRole); // Pass only userRole
      toast.success("Accepted request");
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  // update user role --> Rejected by admin
  const handleRequestRejected = async (email) => {
    const userRole = {
      role: "basic user",
      status: "Verified",
      email: email, // Include email in the object
    };

    try {
      await updateUserRole(userRole); // Pass only userRole
      toast.success("Rejected request");
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (isLoading) return <Spinner />;

  return (
    <>
      <div>
        <Helmet>
          <title>Agreement Requests | Dashboard</title>
        </Helmet>
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-center font-bold text-primary md:mt-10 lg:mt-16 xl:mt-20 2xl:mt-28">
          Agreement Requests
        </h1>

        <div className="md:max-w-md lg:max-w-4xl xl:max-w-screen-lg mx-auto px-4 sm:px-8">
          <div className="py-8">
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto scrollbar-thin scrollbar-webkit">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-bold whitespace-nowrap"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-bold whitespace-nowrap"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-bold whitespace-nowrap"
                      >
                        Apartment no
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-bold whitespace-nowrap"
                      >
                        Floor No
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-bold whitespace-nowrap"
                      >
                        Block Name
                      </th>

                      <th
                        scope="col"
                        className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-bold whitespace-nowrap"
                      >
                        Rent
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-bold whitespace-nowrap"
                      >
                        Agr. REQ. Date
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-bold whitespace-nowrap"
                      >
                        Accept
                      </th>
                      <th
                        scope="col"
                        className="px-5 py-3 bg-white border-b border-gray-200 text-gray-800  text-left text-xs uppercase font-bold whitespace-nowrap"
                      >
                        Reject
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((book) => (
                      <AgreementDataRow
                        key={book._id}
                        book={book}
                        refetch={refetch}
                        handleRequestAccepted={handleRequestAccepted}
                        handleRequestRejected={handleRequestRejected}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AgreementRequests;

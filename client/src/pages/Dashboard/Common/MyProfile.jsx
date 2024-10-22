import { GrEject } from "react-icons/gr";
import { Helmet } from "react-helmet-async";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { MdOutlinePending } from "react-icons/md";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Spinner from "../../../components/ui/Spinner/Spinner";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth() || {};
  const [role, isLoading] = useRole();

  //user show his data filter by email
  const { data: bookings = [] } = useQuery({
    queryKey: ["booking", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/booking/${user?.email}`);
      return data;
    },
  });

  // console.log("bookings-->", bookings);

  //
  const { data: userSingleData = [] } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/user/${user?.email}`);
      return data;
    },
  });
  // console.log(userSingleData.status);

  if (isLoading || loading) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>My Profile</title>
      </Helmet>
      <div
        className={`flex justify-center  
          ${role === "member" ? "h-fit" : "h-screen items-center"}`}
      >
        <div className="md:w-3/5">
          <div className="bg-white shadow border rounded-2xl w-full">
            <img
              alt="my profile"
              src="https://images.pexels.com/photos/4004374/pexels-photo-4004374.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="w-full mb-4 rounded-t-lg h-36 object-cover"
            />
            <div className="flex flex-col items-center justify-center p-2 md:p-4 -mt-16">
              <a href="#" className="relative block">
                <img
                  alt="profile"
                  src={user?.photoURL}
                  className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white "
                />
              </a>

              <p className="p-2 px-4 text-xs text-white bg-primary rounded-full capitalize">
                {role}
              </p>
              <p className="mt-2 text-xs sm:text-base md:text-lg lg:text-xl font-medium text-gray-800">
                User Id: {user?.uid}
              </p>
              <div className="w-full p-2 mt-4 rounded-lg">
                <div className="flex flex-wrap items-center justify-between space-y-2 text-sm text-gray-600">
                  <p className="flex flex-col">
                    Name
                    <span className="font-bold text-black">
                      {user?.displayName}
                    </span>
                  </p>
                  <p className="flex flex-col">
                    Email
                    <span className="font-bold text-black ">{user?.email}</span>
                  </p>

                  {/* <div className=" mx-auto md:mx-0">
                  <button className="bg-primary px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053] block mb-1">
                    Update Profile
                  </button>
                  <button className="bg-primary px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-[#af4053]">
                    Change Password
                  </button>
                </div> */}
                </div>
              </div>
            </div>
          </div>

          {/* Conditionally display messages based on user role, status, and bookings */}
          {bookings.length > 0 && userSingleData.role === "basic user" && (
            <>
              {/* Show 'Pending your request' when status is 'Requested' */}
              {userSingleData.status === "Requested" && (
                <div className="flex w-full overflow-hidden rounded-lg shadow-md mt-3 bg-gray-800">
                  <div className="flex items-center justify-center bg-blue-500">
                    <MdOutlinePending className="w-10 h-10 md:w-12 md:h-12 text-white p-2 md:p-3" />
                  </div>

                  <div className="px-4 py-2 -mx-3">
                    <div className="mx-3">
                      <span className="text-sm sm:text-base font-semibold text-blue-500 dark:text-blue-400">
                        Pending
                      </span>
                      <p className="text-xs sm:text-sm text-gray-200">
                        Your request is{" "}
                        <span className="text-primary">pending</span> please
                        with !!
                      </p>
                      <p className="text-xs sm:text-sm text-gray-200">
                        If Admin accepted your request then{" "}
                        <span className="text-primary">make payment.</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Show 'Your request is rejected' when status is 'Verified' */}
              {userSingleData.status === "Verified" && (
                <div className="flex w-full overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800 mt-3">
                  <div className="flex items-center justify-center bg-red-500">
                    <GrEject className="w-10 h-10 md:w-12 md:h-12 text-white p-2 md:p-3" />
                  </div>

                  <div className="px-4 py-2 -mx-3">
                    <div className="mx-3">
                      <span className="font-semibold text-red-500 dark:text-red-400">
                        Rejected
                      </span>
                      <p className="text-xs sm:text-sm text-gray-200 mt-1">
                        Your request has been{" "}
                        <span className="text-primary">Rejected !!</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* apartment details wind admin --> accepted your request */}
      {role === "member" && (
        <div className="md:w-3/5 mx-auto space-y-3 mt-5 md:mt-8">
          {bookings.map((booking) => (
            <div key={booking._id}>
              <div className="max-w-2xl px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
                <div className="flex items-center justify-between">
                  <p className="sm:text-lg md:text-xl font-bold text-white">
                    Here is your booking details
                  </p>
                  <a
                    className="px-3 py-1 text-xs md:text-sm font-medium md:font-bold text-gray-100 transition-colors duration-300 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500"
                    role="button"
                  >
                    {role === "basic user" ? "Pending" : "Accepted"}
                  </a>
                </div>

                <div className="mt-2">
                  <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto scrollbar-thin scrollbar-webkit">
                    <div className="inline-block min-w-full shadow rounded-lg">
                      <table className="min-w-full leading-normal">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              className="px-5 py-3 border border-gray-200 text-white text-sm whitespace-nowrap"
                            >
                              Apartment No
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 border border-gray-200 text-white text-sm whitespace-nowrap"
                            >
                              Block Name
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 border border-gray-200 text-white text-sm whitespace-nowrap"
                            >
                              Floor No
                            </th>

                            <th
                              scope="col"
                              className="px-5 py-3 border border-gray-200 text-white text-sm"
                            >
                              Rent
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 border border-gray-200 text-white text-sm"
                            >
                              To
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 border border-gray-200 text-white text-sm"
                            >
                              From
                            </th>
                            <th
                              scope="col"
                              className="px-5 py-3 border border-gray-200 text-white text-sm"
                            >
                              Duration
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="text-center">
                            <td className="px-5 py-3 border border-gray-200 text-white text-sm">
                              {booking.apartment_no}
                            </td>
                            <td className="px-5 py-3 border border-gray-200 text-white text-sm">
                              {booking.block_name}
                            </td>
                            <td className="px-5 py-3 border border-gray-200 text-white text-sm">
                              {booking.floor_no}
                            </td>
                            <td className="px-5 py-3 border border-gray-200 text-white text-sm whitespace-nowrap">
                              $ {booking.rent}
                            </td>
                            <td className="px-5 py-3 border border-gray-200 text-white text-sm whitespace-nowrap">
                              {new Date(booking.to).toLocaleString()}
                            </td>
                            <td className="px-5 py-3 border border-gray-200 text-white text-sm whitespace-nowrap">
                              {new Date(booking.from).toLocaleString()}
                            </td>
                            <td className="px-5 py-3 border border-gray-200 text-white text-sm whitespace-nowrap">
                              {booking.bookingDuration} / month
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MyProfile;

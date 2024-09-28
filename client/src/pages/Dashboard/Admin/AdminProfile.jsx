import { Helmet } from "react-helmet-async";
import Spinner from "../../../components/ui/Spinner/Spinner";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";
import AdminStatistics from "./AdminStatistics";

const AdminProfile = () => {
  const { user, loading } = useAuth() || {};
  const [role, isLoading] = useRole();

  if (isLoading || loading) return <Spinner />;

  return (
    <>
      <Helmet>
        <title>Admin Profile | Dashboard</title>
      </Helmet>

      {/* Admin Statistics */}
      <AdminStatistics />

      {/* Admin Profile */}
      <div className="flex justify-center items-center h-screen">
        <div className="bg-white shadow border rounded-2xl md:w-3/5">
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
      </div>
    </>
  );
};

export default AdminProfile;

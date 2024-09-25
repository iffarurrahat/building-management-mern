import PropTypes from "prop-types";
import { useState } from "react";
import UpdateUserModal from "../../../Modal/UpdateUserModal";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useAuth from "../../../../hooks/useAuth";

const UserDataRow = ({ user, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user: loggedInUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const { mutateAsync } = useMutation({
    mutationFn: async (role) => {
      const toastId = toast.loading("Loading...");
      const { data } = await axiosSecure.patch(
        `/users/update/${user.email}`,
        role
      );
      toast.dismiss(toastId);
      return data;
    },
    onSuccess: (data) => {
      if (data.modifiedCount > 0) {
        toast.success("User role updated successfully!");
      }
      refetch();
      setIsOpen(false);
    },
  });

  // user role update modal handler
  const modalHandler = async (selected) => {
    if (loggedInUser.user === user.email) {
      toast.error("Action Not Allowed");
      return setIsOpen(false);
    }

    const userRole = {
      role: selected,
      status: "Verified",
    };

    try {
      await mutateAsync(userRole);
    } catch (err) {
      toast.error(err.message);
    }
  };


  const { mutateAsync: userDeleted } = useMutation({
    mutationFn: async (id) => {
      const toastId = toast.loading("Loading...");
      const { data } = await axiosSecure.delete(`/users/${id}`);
      toast.dismiss(toastId);
      return data;
    },
    onSuccess: () => {
      toast.success("User Deleted Successfully!");

      refetch();
      setIsOpen(false);
    },
  });

  // user delete handler
  const modalDeleteHandler = async (id) => {
    try {
      await userDeleted(id);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.role}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        {user?.status ? (
          <p
            className={`${
              user?.status === "Verified" ? "text-green-500" : "text-yellow-500"
            } whitespace-no-wrap`}
          >
            {user?.status}
          </p>
        ) : (
          <p className="text-red-500 whitespace-no-wrap">Unavailable</p>
        )}
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Update Role</span>
        </button>
        {/* Update User Modal */}
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={user}
          modalHandler={modalHandler}
        />
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <button
          onClick={() => modalDeleteHandler(user?._id)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-red-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-500 opacity-50 rounded-full"
          ></span>
          <span className="relative">Remove</span>
        </button>
      </td>
    </tr>
  );
};

UserDataRow.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRow;

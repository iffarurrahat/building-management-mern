import { Helmet } from "react-helmet-async";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ImSpinner10 } from "react-icons/im";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const SignUp = () => {
  const { createUser, updateUserProfile, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const image = form.image.files[0];
    const formData = new FormData();
    formData.append("image", image);

    // console.log(name, email, password);
    // console.log(image);

    try {
      setLoading(true);

      //1. Upload image and get image url
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      );

      //2. User Registration
      const result = await createUser(email, password);
      console.log(result);

      //3. Save user name and photo in firebase
      await updateUserProfile(name, data.data.display_url);

      navigate("/");
      toast.success("Signup Successful");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Signup</title>
      </Helmet>

      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col max-w-lg rounded-md p-5 sm:p-10 bg-gray-100/25 text-gray-900">
          <div className="mb-3 text-center">
            <h1 className="mb-2 text-4xl font-bold">Sign Up</h1>
            <p className="text-sm text-gray-400">
              Welcome to Building Management
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-1 text-sm">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Enter Your Name Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary  text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div>
                <label htmlFor="image" className="block mb-1 text-sm">
                  Select Image:
                </label>
                <input
                  required
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="flex items-center px-3 py-1.5 mx-auto bg-white border-2 border-dashed rounded-lg cursor-pointer  file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="email" className="block mb-1 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Enter Your Email Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary text-gray-900"
                  data-temp-mail-org="0"
                />
              </div>
              <div className="relative">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-1">
                    Password
                  </label>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  id="password"
                  required
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary text-gray-900"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 cursor-pointer"
                >
                  {showPassword ? (
                    <AiFillEye size={14} />
                  ) : (
                    <AiFillEyeInvisible size={14} />
                  )}
                </span>
              </div>
            </div>

            <div>
              <button
                // disabled={loading}
                type="submit"
                className="bg-primary w-full rounded-md py-3 text-white"
              >
                {loading ? (
                  <ImSpinner10 className="animate-spin m-auto" />
                ) : (
                  "Continue"
                )}
              </button>
            </div>
          </form>

          <p className="px-6 text-sm text-center text-gray-400 mt-3 md:mt-5">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="hover:underline hover:text-primary text-gray-600"
            >
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;

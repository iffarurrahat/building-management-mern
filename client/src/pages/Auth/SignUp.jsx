import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const SignUp = () => {
  const handleSubmit = (e) => {
    //
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
              <div>
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-sm mb-1">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  id="password"
                  required
                  placeholder="*******"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-primary text-gray-900"
                />
              </div>
            </div>

            <div>
              <button
                // disabled={loading}
                type="submit"
                className="bg-primary w-full rounded-md py-3 text-white"
              >
                {/* {loading ? (
                  <TbFidgetSpinner className="animate-spin m-auto" />
                ) : (
                  "Continue"
                )} */}
                Continue
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

import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import FirebaseError from "../../components/ui/FirebaseError";
import Spinner from "../../components/ui/Spinner/Spinner";
import { RiErrorWarningFill } from "react-icons/ri";
import { ImSpinner10 } from "react-icons/im";

const SignIn = () => {
  const {
    userLogin,
    signInWithGoogle,
    resetPassword,
    user,
    loading,
    setLoading,
  } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || "/";

  const handleSubmit = async (e) => {
    const toastId = toast.loading("Loading...");
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    //reset error message
    setErrorMessage("");

    try {
      setLoading(true);

      //1. sign in user
      await userLogin(email, password);

      navigate(from, { replace: true });
      toast.success("Login Successful", { id: toastId });
    } catch (error) {
      setLoading(false);
      toast.dismiss(toastId); // Stop the loading toast

      const errMessage = error.message;
      handleFirebaseError(errMessage);
    }
  };

  //Reset password
  const handleResetPassword = async () => {
    const toastId = toast.loading("Loading...");

    if (!email)
      return toast.error("Please write your email first!", { id: toastId });

    try {
      await resetPassword(email);
      toast.success("Request Success! Check you email for further process...", {
        id: toastId,
      });
      setLoading(false);
    } catch (err) {
      toast.error(err.message, { id: toastId });
      setLoading(false);
      toast.dismiss(toastId); // Stop the loading toast
    }
  };

  // Google Signin
  const handleGoogleSignIn = async () => {
    const toastId = toast.loading("Loading...");

    try {
      await signInWithGoogle();

      navigate(from, { replace: true });
      toast.success("Login Successful", { id: toastId });
    } catch (error) {
      setLoading(false);
      toast.dismiss(toastId); // Stop the loading toast

      const errMessage = error.message;
      handleFirebaseError(errMessage);
    }
  };

  // Function to handle FirebaseError and update registerError state
  const handleFirebaseError = (errMessage) => {
    FirebaseError({ errMessage, setErrorMessage });
  };

  if (user || loading) <Spinner />;
  return (
    <>
      <Helmet>
        <title>Signin</title>
      </Helmet>

      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-primary/5 text-gray-900">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Login</h1>
            <p className="text-sm text-gray-400">
              Sign in to access your account
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm">
                  Email address
                </label>
                <input
                  type="email"
                  name="email"
                  onBlur={(e) => setEmail(e.target.value)}
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
                type="submit"
                className="bg-primary w-full rounded-md py-3 text-white"
              >
                {loading ? (
                  <ImSpinner10 className="animate-spin m-auto" />
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
          {/* Error Message form Firebase */}
          {errorMessage && (
            <p className="text-red-600 text-xs flex items-center gap-1 mt-0.5">
              <RiErrorWarningFill />
              {errorMessage}
            </p>
          )}
          <div className="space-y-1">
            <button
              onClick={handleResetPassword}
              className="text-xs hover:underline hover:text-primary text-gray-400"
            >
              Forgot password?
            </button>
          </div>

          <div className="flex items-center pt-4 space-x-1">
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700/30"></div>
            <p className="px-3 text-sm dark:text-gray-400">
              Signup with social accounts
            </p>
            <div className="flex-1 h-px sm:w-16 dark:bg-gray-700/30"></div>
          </div>
          <button
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-2 p-1.5 border-gray-300 rounded cursor-pointer"
          >
            <FcGoogle size={32} />
            <p>Continue with Google</p>
          </button>
          <p className="px-6 text-sm text-center text-gray-400">
            Don&apos;t have an account yet?{" "}
            <Link
              to="/signup"
              className="hover:underline hover:text-primary text-gray-600"
            >
              Sign up
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;

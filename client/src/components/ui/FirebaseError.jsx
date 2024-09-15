const FirebaseError = ({ errMessage, setErrorMessage }) => {
  // Set error messages based on Firebase error codes
  if (errMessage === "Firebase: Error (auth/email-already-in-use).") {
    setErrorMessage("This email is already in use. Please login.");
  } else if (
    errMessage === "Firebase: Error (auth/network-request-failed)." ||
    errMessage === "Network Error"
  ) {
    setErrorMessage("Network error. Please check your internet connection.");
  } else if (errMessage === "Firebase: Error (auth/invalid-credential).") {
    setErrorMessage("Email or Password might be wrong");
  } else if (errMessage === "Firebase: Error (auth/popup-closed-by-user).") {
    setErrorMessage("Sign in cancelled. Please try again.");
  } else if (errMessage === "Firebase: Error (auth/internal-error).") {
    setErrorMessage("Please connect your internet");
  } else if (
    errMessage ===
    "Firebase: IdP denied access. This usually happens when user refuses to grant permission. (auth/user-cancelled)."
  ) {
    setErrorMessage("Permission denied, Grant access to signin");
  } else {
    setErrorMessage("An unexpected error occurred. Please try again later.");
  }
};

export default FirebaseError;

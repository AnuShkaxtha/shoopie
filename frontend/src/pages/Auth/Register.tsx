import { useState } from "react";
import { Navigate, Link, } from "react-router-dom";
import { useAuth } from "../../entities/auth/AuthProvider";
import { doCreateUserWithEmailAndPassword } from "@/entities/firebase/auth";


const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { userLoggedIn } = useAuth();

  const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      // CHECKING PASSWORD VALIDATION
      if (password !== confirmPassword) {
        setErrorMessage("Passwords do not match.");
        setIsRegistering(false);
        return;
      }
      try {
        // CREATING USER
        await doCreateUserWithEmailAndPassword(email, password);
      } catch (error: any) {
        setErrorMessage(error.message);
        setIsRegistering(false);
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={"/"} replace={true} />}

      <main className="flex self-center w-full h-screen place-content-center place-items-center">
        <div className="p-4 space-y-5 text-gray-600 border shadow-xl w-96 rounded-xl">
          <div className="mb-6 text-center">
            <div className="mt-2">
              <h3 className="text-xl font-semibold text-gray-800 sm:text-2xl">
                Create a New Account
              </h3>
            </div>
          </div>
          {/* ERROR */}
          {errorMessage && (
            <span className="block mb-4 font-bold text-center text-red-600">
              {errorMessage}
            </span>
          )}
          {/* FORM */}
          <form onSubmit={onSubmit} className="space-y-4">
            {/* EMAIL */}
            <div>
              <label className="text-sm font-bold text-gray-600">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full px-3 py-2 mt-2 text-gray-500 transition duration-300 bg-transparent border rounded-lg shadow-sm outline-none focus:indigo-600"
              />
            </div>
            {/* PASSWORD */}
            <div>
              <label className="text-sm font-bold text-gray-600">
                Password
              </label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full px-3 py-2 mt-2 text-gray-500 transition duration-300 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600"
              />
            </div>
            {/* CONFIRM PASSWORD */}
            <div>
              <label className="text-sm font-bold text-gray-600">
                Confirm Password
              </label>
              <input
                disabled={isRegistering}
                type="password"
                autoComplete="off"
                required
                value={confirmPassword}
                onChange={(e) => {
                  setconfirmPassword(e.target.value);
                }}
                className="w-full px-3 py-2 mt-2 text-gray-500 transition duration-300 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600"
              />
            </div>

            <button
              type="submit"
              disabled={isRegistering}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
                isRegistering
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
              }`}
            >
              {isRegistering ? "Signing Up..." : "Sign Up"}
            </button>
            <div className="text-sm text-center">
              Already have an account? {"   "}
              <Link
                to={"/login"}
                className="text-sm font-bold text-center hover:underline"
              >
                Continue
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default Register;

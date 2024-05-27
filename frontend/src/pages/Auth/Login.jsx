import React, { useState } from "react";
import { Navigate, Link } from "react-router-dom";
import {
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
} from "../../entities/firebase/auth";
import { useAuth } from "../../entities/auth/AuthProvider";
import { useTheme } from "@emotion/react"; // Import useTheme hook
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { userLoggedIn } = useAuth();
  const { theme } = useTheme(); // Access the theme using useTheme hook

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Email-Password authentication
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      }
      // doSendEmailVerification()
    }
  };
  // Google authentication
  const onGoogleSignIn = (e) => {
    e.preventDefault();
    if (!isSigningIn) {
      setIsSigningIn(true);
      doSignInWithGoogle().catch((err) => {
        setErrorMessage(err.message);
        setIsSigningIn(false);
      });
    }
  };

  return (
    <div className={`login-container ${theme}`}>
      {userLoggedIn && <Navigate to={"/"} replace={true} />}

      <main className="flex self-center w-full h-screen place-content-center place-items-center">
        <div className="p-4 space-y-5 border shadow-xl w-96 rounded-xl">
          <div className="text-center">
            <div className="mt-2">
              <h3 className="text-xl font-semibold sm:text-2xl">
                Welcome Back
              </h3>
            </div>
          </div>
          {/* DIDPLAYING ERROR */}
          {errorMessage && (
            <span className="block mb-4 font-bold text-center text-red-600">
              {errorMessage}
            </span>
          )}
          {/*  FORM  */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="text-sm font-bold ">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="w-full px-3 py-2 mt-2 transition duration-300 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600"
              />
            </div>
            {/* PASSWORD */}
            <div>
              <label className="text-sm font-bold ">Password</label>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="w-full px-3 py-2 mt-2 transition duration-300 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600"
              />
            </div>
            {/* SUBMIT */}
            <button
              type="submit"
              disabled={isSigningIn}
              className={`w-full px-4 py-2 text-white font-medium rounded-lg ${
                isSigningIn
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300"
              }`}
            >
              {isSigningIn ? "Signing In..." : "Sign In"}
            </button>
          </form>
          {/* REGISTER */}
          <p className="text-sm text-center">
            Don't have an account?{" "}
            <Link to={"/register"} className="font-bold hover:underline">
              Sign up
            </Link>
          </p>
          <div className="flex flex-row w-full text-center">
            <div className="border-b-2 mb-2.5 mr-2 w-full"></div>
            <div className="text-sm font-bold w-fit">OR</div>
            <div className="border-b-2 mb-2.5 ml-2 w-full"></div>
          </div>
          {/* GOOGLE */}
          <button
            disabled={isSigningIn}
            onClick={(e) => {
              onGoogleSignIn(e);
            }}
            className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium  ${
              isSigningIn
                ? "cursor-not-allowed"
                : "hover:bg-gray-100 transition duration-300 active:bg-gray-100"
            }`}
          >
            <FcGoogle size={22} />

            {isSigningIn ? "Signing In..." : "Continue with Google"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Login;

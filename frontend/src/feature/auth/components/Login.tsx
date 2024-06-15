import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin, loginSuccess, logout } from "@/entities/Admin/adminAuthSlice";
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from "@/firebase/auth";
import { useAuth } from "@/firebase/AuthProvider";
import { useTheme } from "@/processes/theme/theme-provider";
import { FcGoogle } from "react-icons/fc";
import { sendUserDetailsToBackend } from "../api/authApi";
import { RootState, AppDispatch } from "@/app/store/store";

const Login: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { userLoggedIn, currentUser } = useAuth();
  const { theme } = useTheme();
  const adminAuth = useSelector((state: RootState) => state.adminAuth);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSigningIn, setIsSigningIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isAdminLogin, setIsAdminLogin] = useState<boolean>(false);

  useEffect(() => {
    // Check if there's a token in localStorage
    const token = localStorage.getItem('adminToken');
    if (token) {
      dispatch(loginSuccess(token));
    }
  }, [dispatch]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSigningIn(true);
    if (isAdminLogin) {
      try {
        await dispatch(loginAdmin({ email, password })).unwrap();
      } catch (error: any) {
        setErrorMessage(error);
      } finally {
        setIsSigningIn(false);
      }
    } else {
      try {
        await doSignInWithEmailAndPassword(email, password);
      } catch (error: any) {
        setErrorMessage(error.message);
        setIsSigningIn(false);
      } finally {
        setIsSigningIn(false);
      }
    }
  };

  const onGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      await doSignInWithGoogle();
    } catch (error: any) {
      setErrorMessage(error.message);
      setIsSigningIn(false);
    } finally {
      setIsSigningIn(false);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.email && currentUser.uid) {
      sendUserDetailsToBackend(currentUser.email, currentUser.uid);
    }
  }, [currentUser]);

  if (userLoggedIn && !isAdminLogin) return <Navigate to="/" replace={true} />;
  if (adminAuth.isAuthenticated) return <Navigate to="/admin/dashboard" replace={true} />;

  return (
    <div className={`login-container ${theme}`}>
      <main className="flex self-center w-full h-screen place-content-center place-items-center">
        <div className="p-4 space-y-5 border shadow-xl w-96 rounded-xl">
          <div className="text-center">
            <div className="mt-2">
              <h3 className="text-xl font-semibold sm:text-2xl">Welcome Back</h3>
              <button
                onClick={() => setIsAdminLogin(!isAdminLogin)}
                className="text-sm font-bold text-indigo-600 underline"
              >
                {isAdminLogin ? "Switch to User Login" : "Switch to Admin Login"}
              </button>
            </div>
          </div>
          {errorMessage && (
            <span className="block mb-4 font-bold text-center text-red-600">{errorMessage}</span>
          )}
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-bold ">Email</label>
              <input
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-2 transition duration-300 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600"
              />
            </div>
            <div>
              <label className="text-sm font-bold ">Password</label>
              <input
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-2 transition duration-300 bg-transparent border rounded-lg shadow-sm outline-none focus:border-indigo-600"
              />
            </div>
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
          {!isAdminLogin && (
            <>
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
              <button
                disabled={isSigningIn}
                onClick={onGoogleSignIn}
                className={`w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium  ${
                  isSigningIn
                    ? "cursor-not-allowed"
                    : "hover:bg-gray-100 transition duration-300 active:bg-gray-100"
                }
`}
              >
                <
FcGoogle size={22} />
                {isSigningIn ? "Signing In..." : "Continue with Google"}
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default Login;

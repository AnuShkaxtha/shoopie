import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";

// registering user
export const doCreateUserWithEmailAndPassword = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// sigin user
export const doSignInWithEmailAndPassword = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// login with google
export const doSignInWithGoogle = async (email, password) => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  return result;
};

// signout
export const doSignOut = () => {
  return auth
    .signOut()
    .then(() => {
      // Reload the page after successful sign-out
      window.location.reload();
    })
    .catch((error) => {
      console.error("Sign-out error:", error);
    });
};

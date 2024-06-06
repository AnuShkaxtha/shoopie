import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";

// registering user
export const doCreateUserWithEmailAndPassword = async (email:string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

// sigin user
export const doSignInWithEmailAndPassword = async (email:string, password:string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// login with google
export const doSignInWithGoogle = async () => {
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

//--------------
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   GoogleAuthProvider,
//   signInWithPopup,
//   UserCredential,
// } from "firebase/auth";
// import { auth } from "./firebase";

// // Registering user
// export const doCreateUserWithEmailAndPassword = async (
//   email: string,
//   password: string
// ): Promise<UserCredential> => {
//   return createUserWithEmailAndPassword(auth, email, password);
// };

// // Sign in user
// export const doSignInWithEmailAndPassword = async (
//   email: string,
//   password: string
// ): Promise<UserCredential> => {
//   return signInWithEmailAndPassword(auth, email, password);
// };

// // Login with Google
// export const doSignInWithGoogle = async (): Promise<UserCredential> => {
//   const provider = new GoogleAuthProvider();
//   const result = await signInWithPopup(auth, provider);
//   return result;
// };

// // Sign out
// export const doSignOut = async (): Promise<void> => {
//   try {
//     await auth.signOut();
//     // Reload the page after successful sign-out
//     window.location.reload();
//   } catch (error) {
//     console.error("Sign-out error:", error);
//   }
// };


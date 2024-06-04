// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";

interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string; // Optional
}

const firebaseConfig: FirebaseConfig = {
    apiKey: process.env.VITE_REACT_APP_FIREBASE_API_KEY as string,
    authDomain: process.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN as string,
    projectId: process.env.VITE_REACT_APP_FIREBASE_PROJECT_ID as string,
    storageBucket: process.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET as string,
    messagingSenderId: process.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER as string,
    appId: process.env.VITE_REACT_APP_FIREBASE_ID as string,
    measurementId: process.env.VITE_REACT_APP_MEASUREMENT_ID as string
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);

export { app, auth };

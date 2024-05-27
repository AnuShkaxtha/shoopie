// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyB_WoxUVFmpYjAi4vhqYD965CAK27mTUmM",
    authDomain: "e-commerce-aa4ec.firebaseapp.com",
    projectId: "e-commerce-aa4ec",
    storageBucket: "e-commerce-aa4ec.appspot.com",
    messagingSenderId: "509552211306",
    appId: "1:509552211306:web:d5299fb517c541dee5a113",
    measurementId: "G-YLVFY5716M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };

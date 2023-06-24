// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYAHGbtDlKIpJVnQ-6dx1I8Yl9UWsq5QM",
  authDomain: "recipe-finder-b25ac.firebaseapp.com",
  projectId: "recipe-finder-b25ac",
  storageBucket: "recipe-finder-b25ac.appspot.com",
  messagingSenderId: "224800328175",
  appId: "1:224800328175:web:bf118eb51d3bbc25238e1a",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;

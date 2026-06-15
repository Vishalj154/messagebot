// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA5L7NVRxNpr330QLRQGE-2AFNqxghnoiM",
  authDomain: "chattrix-6e578.firebaseapp.com",
  projectId: "chattrix-6e578",
  storageBucket: "chattrix-6e578.firebasestorage.app",
  messagingSenderId: "1010459459081",
  appId: "1:1010459459081:web:8b833e7a8774c58aec42d8",
  measurementId: "G-8M3M38ZNQT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
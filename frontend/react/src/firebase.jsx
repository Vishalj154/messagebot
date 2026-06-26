import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

if (!firebaseConfig.apiKey || !firebaseConfig.authDomain || !firebaseConfig.projectId || !firebaseConfig.appId) {
  throw new Error("Missing Firebase env vars. Create a .env.local file in frontend/react.");
}

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore Database (Milestone 3 preparation)
export const db = getFirestore(app);

// Configure Google OAuth Provider
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

// Explicitly enforce Browser Local Persistence (session persists after page refresh & tab close)
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Firebase Auth: Session persistence successfully set to browserLocalPersistence.");
  })
  .catch((error) => {
    console.error("Firebase Auth: Failed to set session persistence:", error);
  });
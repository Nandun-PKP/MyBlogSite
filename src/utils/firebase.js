// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtZDia66KP8nRRfn2vyA4j0TQeSCHYHhY",
  authDomain: "myblogappnew.firebaseapp.com",
  projectId: "myblogappnew",
  storageBucket: "myblogappnew.firebasestorage.app",
  messagingSenderId: "520457281150",
  appId: "1:520457281150:web:294f6e866bb76cd3b0022f",
  measurementId: "G-K4HMB2C1G5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export Firestore database instance so our app can use it
export const db = getFirestore(app);
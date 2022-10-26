import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";
import { getAuth } from "firebase/auth";

const fbConfig = {
  apiKey: "AIzaSyAGhMRQcYDvKy3kCVoKD4-AJJDN4w6kQQU",
  authDomain: "sanair-365323.firebaseapp.com",
  projectId: "sanair-365323",
  storageBucket: "sanair-365323.appspot.com",
  messagingSenderId: "79523965883",
  appId: "1:79523965883:web:48a5c693a66ce6bb8eb29e",
  measurementId: "G-3Y0EPVFS9Y",
};

// Initialize Firebase
const app = initializeApp(fbConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };

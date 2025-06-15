// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDfaZrkUuHzpb6cBaTZW_LFyoH2N083KOY",
  authDomain: "sirajdeals-6762e.firebaseapp.com",
  projectId: "sirajdeals-6762e",
  storageBucket: "sirajdeals-6762e.firebasestorage.app",
  messagingSenderId: "80483867660",
  appId: "1:80483867660:web:63d4684e16ca7521bae229",
  measurementId: "G-XC3HGVC7QY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Get Firestore instance
const db = getFirestore(app);

// ✅ Export db so you can use it in other files
export { db };

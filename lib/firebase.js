// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"; // ✅ Add this

const firebaseConfig = {
  apiKey: "AIzaSyDfaZrkUuHzpb6cBaTZW_LFyoH2N083KOY",
  authDomain: "sirajdeals-6762e.firebaseapp.com",
  projectId: "sirajdeals-6762e",
  storageBucket: "sirajdeals-6762e.appspot.com",
  messagingSenderId: "80483867660",
  appId: "1:80483867660:web:63d4684e16ca7521bae229",
  measurementId: "G-XC3HGVC7QY"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // ✅ Add this

export { db, storage, auth }; // ✅ Export auth

// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

// তোমার Firebase Config এখানে বসাবে
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.firebasestorage.app",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBc4A_OwclBuYzs4L4-2btw8clIlEXuLCo",
  authDomain: "efootball-bd-club-2026-26e69.firebaseapp.com",
  projectId: "efootball-bd-club-2026-26e69",
  storageBucket: "efootball-bd-club-2026-26e69.firebasestorage.app",
  messagingSenderId: "585390477677",
  appId: "1:585390477677:web:c341c5ff53c78497b28a64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Services
export const auth = getAuth(app);
export const db = getFirestore(app);

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBc4A_OwclBuYzs4L4-2btw8clIlEXuLCo",
  authDomain: "efootball-bd-club-2026-26e69.firebaseapp.com",
  projectId: "efootball-bd-club-2026-26e69",
  storageBucket: "efootball-bd-club-2026-26e69.firebasestorage.app",
  messagingSenderId: "585390477677",
  appId: "1:585390477677:web:c341c5ff53c78497b28a64"
};

const app = initializeApp(firebaseConfig);
import { getDatabase } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

export const rtdb = getDatabase(app);
export const auth = getAuth(app);
export const db = getFirestore(app);

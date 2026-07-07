import { auth } from "./firebase.js";

import {
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const logoutBtn = document.getElementById("logoutBtn");

// Login না থাকলে Login Page-এ পাঠাবে
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = "login.html";
    }
});

// Logout
logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
});

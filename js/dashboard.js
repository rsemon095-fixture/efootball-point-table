import { db, auth } from "./firebase.js";

import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
  signOut
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const teamCount = document.getElementById("teamCount");
const groupCount = document.getElementById("groupCount");
const fixtureCount = document.getElementById("fixtureCount");
const playerCount = document.getElementById("playerCount");

const logoutBtn = document.getElementById("logoutBtn");

// Live Team Count
onSnapshot(collection(db, "teams"), (snap) => {
    teamCount.textContent = snap.size;
});

// Live Group Count
onSnapshot(collection(db, "groups"), (snap) => {
    groupCount.textContent = snap.size;
});

// Live Fixture Count
onSnapshot(collection(db, "fixtures"), (snap) => {
    fixtureCount.textContent = snap.size;
});

// Live Player Count
onSnapshot(collection(db, "players"), (snap) => {
    playerCount.textContent = snap.size;
});

// Logout
logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
});

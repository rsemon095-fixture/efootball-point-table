import { db, auth } from "./firebase.js";

import {
  collection,
  onSnapshot,
  getDocs,
  deleteDoc,
  doc
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
// =======================
// Reset Tournament
// =======================

const resetTournament = document.getElementById("resetTournament");

resetTournament.addEventListener("click", async () => {

    const ok = confirm(
        "⚠️ সব Tournament Data Delete হবে!\n\nআপনি কি নিশ্চিত?"
    );

    if (!ok) return;

    const collections = [
        "teams",
        "players",
        "groups",
        "assignments",
        "fixtures",
        "points",
        "knockout",
        "notices"
    ];

    for (const name of collections) {

        const snapshot = await getDocs(collection(db, name));

        for (const d of snapshot.docs) {
            await deleteDoc(doc(db, name, d.id));
        }
    }

    alert("✅ Tournament Reset Successfully!");
});
logoutBtn.addEventListener("click", async () => {
    await signOut(auth);
    window.location.href = "login.html";
});

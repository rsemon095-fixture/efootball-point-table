import { db } from "./firebase.js";

import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const totalTeams = document.getElementById("totalTeams");
const totalGroups = document.getElementById("totalGroups");
const totalMatches = document.getElementById("totalMatches");

// Live Team Count
onSnapshot(collection(db, "teams"), (snap) => {
    totalTeams.textContent = snap.size;
});

// Live Group Count
onSnapshot(collection(db, "groups"), (snap) => {
    totalGroups.textContent = snap.size;
});

// Live Match Count
onSnapshot(collection(db, "fixtures"), (snap) => {
    totalMatches.textContent = snap.size;
});

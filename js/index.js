import { db } from "./firebase.js";

import {
  collection,
  doc,
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


// =========================
// Homepage Upcoming Match
// =========================

const team1Name = document.getElementById("team1Name");
const team2Name = document.getElementById("team2Name");
const team1Logo = document.getElementById("team1Logo");
const team2Logo = document.getElementById("team2Logo");
const matchDate = document.getElementById("matchDate");
const matchTime = document.getElementById("matchTime");
const matchDeadline = document.getElementById("matchDeadline");
const matchStatus = document.getElementById("matchStatus");

onSnapshot(doc(db,"fixtures","nextMatch"),(docSnap)=>{

if(!docSnap.exists()) return;

const data = docSnap.data();

team1Name.textContent=data.team1;
team2Name.textContent=data.team2;

team1Logo.src=data.team1Logo;
team2Logo.src=data.team2Logo;

matchDate.textContent=data.date;
matchTime.textContent=data.time;
matchDeadline.textContent=data.deadline;
matchStatus.textContent=data.status;

// =========================
// Live Tournament Notice
// =========================

const tournamentNotice = document.getElementById("tournamentNotice");

onSnapshot(collection(db, "notices"), (snapshot) => {

    if (snapshot.empty) {
        tournamentNotice.textContent = "No Notice Available";
        return;
    }

    snapshot.forEach((doc) => {
        const data = doc.data();
        tournamentNotice.textContent = data.text;
    });

});

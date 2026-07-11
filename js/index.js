import { db, rtdb } from "./firebase.js";

import {
  collection,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

import {
  ref,
  set,
  onValue,
  onDisconnect
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";
import { get } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

// =========================
// Maintenance Mode
// =========================

const maintenanceRef = ref(rtdb, "system/maintenance");

get(maintenanceRef).then((snapshot) => {

  if (snapshot.exists() && snapshot.val() === true) {

    document.body.innerHTML = `
    <div style="
      height:100vh;
      display:flex;
      justify-content:center;
      align-items:center;
      background:#0f172a;
      color:#fff;
      text-align:center;
      font-family:Arial,sans-serif;
      padding:20px;
    ">
      <div>
        <h1 style="font-size:38px;">🛠️ Maintained Update</h1>

        <h2 style="margin-top:20px;">
          Waiting For You.
        </h2>

        <p style="
          margin-top:35px;
          font-size:18px;
          color:#00e5ff;
        ">
          Powered By <b>RS Emon</b>
        </p>
      </div>
    </div>
    `;

    throw new Error("Maintenance Enabled");

  }

});
// =========================
// Tournament Statistics
// =========================

const totalTeams = document.getElementById("totalTeams");
const totalGroups = document.getElementById("totalGroups");
const totalMatches = document.getElementById("totalMatches");

if (totalTeams) {
  onSnapshot(collection(db, "teams"), snap => {
    totalTeams.textContent = snap.size;
  });
}

if (totalGroups) {
  onSnapshot(collection(db, "groups"), snap => {
    totalGroups.textContent = snap.size;
  });
}

if (totalMatches) {
  onSnapshot(collection(db, "fixtures"), snap => {
    totalMatches.textContent = snap.size;
  });
}

// =========================
// Upcoming Match
// =========================

const team1Name = document.getElementById("team1Name");
const team2Name = document.getElementById("team2Name");
const team1Logo = document.getElementById("team1Logo");
const team2Logo = document.getElementById("team2Logo");
const matchDate = document.getElementById("matchDate");
const matchTime = document.getElementById("matchTime");
const matchDeadline = document.getElementById("matchDeadline");
const matchStatus = document.getElementById("matchStatus");

if (team1Name) {

  onSnapshot(doc(db, "fixtures", "nextMatch"), (docSnap) => {

    if (!docSnap.exists()) return;

    const data = docSnap.data();

    team1Name.textContent = data.team1;
    team2Name.textContent = data.team2;

    team1Logo.src = data.team1Logo;
    team2Logo.src = data.team2Logo;

    matchDate.textContent = data.date;
    matchTime.textContent = data.time;
    matchDeadline.textContent = data.deadline;
    matchStatus.textContent = data.status;

  });

}

// =========================
// Tournament Notice
// =========================

const tournamentNotice = document.getElementById("tournamentNotice");

if (tournamentNotice) {

  onSnapshot(collection(db, "notices"), (snapshot) => {

    if (snapshot.empty) {
      tournamentNotice.textContent = "No Notice Available";
      return;
    }

    tournamentNotice.textContent =
      snapshot.docs[snapshot.docs.length - 1].data().text;

  });

}

// =========================
// Live Online Users
// =========================

const onlineCount = document.getElementById("onlineCount");

if (onlineCount) {

  const userId = Date.now() + "-" + Math.random().toString(36).substring(2);

  const userRef = ref(rtdb, "onlineUsers/" + userId);

  set(userRef, true);

  onDisconnect(userRef).remove();

  onValue(ref(rtdb, "onlineUsers"), (snapshot) => {

    if (!snapshot.exists()) {
      onlineCount.textContent = "0";
    } else {
      onlineCount.textContent = Object.keys(snapshot.val()).length;
    }

  });

}

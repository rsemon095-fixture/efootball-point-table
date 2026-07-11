// =========================
// Maintenance Mode
// =========================

async function checkMaintenance() {

  try {

    const maintenanceRef = ref(rtdb, "system/maintenance");
    const snapshot = await get(maintenanceRef);

    if (!snapshot.exists() || snapshot.val() !== true) {
      return false;
    }

    document.body.innerHTML = `
    <div style="
      position:fixed;
      inset:0;
      background:linear-gradient(135deg,#0f172a,#1e293b,#111827);
      display:flex;
      justify-content:center;
      align-items:center;
      font-family:Arial,sans-serif;
      color:#fff;
      z-index:999999;
    ">

      <div style="text-align:center;padding:30px;">

        <div style="
          width:90px;
          height:90px;
          margin:auto;
          border:8px solid rgba(255,255,255,.15);
          border-top:8px solid #00e5ff;
          border-radius:50%;
          animation:spin 1s linear infinite;
        "></div>

        <h1 style="
          margin-top:30px;
          font-size:42px;
          color:#00e5ff;
        ">
          🛠 Maintenance Mode
        </h1>

        <p style="font-size:22px;">
          Waiting For Update...
        </p>

        <p style="color:#b0bec5;">
          We are improving your experience.<br>
          Please come back shortly.
        </p>

        <h2 style="color:#FFD700;">
          Powered By RS Emon
        </h2>

      </div>

      <style>
      @keyframes spin{
        0%{transform:rotate(0deg);}
        100%{transform:rotate(360deg);}
      }
      </style>

    </div>
    `;

    return true;

  } catch (e) {

    console.log(e);
    return false;

  }

}

(async () => {

  const maintenance = await checkMaintenance();

  if (maintenance) return;

  // এখান থেকে Part 2-এর কোড শুরু হবে

})();
// =========================
// Tournament Statistics
// =========================

const totalTeams = document.getElementById("totalTeams");
const totalGroups = document.getElementById("totalGroups");
const totalMatches = document.getElementById("totalMatches");

// Total Teams
if (totalTeams) {

  onSnapshot(collection(db, "teams"), (snap) => {

    totalTeams.textContent = snap.size;

  });

}

// Total Groups
if (totalGroups) {

  onSnapshot(collection(db, "groups"), (snap) => {

    totalGroups.textContent = snap.size;

  });

}

// Total Matches
if (totalMatches) {

  onSnapshot(collection(db, "fixtures"), (snap) => {

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

if (team1Name && team2Name) {

  onSnapshot(doc(db, "fixtures", "nextMatch"), (docSnap) => {

    if (!docSnap.exists()) return;

    const data = docSnap.data();

    team1Name.textContent = data.team1 || "";
    team2Name.textContent = data.team2 || "";

    team1Logo.src = data.team1Logo || "";
    team2Logo.src = data.team2Logo || "";

    matchDate.textContent = data.date || "";
    matchTime.textContent = data.time || "";
    matchDeadline.textContent = data.deadline || "";
    matchStatus.textContent = data.status || "";

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

  const userId =
    Date.now() + "-" + Math.random().toString(36).substring(2);

  const userRef = ref(rtdb, "onlineUsers/" + userId);

  set(userRef, true);

  onDisconnect(userRef).remove();

  onValue(ref(rtdb, "onlineUsers"), (snapshot) => {

    if (!snapshot.exists()) {
      onlineCount.textContent = "0";
    } else {
      onlineCount.textContent =
        Object.keys(snapshot.val()).length;
    }

  });

                                                 }

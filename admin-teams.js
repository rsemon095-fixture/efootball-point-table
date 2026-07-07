alert("Admin Teams JS Loaded");
import { db } from "./firebase.js";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const teamInput = document.getElementById("teamName");
const addTeamBtn = document.getElementById("addTeamBtn");
const teamList = document.getElementById("teamList");

// Add Team
addTeamBtn.addEventListener("click", async () => {

    if (teamInput.value.trim() === "") {
        alert("Enter Team Name");
        return;
    }

    await addDoc(collection(db, "teams"), {
        name: teamInput.value.trim()
    });

    teamInput.value = "";

});

// Live Team List
onSnapshot(collection(db, "teams"), (snap) => {

    teamList.innerHTML = "";

    snap.forEach(teamDoc => {

        const team = teamDoc.data();

        teamList.innerHTML += `
        <div class="team-card">

            <h3>${team.name}</h3>

            <button class="delete-btn"
            onclick="deleteTeam('${teamDoc.id}')">
            🗑 Delete
            </button>

        </div>
        `;

    });

});

// Delete Team
window.deleteTeam = async (id) => {

    if (!confirm("Delete this team?")) return;

    await deleteDoc(doc(db, "teams", id));

};

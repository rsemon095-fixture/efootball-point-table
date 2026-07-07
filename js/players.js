import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const playerName = document.getElementById("playerName");
const jersey = document.getElementById("jersey");
const position = document.getElementById("position");
const team = document.getElementById("team");
const addPlayerBtn = document.getElementById("addPlayerBtn");
const playerList = document.getElementById("playerList");

// Load Teams
async function loadTeams() {
    const snap = await getDocs(collection(db, "teams"));

    snap.forEach(teamDoc => {
        const option = document.createElement("option");
        option.value = teamDoc.data().name;
        option.textContent = teamDoc.data().name;
        team.appendChild(option);
    });
}

loadTeams();

// Add Player
addPlayerBtn.addEventListener("click", async () => {

    if (
        playerName.value === "" ||
        jersey.value === "" ||
        position.value === "" ||
        team.value === ""
    ) {
        alert("সব তথ্য পূরণ করুন");
        return;
    }

    await addDoc(collection(db, "players"), {
        name: playerName.value,
        jersey: jersey.value,
        position: position.value,
        team: team.value
    });

    playerName.value = "";
    jersey.value = "";
    position.value = "";
    team.value = "";

});

// Live Player List
onSnapshot(collection(db, "players"), (snap) => {

    playerList.innerHTML = "";

    snap.forEach(playerDoc => {

        const p = playerDoc.data();

        playerList.innerHTML += `
        <div class="player-card">

            <h3>${p.name}</h3>

            <p>Team : ${p.team}</p>

            <p>Position : ${p.position}</p>

            <p>Jersey : ${p.jersey}</p>

            <button onclick="deletePlayer('${playerDoc.id}')">
                🗑 Delete
            </button>

        </div>
        `;

    });

});

// Delete Player
window.deletePlayer = async (id) => {

    if (!confirm("Delete this player?")) return;

    await deleteDoc(doc(db, "players", id));

};

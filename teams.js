import { db } from "./firebase.js";

import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";
console.log(teamInput);
console.log(addTeamBtn);
const teamList = document.getElementById("teamList");

// Live Team List (Public View)
onSnapshot(collection(db, "teams"), (snapshot) => {

    teamList.innerHTML = "";

    let i = 1;

    snapshot.forEach((team) => {

        const data = team.data();

        const tr = document.createElement("tr");

        tr.innerHTML = `
            <td>${i++}</td>
            <td>${data.name}</td>
        `;

        teamList.appendChild(tr);

    });

});

import { db } from "./firebase.js";

import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


const playerList = document.getElementById("playerList");


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

        </div>

        `;


    });


});

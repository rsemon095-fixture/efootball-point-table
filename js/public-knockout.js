import { db } from "./firebase.js";

import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


const knockoutList = document.getElementById("knockoutList");


// Live Knockout View

onSnapshot(collection(db,"knockout"), (snapshot)=>{


    knockoutList.innerHTML = "";


    snapshot.forEach((match)=>{


        const data = match.data();


        knockoutList.innerHTML += `

        <div class="match">

        <h3>${data.round}</h3>

        <h2>
        ${data.home}
        ⚔️
        ${data.away}
        </h2>

        <p>
        Status: ${data.status}
        </p>

        </div>

        `;


    });


});

import { db } from "./firebase.js";

import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


const fixtureList = document.getElementById("fixtureList");


// Live Fixture View

onSnapshot(collection(db,"fixtures"), (snapshot)=>{


    fixtureList.innerHTML = "";


    snapshot.forEach((match)=>{


        const data = match.data();


        fixtureList.innerHTML += `

        <tr>

        <td>${data.group}</td>

        <td>${data.home}</td>

        <td>${data.away}</td>

        <td>${data.status}</td>

        </tr>

        `;


    });


});

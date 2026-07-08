import { db } from "./firebase.js";

import {
  collection,
  onSnapshot,
  updateDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const resultList = document.getElementById("resultList");

// Load Fixtures
onSnapshot(collection(db, "fixtures"), (snapshot) => {

    resultList.innerHTML = "";

    snapshot.forEach((match) => {

        const data = match.data();

        resultList.innerHTML += `

        <tr>

            <td>${data.group}</td>

            <td>${data.home}</td>

            <td>
                <input
                type="number"
                id="home_${match.id}"
                value="${data.homeScore ?? ''}">
            </td>

            <td>${data.away}</td>

            <td>
                <input
                type="number"
                id="away_${match.id}"
                value="${data.awayScore ?? ''}">
            </td>

            <td>
                <button onclick="updateResult('${match.id}')">
                💾 Save
                </button>
            </td>

        </tr>

        `;

    });

});

// Save Result
window.updateResult = async function(id){

    const homeScore = Number(document.getElementById("home_"+id).value);

    const awayScore = Number(document.getElementById("away_"+id).value);

    let winner = "Draw";

    if(homeScore > awayScore){
        winner = "Home";
    }else if(awayScore > homeScore){
        winner = "Away";
    }

    await updateDoc(doc(db,"fixtures",id),{

        homeScore:homeScore,

        awayScore:awayScore,

        winner:winner,

        status:"Finished",

        resultSaved:true,

        updatedAt:Date.now()

    });

    alert("✅ Result Saved Successfully");

}

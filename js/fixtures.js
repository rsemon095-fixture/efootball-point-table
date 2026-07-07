import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const generateBtn = document.getElementById("generateFixture");
const fixtureList = document.getElementById("fixtureList");

// Load Assignments Group Wise
async function loadAssignments() {

    const snapshot = await getDocs(collection(db, "assignments"));

    const groups = {};

    snapshot.forEach((doc) => {

        const data = doc.data();

        if (!groups[data.groupName]) {
            groups[data.groupName] = [];
        }

        groups[data.groupName].push({
            teamId: data.teamId,
            teamName: data.teamName
        });

    });

    return groups;

}
// Create Round Robin Fixtures
function createFixtures(teams){

    let matches = [];

    for(let i = 0; i < teams.length; i++){

        for(let j = i + 1; j < teams.length; j++){

            matches.push({

                home: teams[i].teamName,

                away: teams[j].teamName,

                status:"Upcoming"

            });

        }

    }

    return matches;

}
// Generate Fixture Button

generateBtn.addEventListener("click", async () => {

    const allGroups = await loadAssignments();

    for (const group in allGroups) {

        const teams = allGroups[group];

        const matches = createFixtures(teams);


        for (const match of matches) {

            await addDoc(collection(db, "fixtures"), {

                group: group,

                home: match.home,

                away: match.away,

                status: "Upcoming",

                createdAt: Date.now()

            });

        }

    }

    alert("Fixtures Generated Successfully");

});


// Live Fixture List

onSnapshot(collection(db,"fixtures"), (snapshot)=>{


    fixtureList.innerHTML="";


    let i = 1;


    snapshot.forEach((doc)=>{


        const data = doc.data();


        fixtureList.innerHTML += `

        <tr>

        <td>${i++}</td>

        <td>${data.group}</td>

        <td>${data.home}</td>

        <td>${data.away}</td>

        <td>${data.status}</td>

        </tr>

        `;


    });


});

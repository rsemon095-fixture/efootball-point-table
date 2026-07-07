import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


const teamInput = document.getElementById("teamName");
const addTeamBtn = document.getElementById("addTeam");
const teamList = document.getElementById("teamList");


// Check JS Load
console.log("Teams JS Loaded");


// Add Team

addTeamBtn.addEventListener("click", async () => {


    const team = teamInput.value.trim();


    if(team === ""){

        alert("Enter Team Name");

        return;

    }


    try{


        await addDoc(collection(db,"teams"),{

            name: team,

            createdAt: Date.now()

        });


        alert("Team Added Successfully");


        teamInput.value="";



    }catch(error){


        console.log(error);


        alert("Error: " + error.message);


    }


});



// Live Team List

onSnapshot(collection(db,"teams"),(snapshot)=>{


    teamList.innerHTML="";


    let i=1;


    snapshot.forEach((team)=>{


        const data = team.data();


        const tr=document.createElement("tr");


        tr.innerHTML=`

        <td>${i++}</td>

        <td>${data.name}</td>

        <td>

        <span 
        class="action"
        data-id="${team.id}">

        Delete

        </span>

        </td>

        `;


        teamList.appendChild(tr);



    });


},(error)=>{


    console.log(error);


    alert("Load Error: " + error.message);


});




// Delete Team

document.addEventListener("click", async(e)=>{


    if(e.target.classList.contains("action")){


        const id=e.target.dataset.id;


        try{


            await deleteDoc(
                doc(db,"teams",id)
            );


            alert("Team Deleted");


        }catch(error){


            console.log(error);


            alert("Delete Error: " + error.message);


        }


    }


});

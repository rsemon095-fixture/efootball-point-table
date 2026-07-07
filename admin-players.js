import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


const playerName = document.getElementById("playerName");
const jersey = document.getElementById("jersey");
const position = document.getElementById("position");
const team = document.getElementById("team");
const addPlayerBtn = document.getElementById("addPlayerBtn");
const playerList = document.getElementById("playerList");


let editId = null;


// Load Teams
async function loadTeams(){

    const snap = await getDocs(collection(db,"teams"));

    team.innerHTML = `<option value="">Select Team</option>`;

    snap.forEach(teamDoc=>{

        let option = document.createElement("option");

        option.value = teamDoc.data().name;
        option.textContent = teamDoc.data().name;

        team.appendChild(option);

    });

}

loadTeams();



// Add / Update Player
addPlayerBtn.addEventListener("click", async()=>{


    if(
        playerName.value=="" ||
        jersey.value=="" ||
        position.value=="" ||
        team.value==""
    ){

        alert("সব তথ্য পূরণ করুন");
        return;

    }



    const data = {

        name: playerName.value,
        jersey: jersey.value,
        position: position.value,
        team: team.value

    };



    if(editId){

        await updateDoc(
            doc(db,"players",editId),
            data
        );

        editId=null;

        addPlayerBtn.innerText="Add Player";


    }
    else{

        await addDoc(
            collection(db,"players"),
            data
        );

    }



    playerName.value="";
    jersey.value="";
    position.value="";
    team.value="";


});




// Live Player List

onSnapshot(collection(db,"players"),(snap)=>{


    playerList.innerHTML="";


    snap.forEach(playerDoc=>{


        const p = playerDoc.data();


        playerList.innerHTML += `


        <div class="player-card">


        <h3>${p.name}</h3>


        <p>Team : ${p.team}</p>

        <p>Position : ${p.position}</p>

        <p>Jersey : ${p.jersey}</p>



        <div class="action-btn">


        <button onclick="editPlayer('${playerDoc.id}',
        '${p.name}',
        '${p.jersey}',
        '${p.position}',
        '${p.team}')">

        ✏ Edit

        </button>



        <button class="delete"
        onclick="deletePlayer('${playerDoc.id}')">

        🗑 Delete

        </button>


        </div>


        </div>


        `;


    });


});




// Edit Player

window.editPlayer = (
id,
name,
jerseyNo,
pos,
teamName
)=>{


    editId=id;


    playerName.value=name;

    jersey.value=jerseyNo;

    position.value=pos;

    team.value=teamName;


    addPlayerBtn.innerText="Update Player";


};




// Delete Player

window.deletePlayer = async(id)=>{


    if(!confirm("Delete this player?")) return;


    await deleteDoc(
        doc(db,"players",id)
    );


};

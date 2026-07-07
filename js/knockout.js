import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


const btn = document.getElementById("generateKnockout");
const knockoutList = document.getElementById("knockoutList");


// Generate Knockout

btn.addEventListener("click", async()=>{


    const teams = await getTopTeams();


    if(teams.length < 2){

        alert("Not enough teams");

        return;

    }


    for(let i=0; i < teams.length; i += 2){


        if(teams[i+1]){


            await addDoc(collection(db,"knockout"),{

                round:"Quarter Final",

                home:teams[i].name,

                away:teams[i+1].name,

                status:"Upcoming",

                createdAt:Date.now()

            });


        }


    }


    alert("Knockout Generated");


});



// Get Top Teams From Points

async function getTopTeams(){


    let table = {};


    const snapshot = await getDocs(collection(db,"fixtures"));



    snapshot.forEach((match)=>{


        const data = match.data();


        if(data.status !== "Completed") return;



        addTeam(data.home);

        addTeam(data.away);



        const hs = Number(data.homeScore);

        const as = Number(data.awayScore);



        table[data.home].mp++;

        table[data.away].mp++;


        table[data.home].gf += hs;

        table[data.home].ga += as;


        table[data.away].gf += as;

        table[data.away].ga += hs;



        if(hs > as){

            table[data.home].pts += 3;

        }

        else if(as > hs){

            table[data.away].pts += 3;

        }

        else{

            table[data.home].pts++;

            table[data.away].pts++;

        }


    });



    let arr = Object.values(table);



    arr.sort((a,b)=> b.pts-a.pts);



    return arr.slice(0,8);



    function addTeam(name){


        if(!table[name]){

            table[name]={

                name:name,

                mp:0,

                gf:0,

                ga:0,

                pts:0

            };

        }

    }


}



// Live Knockout View

import {
onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


onSnapshot(collection(db,"knockout"),(snap)=>{


    knockoutList.innerHTML="";


    snap.forEach(doc=>{


        const data=doc.data();


        knockoutList.innerHTML += `

        <div class="match">

        <h3>${data.round}</h3>

        <p>
        ${data.home}
        VS
        ${data.away}
        </p>

        <small>${data.status}</small>

        </div>

        `;


    });


});

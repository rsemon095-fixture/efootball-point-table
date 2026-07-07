import { db } from "./firebase.js";

import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";


const publicPoints = document.getElementById("publicPoints");


// Live Points Calculation

onSnapshot(collection(db,"fixtures"), (snapshot)=>{


    let table = {};


    snapshot.forEach((match)=>{


        const data = match.data();


        if(data.status !== "Completed"){
            return;
        }


        const home = data.home;
        const away = data.away;

        const hs = Number(data.homeScore);
        const as = Number(data.awayScore);



        if(!table[home]){
            table[home] = createTeam(home);
        }


        if(!table[away]){
            table[away] = createTeam(away);
        }



        table[home].mp++;
        table[away].mp++;


        table[home].gf += hs;
        table[home].ga += as;


        table[away].gf += as;
        table[away].ga += hs;



        if(hs > as){

            table[home].w++;
            table[home].pts += 3;

            table[away].l++;

        }

        else if(as > hs){

            table[away].w++;
            table[away].pts += 3;

            table[home].l++;

        }

        else{

            table[home].d++;
            table[away].d++;

            table[home].pts++;
            table[away].pts++;

        }


    });



    let teams = Object.values(table);



    teams.forEach(t=>{

        t.gd = t.gf - t.ga;

    });



    teams.sort((a,b)=>{

        return b.pts - a.pts || b.gd - a.gd;

    });



    publicPoints.innerHTML="";



    teams.forEach((team,index)=>{


        publicPoints.innerHTML += `

        <tr>

        <td>${index+1}</td>

        <td>${team.name}</td>

        <td>${team.mp}</td>

        <td>${team.w}</td>

        <td>${team.d}</td>

        <td>${team.l}</td>

        <td>${team.gd}</td>

        <td>${team.pts}</td>

        </tr>

        `;


    });



});




function createTeam(name){

return {

name:name,

mp:0,

w:0,

d:0,

l:0,

gf:0,

ga:0,

gd:0,

pts:0

};

}

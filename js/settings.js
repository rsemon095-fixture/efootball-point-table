import { db } from "./firebase.js";

import {
doc,
setDoc,
getDoc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const tournamentName=document.getElementById("tournamentName");
const logo=document.getElementById("logo");
const deadline=document.getElementById("deadline");
const footer=document.getElementById("footer");
const saveBtn=document.getElementById("saveBtn");

const ref=doc(db,"settings","main");

async function load(){

const snap=await getDoc(ref);

if(snap.exists()){

const data=snap.data();

tournamentName.value=data.tournamentName||"";
logo.value=data.logo||"";
deadline.value=data.deadline||"";
footer.value=data.footer||"";

}

}

load();

saveBtn.addEventListener("click",async()=>{

await setDoc(ref,{

tournamentName:tournamentName.value,

logo:logo.value,

deadline:deadline.value,

footer:footer.value

});

alert("Settings Saved");

});

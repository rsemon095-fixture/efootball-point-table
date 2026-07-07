import { db } from "./firebase.js";

import {
collection,
addDoc,
onSnapshot,
deleteDoc,
doc
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const noticeText=document.getElementById("noticeText");
const addNotice=document.getElementById("addNotice");
const noticeList=document.getElementById("noticeList");

addNotice.addEventListener("click",async()=>{

if(noticeText.value.trim()==""){

alert("Write Notice");

return;

}

await addDoc(collection(db,"notices"),{

text:noticeText.value,
time:new Date().toLocaleString()

});

noticeText.value="";

});

onSnapshot(collection(db,"notices"),(snap)=>{

noticeList.innerHTML="";

snap.forEach(n=>{

const data=n.data();

noticeList.innerHTML+=`

<div class="notice-card">

<p>${data.text}</p>

<small>${data.time}</small>

<button class="delete"
onclick="deleteNotice('${n.id}')">

🗑 Delete

</button>

</div>

`;

});

});

window.deleteNotice=async(id)=>{

if(!confirm("Delete Notice?")) return;

await deleteDoc(doc(db,"notices",id));

};

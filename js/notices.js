import { db } from "./firebase.js";

import {
collection,
onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const noticeBoard=document.getElementById("noticeBoard");

onSnapshot(collection(db,"notices"),(snap)=>{

noticeBoard.innerHTML="";

snap.forEach(n=>{

const data=n.data();

noticeBoard.innerHTML+=`

<div class="notice">

<p>${data.text}</p>

<small>${data.time}</small>

</div>

`;

});

});

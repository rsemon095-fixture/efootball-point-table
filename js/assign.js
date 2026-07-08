import { db } from "./firebase.js";

import {
collection,
getDocs,
addDoc,
onSnapshot,
deleteDoc,
doc,
query,
where
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const teamSelect=document.getElementById("teamSelect");
const groupSelect=document.getElementById("groupSelect");
const assignBtn=document.getElementById("assignBtn");
const assignList=document.getElementById("assignList");

async function loadTeams(){

const snap=await getDocs(collection(db,"teams"));

teamSelect.innerHTML='<option value="">Select Team</option>';

snap.forEach(team=>{

teamSelect.innerHTML+=`
<option value="${team.id}">
${team.data().name}
</option>
`;

});

}

async function loadGroups(){

const snap=await getDocs(collection(db,"groups"));

groupSelect.innerHTML='<option value="">Select Group</option>';

snap.forEach(group=>{

groupSelect.innerHTML+=`
<option value="${group.id}">
${group.data().name}
</option>
`;

});

}

loadTeams();
loadGroups();

assignBtn.addEventListener("click", async () => {
  try {
    if (!teamSelect.value || !groupSelect.value) {
      alert("Select Team & Group");
      return;
    }

    const check = await getDocs(
      query(
        collection(db, "assignments"),
        where("teamId", "==", teamSelect.value)
      )
    );

    if (!check.empty) {
      alert("This Team Already Assigned");
      return;
    }

    await addDoc(collection(db, "assignments"), {
      teamId: teamSelect.value,
      teamName: teamSelect.options[teamSelect.selectedIndex].text,
      groupId: groupSelect.value,
      groupName: groupSelect.options[groupSelect.selectedIndex].text,
      createdAt: Date.now()
    });

    teamSelect.value = "";
    groupSelect.value = "";

    alert("Assigned Successfully");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
});

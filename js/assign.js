import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const teamSelect = document.getElementById("teamSelect");
const groupSelect = document.getElementById("groupSelect");
const assignBtn = document.getElementById("assignBtn");
const assignList = document.getElementById("assignList");

// Load Teams
async function loadTeams() {
  const snap = await getDocs(collection(db, "teams"));

  snap.forEach(doc => {
    teamSelect.innerHTML += `
      <option value="${doc.id}">
        ${doc.data().name}
      </option>`;
  });
}

// Load Groups
async function loadGroups() {
  const snap = await getDocs(collection(db, "groups"));

  snap.forEach(doc => {
    groupSelect.innerHTML += `
      <option value="${doc.id}">
        ${doc.data().name}
      </option>`;
  });
}

loadTeams();
loadGroups();

// Assign Team
assignBtn.addEventListener("click", async () => {

  if (teamSelect.value === "" || groupSelect.value === "") {
    alert("Select Team and Group");
    return;
  }

  await addDoc(collection(db, "assignments"), {
    teamId: teamSelect.value,
    teamName: teamSelect.options[teamSelect.selectedIndex].text,
    groupId: groupSelect.value,
    groupName: groupSelect.options[groupSelect.selectedIndex].text,
    createdAt: Date.now()
  });

  alert("Team Assigned Successfully");

});

// Live Assignment List
onSnapshot(collection(db, "assignments"), (snapshot) => {

  assignList.innerHTML = "";

  snapshot.forEach(doc => {

    const data = doc.data();

    assignList.innerHTML += `
      <tr>
        <td>${data.teamName}</td>
        <td>${data.groupName}</td>
      </tr>`;

  });

});

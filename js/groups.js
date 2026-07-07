import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const groupInput = document.getElementById("groupName");
const addBtn = document.getElementById("addGroup");
const groupList = document.getElementById("groupList");

// Add Group
addBtn.addEventListener("click", async () => {

    const name = groupInput.value.trim();

    if (name === "") {
        alert("Enter Group Name");
        return;
    }

    await addDoc(collection(db, "groups"), {
        name: name,
        createdAt: Date.now()
    });

    groupInput.value = "";

});

// Live Group List
onSnapshot(collection(db, "groups"), (snapshot) => {

    groupList.innerHTML = "";

    let i = 1;

    snapshot.forEach((group) => {

        groupList.innerHTML += `
        <tr>
            <td>${i++}</td>
            <td>${group.data().name}</td>
            <td>
                <button class="deleteBtn" data-id="${group.id}">
                    Delete
                </button>
            </td>
        </tr>`;
    });

});

// Delete Group
document.addEventListener("click", async (e) => {

    if (e.target.classList.contains("deleteBtn")) {

        const id = e.target.dataset.id;

        await deleteDoc(doc(db, "groups", id));

    }

});

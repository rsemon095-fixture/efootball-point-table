import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  addDoc,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

const generateBtn = document.getElementById("generateFixture");
const fixtureList = document.getElementById("fixtureList");

// Load Assignments Group Wise
async function loadAssignments() {

    const snapshot = await getDocs(collection(db, "assignments"));

    const groups = {};

    snapshot.forEach((doc) => {

        const data = doc.data();

        if (!groups[data.groupName]) {
            groups[data.groupName] = [];
        }

        groups[data.groupName].push({
            teamId: data.teamId,
            teamName: data.teamName
        });

    });

    return groups;

}

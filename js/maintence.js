import { rtdb } from "./firebase.js";
alert("JS Started");
import {
  ref,
  get,
  set
} from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const onBtn = document.getElementById("onBtn");
const offBtn = document.getElementById("offBtn");
const status = document.getElementById("status");

const maintenanceRef = ref(rtdb, "system/maintenance");

async function loadStatus() {

  try {

    const snap = await get(maintenanceRef);

    if (snap.exists() && snap.val() === true) {

      status.innerHTML = "🟢 Current Status : ON";
      status.style.color = "#00ff66";

    } else {

      status.innerHTML = "🔴 Current Status : OFF";
      status.style.color = "#ff4444";

    }

  } catch (e) {

    alert(e.message);

  }

}

onBtn.onclick = async function () {

  try {

    await set(maintenanceRef, true);

    status.innerHTML = "🟢 Current Status : ON";
    status.style.color = "#00ff66";

    alert("Maintenance Mode Enabled");

  } catch (e) {

    alert(e.message);

  }

};

offBtn.onclick = async function () {

  try {

    await set(maintenanceRef, false);

    status.innerHTML = "🔴 Current Status : OFF";
    status.style.color = "#ff4444";

    alert("Maintenance Mode Disabled");

  } catch (e) {

    alert(e.message);

  }

};

loadStatus();

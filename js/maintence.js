import { rtdb } from "./firebase.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-database.js";

const onBtn = document.getElementById("onBtn");
const offBtn = document.getElementById("offBtn");
const status = document.getElementById("status");

const maintenanceRef = ref(rtdb, "system/maintenance");

async function loadStatus() {
    const snap = await get(maintenanceRef);

    if (snap.exists() && snap.val() === true) {
        status.innerHTML = "Current Status : ON";
        status.style.color = "#00ff66";
    } else {
        status.innerHTML = "Current Status : OFF";
        status.style.color = "#ff4444";
    }
}

onBtn.onclick = async () => {
    await set(maintenanceRef, true);

    status.innerHTML = "Current Status : ON";
    status.style.color = "#00ff66";

    alert("Maintenance Mode Enabled");
};

offBtn.onclick = async () => {
    await set(maintenanceRef, false);

    status.innerHTML = "Current Status : OFF";
    status.style.color = "#ff4444";

    alert("Maintenance Mode Disabled");
};

loadStatus();

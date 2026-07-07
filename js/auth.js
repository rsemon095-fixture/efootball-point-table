import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");

loginBtn.addEventListener("click", async () => {

    error.innerText = "";

    try {

        await signInWithEmailAndPassword(
            auth,
            email.value,
            password.value
        );

        window.location.href = "window.location.href = "dashboard.html";";

    } catch (err) {

        error.innerText = "Invalid Email or Password";

    }

});

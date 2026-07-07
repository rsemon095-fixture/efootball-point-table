import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

const loginBtn = document.getElementById("loginBtn");
const email = document.getElementById("email");
const password = document.getElementById("password");
const error = document.getElementById("error");

loginBtn.addEventListener("click", async () => {

    error.innerText = "";

    if (email.value === "" || password.value === "") {
        error.innerText = "Please enter Email & Password";
        return;
    }

    try {

        await signInWithEmailAndPassword(
            auth,
            email.value.trim(),
            password.value
        );

        // Login Success
        window.location.href = "dashboard.html";

    } catch (err) {

        console.log(err);

        error.innerText = "Invalid Email or Password";

    }

});

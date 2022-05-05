const loginBtn = document.getElementById("loginBtn");

const signupBtn = document.getElementById("signupBtn");

signupBtn.addEventListener("click", signupPopup);
loginBtn.addEventListener("click", loginPopup);

function signupPopup () { 

    const popup = document.getElementById("popup");
    popup.innerHTML = "";
    jQuery("#popup").load("signup.html");

}

function loginPopup () {

    const popup = document.getElementById("popup");
    popup.innerHTML = "";
    jQuery("#popup").load("login.html");

}
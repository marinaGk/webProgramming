let loginBtn = document.querySelector("#loginBtn"); 
let signupBtn = document.querySelector("#signupBtn");
let joinTournamentBtn = document.querySelector('#joinTournamentBtn');

let closeBtn;
let modal;
let popup;

loginBtn.addEventListener("click", loginPopup); 
signupBtn.addEventListener("click", signupPopup);
joinTournamentBtn.addEventListener("click", joinTournamentPopup);


//login popup opens

function loginPopup() {

    popup = document.querySelector("#login");
    modal = popup.querySelector(".modal-container");

    closeBtn = popup.querySelector(".close");
    closeBtn.addEventListener("click", closePopup); 

    document.body.style.overflow = "hidden";
    modal.style.zIndex = "500";
    modal.style.display = "flex";

    let redirect = popup.querySelector(".redirect");


    //when redirect gets pressed, the login popup closes and the signup popup opens

    redirect.addEventListener("click", function(){ 
        closePopup(); 
        signupPopup();
    });

}


//signup popup opens

function signupPopup() { 

    popup = document.querySelector("#signup");
    modal = popup.querySelector(".modal-container");

    closeBtn = popup.querySelector(".close");
    closeBtn.addEventListener("click", closePopup); 

    document.body.style.overflow = "hidden";
    modal.style.zIndex = "500";
    modal.style.display = "flex";


    //when redirect gets pressed, the signup popup closes and the login popup opens

    let redirect = popup.querySelector(".redirect");
    redirect.addEventListener("click", function(){ 
        closePopup(); 
        loginPopup();
    });

}


//join tournament popup opens

function joinTournamentPopup() {

    popup = document.querySelector("#join-tournament");
    modal = popup.querySelector(".modal-container");

    let select = document.querySelector('.field select');
    select.innerHTML = "";

    let tournaments = document.querySelectorAll(".tournament_title");

    let value=1;
    for (let i of tournaments) {
        let newInput = document.createElement('option');
        newInput.setAttribute ("value", "tournament" + value++);
        newInput.innerHTML = i.innerHTML;
        select.appendChild(newInput);
    }

    closeBtn = popup.querySelector(".close");
    closeBtn.addEventListener("click", closePopup); 

    document.body.style.overflow = "hidden";
    modal.style.zIndex = "500";
    modal.style.display = "flex";

}

//function that closes popup window when close button is pressed

function closePopup() { 

    document.body.style.overflow = "scroll";
    modal.style.zIndex = "-1";
    modal.style.display = "none";

}
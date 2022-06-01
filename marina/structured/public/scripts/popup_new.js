let loginBtn = document.querySelector("#loginBtn"); 
let signupBtn = document.querySelector("#signupBtn");
let closeBtn;
let modal;

loginBtn.addEventListener("click", loginPopup); 
signupBtn.addEventListener("click", signupPopup);


function loginPopup() {

    let popup = document.querySelector("#login");
    modal = popup.querySelector(".modal-container");

    closeBtn = popup.querySelector(".close");
    closeBtn.addEventListener("click", closePopup); 

    modal.style.zIndex = "500";
    modal.style.display = "flex";

    let redirect = popup.querySelector(".redirect");
    redirect.addEventListener("click", function(){ 
        closePopup(); 
        signupPopup();
    });

}

function signupPopup() { 

    let popup = document.querySelector("#signup");
    modal = popup.querySelector(".modal-container");

    closeBtn = popup.querySelector(".close");
    closeBtn.addEventListener("click", closePopup); 

    document.body.style.overflow = "hidden";
    modal.style.zIndex = "500";
    modal.style.display = "flex";

    let redirect = popup.querySelector(".redirect");
    redirect.addEventListener("click", function(){ 
        closePopup(); 
        loginPopup();
    });

}

function closePopup() { 

    modal.style.zIndex = "-1";
    modal.style.display = "none";

}

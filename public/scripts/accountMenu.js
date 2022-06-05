let accountBtn = document.querySelector(".connectedButton");
accountBtn.addEventListener("click", showAccountMenu);

function showAccountMenu() {

    let accountMenu = document.querySelector(".account");

    if(accountMenu.getAttribute("state") == "hidden") { 
        accountMenu.style.display = "block"; 
        accountMenu.setAttribute("state", "show");
    }
    else{ 
        accountMenu.style.display = "none";
        accountMenu.setAttribute("state", "hidden");
    }

}
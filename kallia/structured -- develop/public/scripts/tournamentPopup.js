let addTournamentBtn = document.querySelector("#addTournamentBtn");
let deleteTournamentBtn = document.querySelector("#deleteTournamentBtn");
let deleteMonthBtn = document.querySelector("#deleteMonthBtn");
let closeBtn;
let modal;

addTournamentBtn.addEventListener("click", addTournamentPopup);
deleteTournamentBtn.addEventListener("click", deleteTournamentPopup);
deleteMonthBtn.addEventListener("click", deleteMonthPopup);


function addTournamentPopup() { 

    let popup = document.querySelector("#addTournament");
    modal = popup.querySelector(".modal-container");

    closeBtn = popup.querySelector(".close");
    closeBtn.addEventListener("click", closePopup);

    modal.style.zIndex = "500";
    modal.style.display = "flex";

}


function deleteTournamentPopup() { 

    let popup = document.querySelector("#deleteTournament");
    modal = popup.querySelector(".modal-container");

    closeBtn = popup.querySelector(".close");
    closeBtn.addEventListener("click", closePopup);

    modal.style.zIndex = "500";
    modal.style.display = "flex";

}


function deleteMonthPopup() { 

    let popup = document.querySelector("#deleteMonth");
    modal = popup.querySelector(".modal-container");

    closeBtn = popup.querySelector(".close");
    closeBtn.addEventListener("click", closePopup);

    modal.style.zIndex = "500";
    modal.style.display = "flex";

}


function closePopup() { 

    modal.style.zIndex = "-1";
    modal.style.display = "none";

}

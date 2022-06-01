let modal_form = document.querySelector("#accept_decline .modal-container");
let cells = document.querySelectorAll(".data_row td"); 

/*for (let i of cells){ 
    i.removeEventListener("click", book);
    i.addEventListener("click", confirmForm);
}*/

let cancelBtn = document.querySelector("#cancelBtn");
cancelBtn.addEventListener("click", closeConfirmForm);

function closeConfirmForm() { 
    modal_form.style.zIndex = "-1";
    modal_form.style.display = "none";
}

/*function confirmForm() { 
    let modal_form = document.querySelector("#accept_decline .modal-container");
    modal_form.style.zIndex = "500";
    modal_form.style.display = "flex";
}*/
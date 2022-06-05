const buttons = document.querySelector(".buttons");

initialize();

function initialize() { 

    let editBtn = document.createElement("div");
    editBtn.className = "admin_button";
    let edit = document.createElement("button");
    edit.setAttribute("id", "edit_button"); 
    edit.appendChild(document.createTextNode("Επεξεργασία"));
    edit.addEventListener("click", editMode);
    editBtn.appendChild(edit);
    buttons.appendChild(editBtn);

}

function editMode() { 

    mode = 1;

    let editBtn = document.querySelector(".admin_button");
    editBtn.remove();
    
    btn = document.createElement("div");
    btn.className = "admin_button";
    let addMonthButton  = document.createElement("button"); 
    addMonthButton.setAttribute("id", "add_month_button"); 
    addMonthButton.appendChild(document.createTextNode("Προσθήκη μήνα"));
    btn.appendChild(addMonthButton); 
    buttons.appendChild(btn);

    btn = document.createElement("div");
    btn.className = "admin_button";
    let addTournButton = document.createElement("button"); 
    addTournButton.setAttribute("id", "add_tournament_button"); 
    addTournButton.appendChild(document.createTextNode("Προσθήκη τουρνουά"));
    btn.appendChild(addTournButton);
    buttons.appendChild(btn);
        
    btn = document.createElement("div");
    btn.className = "admin_button";
    let saveButton = document.createElement("button"); 
    saveButton.setAttribute("id", "save_button"); 
    saveButton.appendChild(document.createTextNode("Αποθήκευση"));
    btn.appendChild(saveButton); 
    buttons.appendChild(btn);
    saveButton.addEventListener("click", normalMode);

    let delBtns = document.querySelectorAll(".delete_button.month");
    for (let i = 0; i<delBtns.length; i++) { 

        delBtns[i].addEventListener("click", monthDel);

    }
    delBtns = document.querySelectorAll(".delete_button.tournament");
    for (let i = 0; i<delBtns.length; i++) { 

        delBtns[i].addEventListener("click", tournamentDel);

    }

    edit();
}

function normalMode(){ 

    mode = 0;

    buttons.innerHTML = "";

    let delBtns = document.querySelectorAll(".delete_button.month");
    console.log("month" + delBtns.length);
    for (let i = 0; i<delBtns.length; i++) { 

        delBtns[i].removeEventListener("click", monthDel);

    }
    delBtns = document.querySelectorAll(".delete_button.tournament");
    console.log("tourn" + delBtns.length);
    for (let i = 0; i<delBtns.length; i++) { 

        delBtns[i].removeEventListener("click", tournamentDel);

    }

    initialize();
}
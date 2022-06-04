const edit_buttons = document.querySelector(".edit_buttons");

initialize();

function initialize() { 

    console.log("not called");
    let editBtn = document.createElement("div");
    editBtn.className = "admin_button";
    let edit = document.createElement("button");
    edit.setAttribute("id", "edit_button"); 
    edit.appendChild(document.createTextNode("Επεξεργασία"));
    edit.addEventListener("click", editMode);
    editBtn.appendChild(edit);
    edit_buttons.appendChild(editBtn);
    let cells = table.querySelectorAll(".data_row td");
    for (i of cells) { 
        i.style.cursor = "pointer";
    }

}

function editMode() {

    mode = 1;
    
    let editBtn = document.querySelector(".admin_button");
    editBtn.remove();

    let cells = table.querySelectorAll(".data_row td");
    for (i of cells) { 
        i.style.cursor = "default";
    }

    btn = document.createElement("div");
    btn.className = "admin_button";
    let saveButton = document.createElement("button"); 
    saveButton.setAttribute("id", "save_button"); 
    saveButton.appendChild(document.createTextNode("Αποθήκευση"));
    btn.appendChild(saveButton); 
    edit_buttons.appendChild(btn);
    saveButton.addEventListener("click", normalMode);

    edit();

}

function normalMode() { 

    mode = 0;

    edit_buttons.innerHTML = "";

    let rows = table.querySelectorAll(".data_row"); 
    for (i of rows) { 
        let cells = i.querySelectorAll("td");
        for (k of cells) { 
            k.addEventListener("click", book);
            k.contentEditable = false;
            k.style.cursor = "pointer";
        }

    }

    initialize();

}

function edit() { 

    let rows = table.querySelectorAll(".data_row"); 
    for (i of rows) { 
        let cells = i.querySelectorAll("td");
        for (k of cells) { 
            k.removeEventListener("click", book);
            k.contentEditable = true;
        }

    }

}
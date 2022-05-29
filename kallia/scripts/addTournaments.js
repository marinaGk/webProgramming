// let months_list = document.getElementsByClassName('tournaments_info_row');
// let months_counter = months_list.length;
// let tournaments_list = document.getElementsByClassName('tournament_row');
// let tournaments_counter = tournaments_list.length;
let current_month_row;
let current_tournament_row;

let mode;

function edit() { 

    let monthBtn = document.querySelector('#add_month_button');
    let tournBtn = document.querySelector('#add_tournament_button');

    monthBtn.addEventListener('click', newMonthField);
    tournBtn.addEventListener('click', newTournamentField);

}


//creates month item

function newMonthField() {

    // months_counter +=1;

    //current month item is the item with undefined current month row

    if (current_month_row != undefined){ 
        let list = current_month_row.classList; 
        list.remove("current_month");
    }

    let field = document.querySelector('.tournament_rows');


    //new month element -> includes month title and month tournaments (div class = "tournaments_info_row current_month" id = "monthX", X=1,2,..)

    current_month_row = document.createElement('div');
    current_month_row.className = 'tournaments_info_row';
    current_month_row.classList.add("current_month");

    let months_list = document.getElementsByClassName('tournaments_info_row');
    for (let i in months_list)
        months_list[i].id = 'month'+i;
    let months_counter = months_list.length;
    current_month_row.setAttribute('id', `month${months_counter}`);


    // new month title-delete element -> includes month title and deleteRow (for month title) elements (div class = "month_row")

    let monthRow = document.createElement("div"); 
    monthRow.className = "month_row"; 
    
 
    //new delete element -> includes delete button (div class = "delete_row")
    //new delete button for month element (button class = "delete_button")

    let deleteRow = document.createElement("div"); 
    deleteRow.className = "delete_row"; 
    let delBtn = document.createElement("button"); 
    delBtn.className = "delete_button";
    delBtn.classList.add("month");
    let text = document.createTextNode("x");
    delBtn.append(text);
    delBtn.addEventListener("click", monthDel);
    deleteRow.appendChild(delBtn); 
    monthRow.append(deleteRow);


    //new month title element (div class = "month-title") -> includes textfield h4 with the title of the month (h4 class = "month title")

    let month_title_field = document.createElement('div');
    month_title_field.className = 'month_title';
    let text_field = document.createElement('h4');
    text_field.contentEditable = 'True';
    month_title_field.appendChild(text_field);
    monthRow.append(month_title_field);
    current_month_row.appendChild(monthRow);


    //new input for month title (input type = "text" id = "month-title" placeholder = "Εισάγετε όνομα μήνα" onClick = "addMonthTitle()") 

    month_input = document.createElement('input');
    month_input.setAttribute('type', 'text');
    month_input.setAttribute('id', 'month_title');
    month_input.setAttribute('placeholder', 'Εισάγετε όνομα μήνα');
    current_month_row.appendChild(month_input);
    month_input.addEventListener('keypress', addMonthTitle);

    field.appendChild(current_month_row);
}



//function used to append month title to tournaments page. Called when a month title is given in the moth title placeholder.
//month item that is in edit mode has an additional class called current_month

function addMonthTitle(event) {

    if (event.key == 'Enter') {
        let inputVar = month_input.value;
        month_input.remove();
        let field = document.querySelector('.tournaments_info_row.current_month');
        field = field.querySelector('h4');
        let text = document.createTextNode(inputVar);
        field.appendChild(text)
    }

}


//creates tournament item

function newTournamentField() {

    if (current_tournament_row != undefined){ 
        let list = current_tournament_row.classList; 
        list.remove("current_tourn");
    }
    
    current_tournament_row = createTournamentRow()
    month = document.querySelector('.tournaments_info_row.current_month');
    month.appendChild(current_tournament_row);

    title_input = document.createElement('input');
    title_input.setAttribute('type', 'text');
    title_input.className = "tournament_title_input";
    title_input.setAttribute('placeholder', 'Εισάγετε τίτλο τουρνουά');
    current_tournament_row.querySelector('.tournament_description').appendChild(title_input);
    title_input.addEventListener('keypress', addTournamentTitle);

    details_input = document.createElement('textarea');
    details_input.setAttribute('type', 'text');
    details_input.className = "tournament_details_input";
    details_input.setAttribute('placeholder', 'Εισάγετε πληροφορίες τουρνουά');
    current_tournament_row.querySelector('.tournament_description').appendChild(details_input);
    details_input.addEventListener('keypress', addTournamentDetails);
}

function createTournamentRow() { 

    //tournaments_counter +=1; 

    let row = document.createElement('div');
    row.className = 'tournament_row';
    row.classList.add("current_tourn");

    let tournaments_list = document.getElementsByClassName('tournament_row');
    for (let i in tournaments_list)
        tournaments_list[i].id = 'tournament'+i;
    let tournaments_counter = tournaments_list.length;
    row.setAttribute('id', `tournament${tournaments_counter}`);

    let deleteRow = document.createElement("div"); 
    deleteRow.className = "delete_row"; 
    let delBtn = document.createElement("button"); 
    delBtn.className = "delete_button";
    delBtn.classList.add("tournament");
    let text = document.createTextNode("x");
    delBtn.append(text);
   
    delBtn.addEventListener("click", tournamentDel);

    deleteRow.append(delBtn); 
    row.append(deleteRow);

    let infoRow = document.createElement("div"); 
    infoRow.className = "info_row";

    let description = document.createElement('span');
    description.className = 'tournament_description';
    infoRow.appendChild(description); 
    
    let title = document.createElement('h4');
    title.className = 'tournament_title';
    title.contentEditable = 'True';
    description.appendChild(title);
    
    let details = document.createElement('p');
    details.className = 'tournament_details';
    details.contentEditable = 'True';
    description.appendChild(details);

    let poster = document.createElement('span');
    poster.className = 'tournament_poster';
    infoRow.appendChild(poster);

    row.appendChild(infoRow);

    return row
}

function addTournamentTitle(event) {

    if (event.key=='Enter') { 
        let inputVar = title_input.value;
        title_input.remove();
        current_tournament_row.querySelector(".info_row").setAttribute("id", inputVar);
        let field = document.querySelector('.tournament_row.current_tourn');
        field = field.querySelector('.tournament_title');
        let text = document.createTextNode(inputVar);
        field.appendChild(text)
        fillTable(inputVar)
    }
    
}

function addTournamentDetails(event) { 
    if (event.key=='Enter') { 
        let inputVar = details_input.value;
        details_input.remove();
        let field = document.querySelector('.current_tourn');
        field = field.querySelector('.tournament_details');
        let text = document.createTextNode(inputVar);
        field.appendChild(text)
    }
}

function fillTable(input) { 

    let table_field = document.querySelector(".board");
    let row = document.createElement("tr"); 
    row.setAttribute("id", `row${input}`);

    for (let i = 0; i<rowLength; i++) { 
        let cell = document.createElement("td"); 
        if (i == 2) {
            cell.appendChild(document.createTextNode(input));
        }
        cell.contentEditable = true;
        row.append(cell);
    }
    table_field.append(row);
}

function loadPage(href) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', href, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}

function monthDel (){ 

        let row = this.parentNode;
        let month = row.parentNode;
        delBtnTournaments = month.parentNode.querySelectorAll(".tournament_row .delete_row .delete_button");
        for (let deleteBtn of delBtnTournaments){
            deleteBtn.click();
        }
        deleteournaments = month.parentNode.querySelectorAll(".tournament_row .info_row");
        month.parentNode.remove();

}

function tournamentDel(){

    let deleteRow = this.parentNode;
    let current_row = deleteRow.parentNode;
    let children = current_row.children;
    let id = children[1].id;
    deleteRow.parentNode.remove();
    deleteTableEntry(id);

}


function deleteTableEntry(id){
    let table_rows = document.querySelectorAll(".board tr");
    for (let row of table_rows) {
        if (row.id === id){
            row.parentNode.removeChild(row);
        }
    }
}
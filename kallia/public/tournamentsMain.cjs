const monthNums = {0: "Ιανουάριος", 1: "Φεβρουάριος", 2: "Μάρτιος", 3: "Απρίλιος", 4: "Μάιος", 5: "Ιούνιος", 6: "Ιούλιος", 7: "Αύγουστος", 8: "Σεπτέμβριος", 9: "Οκτώβριος", 10: "Νοέμβριος", 11: "Δεκέμβριος"}

// let current_month_row;
//let current_tournament_row;
let existing_months =[];
let mode;





function newMonthField(tournaments) {
    
    for (let tour of tournaments){
        
        tour.startdate = new Date(tour.startdate);
        let tourMonth = tour.startdate.getMonth();
        console.log("Month", tourMonth);

        for (month of existing_months){
            if (tourMonth === month){
                newTournamentField(tour,tourMonth);
                return;
            }
        }

            // months_counter +=1;

        existing_months.push(tourMonth);
        console.log("existing months:",existing_months);

    //current month item is the item with undefined current month row
    

    // if (current_month_row != undefined){ 
    //     let list = current_month_row.classList; 
    //     list.remove("current_month");
    // }

    let field = document.querySelector('.tournament_rows');


    //new month element -> includes month title and month tournaments (div class = "tournaments_info_row current_month" id = "monthX", X=1,2,..)

    let tourInfoRow = document.createElement('div');
    tourInfoRow.className = 'tournaments_info_row';
    // month_row.classList.add("current_month");

    // let months_list = document.getElementsByClassName('tournaments_info_row');
    // for (let i in months_list)
    //     months_list[i].id = 'month'+i;
    // let months_counter = months_list.length;
    tourInfoRow.setAttribute('id', `month${tourMonth}`);


    // new month title-delete element -> includes month title and deleteRow (for month title) elements (div class = "month_row")

    let monthRow = document.createElement("div"); 
    monthRow.className = "month_row"; 
    
 
    //new delete element -> includes delete button (div class = "delete_row")
    //new delete button for month element (button class = "delete_button")

    // let deleteRow = document.createElement("div"); 
    // deleteRow.className = "delete_row"; 
    // let delBtn = document.createElement("button"); 
    // delBtn.className = "delete_button";
    // delBtn.classList.add("month");
    // let text = document.createTextNode("x");
    // delBtn.append(text);
    // delBtn.addEventListener("click", monthDel);
    // deleteRow.appendChild(delBtn); 
    // monthRow.append(deleteRow);


    //new month title element (div class = "month-title") -> includes textfield h4 with the title of the month (h4 class = "month title")

    let month_title_field = document.createElement('div');
    month_title_field.className = 'month_title';
    let text_field = document.createElement('h4');
    text_field.contentEditable = 'True';
    month_title_field.appendChild(text_field);
    monthRow.append(month_title_field);
    tourInfoRow.appendChild(monthRow);

    console.log(tourInfoRow.id);
    let allMonths = field.children;
    console.log(allMonths);
    let next = allMonths[allMonths.length-1];
    for (let i of allMonths){
        if (tourInfoRow.id < i.id && i.id < next.id){
            next = i;
        }
    }
    // field.appendChild(tourInfoRow);
    console.log("IS THIS IT", next);
    if (next=== undefined || tourInfoRow.id < next.id) field.insertBefore(tourInfoRow, next);
    else field.appendChild(tourInfoRow);
    addMonthTitle(tourInfoRow.id, monthNums[tourMonth]);
    newTournamentField(tour,tourMonth);


    //new input for month title (input type = "text" id = "month-title" placeholder = "Εισάγετε όνομα μήνα" onClick = "addMonthTitle()") 

    // month_input = document.createElement('input');
    // month_input.setAttribute('type', 'text');
    // month_input.setAttribute('id', 'month_title');
    // month_input.setAttribute('placeholder', 'Εισάγετε όνομα μήνα');
    // current_month_row.appendChild(month_input);
    // month_input.addEventListener('keypress', addMonthTitle);

    }
}



//function used to append month title to tournaments page. Called when a month title is given in the moth title placeholder.
//month item that is in edit mode has an additional class called current_month

function addMonthTitle(monthId, monthName) {

    // if (event.key == 'Enter') {
        // let inputVar = month_input.value;
        // month_input.remove();
        //let field = document.querySelector('.tournaments_info_row .current_month');
        let field = document.getElementById(monthId).querySelector('.month_row .month_title h4');
        //field = field.querySelector('h4');
        let text = document.createTextNode(monthName);
        field.appendChild(text);
    // }

}


//creates tournament item

function newTournamentField(tour, tourMonth) {

    // if (current_tournament_row != undefined){ 
    //     let list = current_tournament_row.classList; 
    //     list.remove("current_tourn");
    // }
    
    tournament_row = createTournamentRow();
    //month = document.querySelector('.tournaments_info_row month${tourMonth}');
    let month = document.getElementById("month"+tourMonth);
    month.appendChild(tournament_row);
    addTournamentTitle(tournament_row.id, tour.title);

    // title_input = document.createElement('input');
    // title_input.setAttribute('type', 'text');
    // title_input.className = "tournament_title_input";
    // title_input.setAttribute('placeholder', 'Εισάγετε τίτλο τουρνουά');
    // current_tournament_row.querySelector('.tournament_description').appendChild(title_input);
    // title_input.addEventListener('keypress', addTournamentTitle);

    // details_input = document.createElement('textarea');
    // details_input.setAttribute('type', 'text');
    // details_input.className = "tournament_details_input";
    // details_input.setAttribute('placeholder', 'Εισάγετε πληροφορίες τουρνουά');
    // current_tournament_row.querySelector('.tournament_description').appendChild(details_input);
    // details_input.addEventListener('keypress', addTournamentDetails);
}

function createTournamentRow() { 

    //tournaments_counter +=1; 

    let row = document.createElement('div');
    row.className = 'tournament_row';
    //row.classList.add("current_tourn");

    let tournaments_list = document.getElementsByClassName('tournament_row');
    for (let i in tournaments_list)
        tournaments_list[i].id = 'tournament'+i;
    let tournaments_counter = tournaments_list.length;
    row.setAttribute('id', `tournament${tournaments_counter}`);


    // let deleteRow = document.createElement("div"); 
    // deleteRow.className = "delete_row"; 
    // let delBtn = document.createElement("button"); 
    // delBtn.className = "delete_button";
    // delBtn.classList.add("tournament");
    // let text = document.createTextNode("x");
    // delBtn.append(text);
   
    // delBtn.addEventListener("click", tournamentDel);

    // deleteRow.append(delBtn); 
    // row.append(deleteRow);

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

function addTournamentTitle(tourId, tourTitle) {

    // if (event.key=='Enter') { 
        // let inputVar = title_input.value;
        //title_input.remove();
        let tournament = document.getElementById(tourId);
        tournament.querySelector('.info_row').setAttribute("id", tourTitle);
        //current_tournament_row.querySelector(".info_row").setAttribute("id", tourTitle);
        let field = document.getElementById(tourTitle).querySelector('.tournament_description .tournament_title');
        // let field = document.querySelector('.tournament_row.current_tourn');
        //field = field.querySelector('.tournament_title');
        let text = document.createTextNode(tourTitle);
        field.appendChild(text);
        //fillTable(title);
    // }
    
}

// function addTournamentDetails(event) { 
//     if (event.key=='Enter') { 
//         let inputVar = details_input.value;
//         details_input.remove();
//         let field = document.querySelector('.current_tourn');
//         field = field.querySelector('.tournament_details');
//         let text = document.createTextNode(inputVar);
//         field.appendChild(text)
//     }
// }



const rowLength = 5;

//makes tournament's table (static)
function addTableInfo() { 
    
    //makes table's title (static)
    let table_field = document.querySelector(".board"); 
    let title = document.createElement("tr"); 
    title.setAttribute("id", "board_title");
    let text = document.createTextNode("Πίνακας Τουρνουά"); 
    title.appendChild(text); 
    table_field.appendChild(title); 

    let header_row = document.createElement("tr"); 
    let headers = [{"header_id": "start_date", "header_name" : "Ημερομηνία Έναρξης"},
                    {"header_id" : "end_date", "header_name" : "Ημερομηνία Λήξης"}, 
                    {"header_id" : "title", "header_name" : "Τίτλος Τουρνουά"},	
                    {"header_id" : "join_right", "header_name" : "Επίπεδο Ικανοτήτων"},
                    {"header_id" : "age", "header_name" : "Ηλικιακή Κατηγορία"}]
    for (let i = 0; i<5; i++) { 
        let header = document.createElement("th");
        header.className = "table_header"; 
        let text = document.createTextNode(headers[i].header_name);
        header.appendChild(text);
        header.setAttribute("id", headers[i].header_id);
        header_row.append(header); 
    }
    table_field.appendChild(header_row);
    
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}


function fillTable(tournaments) { 
    tournaments.sort((a,b) => {return new Date(a.startdate) - new Date (b.startdate);})
    for (let tour of tournaments){
        let table_field = document.querySelector(".board");
        let row = document.createElement("tr"); 
        row.setAttribute("id", `row${tour.title}`);

        for (let i = 0; i<rowLength; i++) { 
            let cell = document.createElement("td"); 
            cell.setAttribute("id", i);
            tour.startdate = new Date(tour.startdate);
            tour.enddate = new Date(tour.enddate);
            console.log(tour.startdate.getYear());
            if (i==0) cell.appendChild(document.createTextNode(formatDate(tour.startdate)));
            if (i==1) cell.appendChild(document.createTextNode(formatDate(tour.enddate)));
            if (i==2) cell.appendChild(document.createTextNode(tour.title));
            if (i==3) cell.appendChild(document.createTextNode(tour.skilllevel));
            if (i==4) cell.appendChild(document.createTextNode(tour.agerestrictions));
            cell.contentEditable = true;
            row.append(cell);
        }
        table_field.append(row);
    }
}




let fetchAllTournaments = () => { 
    fetch('/tournaments/allTournaments')     //the fetched result is a list of strings
    .then(
        (response) => response.json()   //we turn the list of strings into a list of jason objects
        .then((json) => renderAllTournaments(json))
    )
}

let renderAllTournaments = (tournaments) => {
    for (let tour of tournaments){
        tour.startdate = new Date(tour.startdate);
        console.log(tour.startdate);}
    newMonthField(tournaments);
    fillTable(tournaments);
}

window.addEventListener('DOMContentLoaded', (event) => { 
    fetchAllTournaments();
    addTableInfo();
});


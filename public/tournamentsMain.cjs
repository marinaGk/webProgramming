const monthNums = {0: "Ιανουάριος", 1: "Φεβρουάριος", 2: "Μάρτιος", 3: "Απρίλιος", 4: "Μάιος", 5: "Ιούνιος", 6: "Ιούλιος", 7: "Αύγουστος", 8: "Σεπτέμβριος", 9: "Οκτώβριος", 10: "Νοέμβριος", 11: "Δεκέμβριος"}

let existing_months =[];
let mode;


function appendMonthsTournaments(tournaments) {
    for (let tour of tournaments){
        tour.startdate = new Date(tour.startdate);
        let tourMonth = tour.startdate.getMonth();
        let existing = false;

        for (month of existing_months){
            if (tourMonth === month){
                newTournamentField_NE(tour,tourMonth);
                existing = true;
            }
        }

        if (existing === true) continue;

        existing_months.push(tourMonth);

    let field = document.querySelector('.tournament_rows');

    let tourInfoRow = document.createElement('div');
    tourInfoRow.className = 'tournaments_info_row';

    tourInfoRow.setAttribute('id', `month${tourMonth}`);

    let monthRow = document.createElement("div"); 
    monthRow.className = "month_row"; 


    let month_title_field = document.createElement('div');
    month_title_field.className = 'month_title';
    let text_field = document.createElement('h4');
    text_field.contentEditable = 'True';
    month_title_field.appendChild(text_field);
    monthRow.append(month_title_field);
    tourInfoRow.appendChild(monthRow);

    field.appendChild(tourInfoRow);
    addMonthTitleDB(tourInfoRow.id, monthNums[tourMonth]);
    newTournamentField_NE(tour,tourMonth);

    }
}

function addMonthTitleDB(monthId, monthName) {

    let field = document.getElementById(monthId).querySelector('.month_row .month_title h4');

    let text = document.createTextNode(monthName);
    field.appendChild(text);

}

function newTournamentField_NE(tour, tourMonth) {

    tournament_row = createTournamentRow_NE(tour.tournamentid);
    let month = document.getElementById("month"+tourMonth);
    month.appendChild(tournament_row);
    addTournamentTitleDB(tournament_row.id, tour.title);
    addTournamentDetailsDB(tournament_row.id, tour.details);
}

function createTournamentRow_NE(tournamentid) { 

    //tournaments_counter +=1; 

    let row = document.createElement('div');
    row.className = 'tournament_row';
    //row.classList.add("current_tourn");

    let tournaments_list = document.getElementsByClassName('tournament_row');
    for (let i in tournaments_list)
        tournaments_list[i].id = 'tournament'+i;
    let tournaments_counter = tournaments_list.length;
    row.setAttribute('id', `tournament${tournamentid}`);

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

    row.appendChild(infoRow);

    return row
}

function addTournamentTitleDB(tourId, tourTitle) {

        let tournament = document.getElementById(tourId);
        tournament.querySelector('.info_row').setAttribute("id", tourTitle);
        let field = document.getElementById(tourTitle).querySelector('.tournament_description .tournament_title');
        let text = document.createTextNode(tourTitle);
        field.appendChild(text);
}

function addTournamentDetailsDB(tourId, tourDetails) { 

        let tournament = document.getElementById(tourId);
        let field = tournament.querySelector('.info_row .tournament_description .tournament_details');
        let text = document.createTextNode(tourDetails);
        if (tourDetails === null) text = document.createTextNode('Δεν υπάρχει περιγραφή... Για να ενημερωθείτε για το τουρνουά, επικοινωνήστε μαζί μας μέσω τηλεφώνου ή e-mail.');
        field.appendChild(text);

}

const rowLength = 5;

function addTableHeaders() { 
    
    //makes table's title (static)
    let table_field = document.querySelector(".board"); 
    let title = document.querySelector(".board #board_title");
    let board_headers = document.querySelectorAll("#board_headers th");

    let headers = [{"header_id": "start_date", "header_name" : "Ημερομηνία Έναρξης"},
                    {"header_id" : "end_date", "header_name" : "Ημερομηνία Λήξης"}, 
                    {"header_id" : "title", "header_name" : "Τίτλος Τουρνουά"},	
                    {"header_id" : "join_right", "header_name" : "Επίπεδο Ικανοτήτων"},
                    {"header_id" : "age", "header_name" : "Ηλικιακή Κατηγορία"}]
    for (let i = 0; i<5; i++) { 

        board_headers[i].className = "table_header";
        let text = document.createTextNode(headers[i].header_name);
        board_headers[i].appendChild(text);
        board_headers[i].setAttribute("id", headers[i].header_id);
 
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
    appendMonthsTournaments(tournaments);
}

window.addEventListener('DOMContentLoaded', (event) => { 
    fetchAllTournaments();
    addTableHeaders();
});



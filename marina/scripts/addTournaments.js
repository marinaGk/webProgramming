let monthBtn = document.querySelector('#add_month_button');
let tournBtn = document.querySelector('#add_tournament_button');

let months_list = document.getElementsByClassName('tournaments_info_row');
let months_counter = months_list.length;
let tournaments_list = document.getElementsByClassName('tournament_row');
let tournaments_counter = tournaments_list.length;

monthBtn.addEventListener('click', newMonthField);
tournBtn.addEventListener('click', newTournamentField);

function newMonthField() {
    months_counter +=1;

    let field = document.querySelector('.tournaments_info');

    let month_field = document.createElement('div');
    month_field.className = 'tournaments_info_row';
    month_field.setAttribute('id', `month${months_counter}`);

    let month_title_field = document.createElement('div');
    month_title_field.className = 'month_title';
    let text_field = document.createElement('h4');
    text_field.contentEditable = 'True';
    month_title_field.appendChild(text_field);
    month_field.appendChild(month_title_field);

    month_input = document.createElement('input');
    month_input.setAttribute('type', 'text');
    month_input.setAttribute('id', 'month_title');
    month_input.setAttribute('placeholder', 'Εισάγετε όνομα μήνα');
    month_field.appendChild(month_input);
    month_input.addEventListener('keypress', addMonthTitle);

    field.appendChild(month_field);
}

function addMonthTitle(event) {
    if (event.key == 'Enter') {
        let inputVar = month_input.value;
        month_input.remove();
        let field = document.querySelector('#month' + months_counter);
        field = field.querySelector('h4');
        let text = document.createTextNode(inputVar);
        field.appendChild(text)

    }
}

function newTournamentField() {
    let tournament_row = createTournamentRow()
    month = document.querySelector('#month' + months_counter);
    month.append(tournament_row);

    title_input = document.createElement('input');
    title_input.setAttribute('type', 'text');
    title_input.setAttribute('id', 'title')
    title_input.setAttribute('placeholder', 'Εισάγετε τίτλο τουρνουά');
    tournament_row.querySelector('.tournament_description').appendChild(title_input);
    title_input.addEventListener('keypress', addTournamentTitle);

    details_input = document.createElement('textarea');
    details_input.setAttribute('type', 'text');
    details_input.setAttribute('id', 'details');
    details_input.setAttribute('placeholder', 'Εισάγετε πληροφορίες τουρνουά');
    tournament_row.querySelector('.tournament_description').appendChild(details_input);
    details_input.addEventListener('keypress', addTournamentDetails);
}

function createTournamentRow() { 
    tournaments_counter +=1; 

    let row = document.createElement('div');
    row.className = 'tournament_row';
    row.setAttribute('id', `tournament${tournaments_counter}`);

    let description = document.createElement('span');
    description.className = 'tournament_description';
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

    row.appendChild(description);
    row.appendChild(poster);

    return row
}

function addTournamentTitle(event) {

    if (event.key=='Enter') { 
        let inputVar = title_input.value;
        title_input.remove();
        let field = document.querySelector('#tournament' + tournaments_counter);
        field = field.querySelector('.tournament_title');
        let text = document.createTextNode(inputVar);
        field.appendChild(text)
    }

}

function addTournamentDetails(event) { 
    if (event.key=='Enter') { 
        let inputVar = details_input.value;
        details_input.remove();
        let field = document.querySelector('#tournament' + tournaments_counter);
        field = field.querySelector('.tournament_details');
        let text = document.createTextNode(inputVar);
        field.appendChild(text)
    }
}

function loadPage(href) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', href, false);
    xmlhttp.send();
    return xmlhttp.responseText;
}

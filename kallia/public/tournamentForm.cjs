function selectedTournament () {
    let select = document.querySelector("select");
    let selection = select.id;
    let options = select.querySelectorAll("option");
    for (option of options){
        if (option.id === selection){
            option.selected = true;
        }
    }
}



// let fetchSelectedTournament = () => { 
//     fetch('/selectedTournament')     //the fetched result is a list of strings
//     .then(
//         (response) => response.json()   //we turn the list of strings into a list of jason objects
//         .then((json) => renderSelectedTournament(json))
//     )
// }

// let renderSelectedTournament = (tournament) => {
//     selectedTournament(tournament);
// }

window.addEventListener('DOMContentLoaded', (event) => { 
    selectedTournament();
});
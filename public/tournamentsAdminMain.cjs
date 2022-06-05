const buttons = document.querySelector(".buttons");

//add tournament button
let btn = document.createElement("div");
btn.className = "admin_button";
let addTournButton = document.createElement("button"); 
addTournButton.setAttribute("id", "addTournamentBtn"); 
addTournButton.appendChild(document.createTextNode("Προσθήκη τουρνουά"));
btn.appendChild(addTournButton);
buttons.appendChild(btn);


//delete tournament button
btn = document.createElement("div");
btn.className = "admin_button";
let deleteTournButton = document.createElement("button"); 
deleteTournButton.setAttribute("id", "deleteTournamentBtn"); 
deleteTournButton.appendChild(document.createTextNode("Διαγραφή τουρνουά"));
btn.appendChild(deleteTournButton);
buttons.appendChild(btn);


//delete month button
btn = document.createElement("div");
btn.className = "admin_button";
let deleteMonthButton = document.createElement("button"); 
deleteMonthButton.setAttribute("id", "deleteMonthBtn"); 
deleteMonthButton.appendChild(document.createTextNode("Διαγραφή μήνα"));
btn.appendChild(deleteMonthButton);
buttons.appendChild(btn);


//edit tournament button
btn = document.createElement("div");
btn.className = "admin_button";
let editTournButton = document.createElement("button"); 
editTournButton.setAttribute("id", "editTournamentSelectBtn"); 
editTournButton.appendChild(document.createTextNode("Επεξεργασία τουρνουά"));
btn.appendChild(editTournButton);
buttons.appendChild(btn);


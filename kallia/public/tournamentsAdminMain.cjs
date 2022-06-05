//ONE FOR APPENDING A TOURNAMENT
//ONE FOR DELETING A TOURNAMENT
//ONE FOR CHANGING A TOURNAMENT
//ONE FOR DELETING A MONTH



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


// function checkCompleted () {
//     let checkCompleted = document.querySelector(".check_completed");
//     if (checkCompleted.innerHTML === "false"){
//         alert("Τα στοιχεία που συμπληρώσατε δεν είναι εγκυρα!\nΕλέγξτε αν έχετε συμπληρώσει σωστά τα πεδία της φόρμας.\nΜην ξεχνάτε να συμπληρώσετε τα υποχρεωτικά πεδία.")
//         checkCompleted.innerHTML = "true";
//     }
// }



// window.addEventListener('DOMContentLoaded', (event) => { 
//     checkCompleted();
// });


// let rows = document.querySelectorAll(".month_row");
// console.log(rows);
// let delMonth = document.createElement("button");
// delMonth.id = 'delMonth';

// for (month of rows){
//     let monthName = month.querySelector('.month_row .month_title h4').innerHTML;
//     delMonth.innerHTML = 'Διαγραφή μήνα: '+monthName;
//     month.insertBefore(delMonth,month.querySelector('.tournament_row'));
// }

// initialize();

// function initialize() { 

//     let editBtn = document.createElement("div");
//     editBtn.className = "admin_button";
//     let edit = document.createElement("button");
//     edit.setAttribute("id", "edit_button"); 
//     edit.appendChild(document.createTextNode("Επεξεργασία"));
//     edit.addEventListener("click", editMode);
//     editBtn.appendChild(edit);
//     buttons.appendChild(editBtn);

// }


// //function that creates the buttons of the admin (Προσθήκη μήνα, Προσθήκη τουρνουά, Αποθήκευση)

// function editMode() { 

//     mode = 1;

//     let editBtn = document.querySelector(".admin_button");
//     editBtn.remove();
    

//     //new button for month title addition

//     // btn = document.createElement("div");
//     // btn.className = "admin_button";
//     // let addMonthButton  = document.createElement("button"); 
//     // addMonthButton.setAttribute("id", "add_month_button"); 
//     // addMonthButton.appendChild(document.createTextNode("Προσθήκη μήνα"));
//     // btn.appendChild(addMonthButton); 
//     // buttons.appendChild(btn);


//     //new button for tournament (title, description and poster addition)

//     btn = document.createElement("div");
//     btn.className = "admin_button";
//     let addTournButton = document.createElement("button"); 
//     addTournButton.setAttribute("id", "add_tournament_button"); 
//     addTournButton.appendChild(document.createTextNode("Προσθήκη τουρνουά"));
//     btn.appendChild(addTournButton);
//     buttons.appendChild(btn);


//     //new save button (onClick function is normalMode)
        
//     btn = document.createElement("div");
//     btn.className = "admin_button";
//     let saveButton = document.createElement("button"); 
//     saveButton.setAttribute("id", "save_button"); 
//     saveButton.appendChild(document.createTextNode("Αποθήκευση"));
//     btn.appendChild(saveButton); 
//     buttons.appendChild(btn);
//     saveButton.addEventListener("click", normalMode);
    

//     //function monthDel is added to all month title delete buttons

//     let delBtns = document.querySelectorAll(".delete_button.month");
//     for (let i = 0; i<delBtns.length; i++) { 

//         delBtns[i].addEventListener("click", monthDel);

//     }


//     //function tournamentDel is added to all tournament delete buttons

//     delBtns = document.querySelectorAll(".delete_button.tournament");
//     for (let i = 0; i<delBtns.length; i++) { 

//         delBtns[i].addEventListener("click", tournamentDel);

//     }

//     edit();
// }


// //normalMode deactivates all delete buttons

// function normalMode(){ 

//     mode = 0;

//     console.log("called");

//     buttons.innerHTML = "";

//     let delBtns = document.querySelectorAll(".delete_button.month");
//     console.log("month" + delBtns.length);
//     for (let i = 0; i<delBtns.length; i++) { 

//         delBtns[i].removeEventListener("click", monthDel);

//     }
//     delBtns = document.querySelectorAll(".delete_button.tournament");
//     console.log("tourn" + delBtns.length);
//     for (let i = 0; i<delBtns.length; i++) { 

//         delBtns[i].removeEventListener("click", tournamentDel);

//     }

//     initialize();
// }
window.onload = addTableInfo(); 

const rowLength = 5;

function addTableInfo() { 
    
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
                    {"header_id" : "join_right", "header_name" : "Δικαίωμα Συμμετοχής"},
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

function deleteTableEntry(id) { 

    let board = document.querySelector(".board");
    let rows = board.querySelectorAll("tr");

    for (i = 0; i<rows.length; i++) { 

        if (rows[i].id == "row" + id) { 
            rows[i].remove();
        }
    }
}
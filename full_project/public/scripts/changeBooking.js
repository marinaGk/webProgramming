let table = document.querySelector(".table"); 

function edit() { 

    let rows = table.querySelector(".data_row"); 
    for (i of rows) { 
        let cell = i.querySelector("td");
        cell.contentEditable = true;
    }

}
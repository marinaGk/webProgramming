let table = document.querySelector("#table");
table.style.tableLayout = "fixed";

let width = 14;
let height = 8;
makeTable();

let data_length = data.length;

const hours = document.querySelector("#hours");
let children = hours.children;
for (let i = 0; i<data_length; i++) { 
    let cell = children[i];
    let hour = data[i];
    let text = document.createTextNode(hour);
    cell.appendChild(text);
}

function makeTable() {

    for (let i = 0; i<height; i++) { 
        let row = document.createElement("tr");
        if (i == 0) { 
            row.id = "hours" 
        }
        else { 
            row.id = "data_row"
        }
        fillRow(row);
        table.appendChild(row);
    }

}

function fillRow(row) { 

    let cell = document.createElement("th");
    cell.style.width = "20%";
    for (let i = 0; i<width; i++) { 
        if (i != 0) { 
            cell = document.createElement("td");
            cell.style.colSpan = "1";
        }
        cell.id = i;
        row.appendChild(cell);
    }

}
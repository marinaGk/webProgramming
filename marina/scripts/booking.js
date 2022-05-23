let table = document.querySelector(".table");
table.style.tableLayout = "fixed";

let courtNum = 1;
const max = 13; 
const min = 1; 
const nextBtn = document.querySelector("#next"); 
nextBtn.addEventListener("click", nextButton);
const prevButton = document.querySelector("#previous");
prevButton.addEventListener("click", previousButton);

const data_length = availableHours.length;
const tableWidth = 14;
const tableHeight = 8;
makeTable();

function makeTable() {

    for (let i = 0; i<tableHeight; i++) { 
        let row = document.createElement("tr");
        if (i == 0) { 
            row.className = "hours";
        }
        else { 
            row.className = "data_row"
        }
        fillRow(row);
        table.appendChild(row);
    }
    fillHourRow();
    fillDayColumn();
    fillDataColumns();
}

function fillRow(row) { 

    let cell = document.createElement("th");
    cell.style.width = "20%";
    for (let i = 0; i<tableWidth; i++) { 
        if (i != 0) { 
            cell = document.createElement("td");
            cell.style.colSpan = "1";
        }
        cell.id = `cell${i}`;
        row.appendChild(cell);
    }

}

function fillHourRow() {

    const hours = document.querySelector(".hours");
    let children = hours.children;
    for (let i = 0; i < data_length; i++) {
        let cell = children[i];
        let hour = availableHours[i];
        let text = document.createTextNode(hour);
        cell.appendChild(text);
    }
    
}

function fillDayColumn() { 
    
    const days = document.querySelectorAll(".data_row #cell0");
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    let date = new Date();
    let cellDate = new Date();

    for (let i = 0; i<days.length; i++) { 
        cellDate.setDate(date.getDate() + i);
        let text = document.createTextNode(cellDate.toLocaleDateString('el-GR', options));
        days[i].append(text);
    }

}

function fillDataColumns() { 

    const dataRows = document.querySelectorAll(".data_row"); 
    const availableHoursCourt = availability[courtNum-1]; 

    for (let i = 0; i<dataRows.length; i++) { 
        let children = dataRows[i].children;
        let childrenAvailability = availableHoursCourt[i];

        for (let k = 1; k<children.length; k++) { 
            let cellAvailability = childrenAvailability[k-1];
            let text = document.createTextNode(cellAvailability);
            children[k].innerHTML = "";
            children[k].append(text);
        }

    }

}

function nextButton() { 
    if (courtNum == max) { 
        courtNum = min; 
    }
    else {
        courtNum++;
    } 
    fillDataColumns();
    setCounterField();
}

function previousButton () { 
    if (courtNum == min) { 
        courtNum = max; 
    }
    else {
        courtNum--;
    } 
    fillDataColumns();
    setCounterField();
}

function setCounterField() { 
    const field = document.querySelector("#current");
    field.innerHTML = "";
    let text = document.createTextNode(courtNum); 
    field.appendChild(text);
}
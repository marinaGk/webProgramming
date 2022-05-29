let table = document.querySelector(".table");
table.style.tableLayout = "fixed";

let courtNum = 1;
const max = 13;     //13 courts -> the last court has the max number
const min = 1;      //the first court has the min number
const nextBtn = document.querySelector("#next"); 
nextBtn.addEventListener("click", nextButton);
const prevButton = document.querySelector("#previous");
prevButton.addEventListener("click", previousButton);

const data_length = availableHours.length;
const tableWidth = 14;  //14 columns
const tableHeight = 8;  //8 rows
makeTable();


//creates table

function makeTable() {

    for (let i = 0; i<tableHeight; i++) { 
        let row = document.createElement("tr");
        if (i == 0) { 
            row.className = "hours";       //first row contains hours
        }
        else { 
            row.className = "data_row"      //the other rows contain data 
        }
        fillRow(row);
        table.appendChild(row);
    }
    fillHourRow();
    fillDayColumn();
    fillDataColumns();
}


//creates a table row

function fillRow(row) { 

    let cell = document.createElement("th");    //header column cells
    cell.style.width = "20%";
    for (let i = 0; i<tableWidth; i++) { 
        if (i != 0) {                               //header column
            cell = document.createElement("td");    //data cells
            cell.style.colSpan = "1";
        }
        cell.id = `cell${i}`;
        row.appendChild(cell);
    }

}


//creates the header row with the hours

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


//creates the header column with the days (sets each day of the current week, starting from the current day)

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


//availability array contains other arrays
//each one of these arrays corresponds to each court and contains the availability for each day-hour cell

function fillDataColumns() { 

    const dataRows = document.querySelectorAll(".data_row");    //all rows of table in an array
    const availableHoursCourt = availability[courtNum-1];       //all available hours for current court in an array (array of smaller arrays - each smaller array corresponds to a row of availability statistics)

    for (let i = 0; i<dataRows.length; i++) { 
        let children = dataRows[i].children;    //all cells of row i
        let childrenAvailability = availableHoursCourt[i];  //all availability statistics of a row i


        //adds availability to each cell of a data row
        
        for (let k = 1; k<children.length; k++) { 
            let cellAvailability = childrenAvailability[k-1];
            children[k].innerHTML = "";
            let childrenBtn = document.createElement("button");
            children[k].appendChild(childrenBtn);
            let text;
            if (cellAvailability){
                text = document.createTextNode('\u2713');
                childrenBtn.style.color = "#00cc00";
                childrenBtn.addEventListener("click", availableCourt);}
            else{
                text = document.createTextNode('\u2715');
                childrenBtn.style.color = "#f73100";
                childrenBtn.addEventListener("click", notAvailableCourt);}
            childrenBtn.append(text);
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


//sets the number of the court that will be displayed

function setCounterField() { 
    const field = document.querySelector("#current");
    field.innerHTML = "";
    let text = document.createTextNode(courtNum); 
    field.appendChild(text);
}
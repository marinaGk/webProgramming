let table = document.querySelector(".table");

const tableWidth = 14;
const tableHeight = 8;

function book() { 
    alert("Hello world");
}

function fillHourRow(hourslots) {

    const data_length = hourslots.length;
    const hours = document.querySelector(".hours");
    let children = hours.children;

    for (let i = 0; i<data_length; i++) {

        let cell = children[i+1];
        let hour = hourslots[i].tablehour;
        hour = hour.substr(0, 5);
        let text = document.createTextNode(hour);
        let p = document.createElement('p'); 
        p.appendChild(text);
        cell.appendChild(p);
    }
    
}

function fillDataColumns(timeslots) { 

    const data = document.querySelectorAll(".data_row td"); 

    for (let i = 0; data.length; i++) { 
        let availability = timeslots[i].availability;
        if (availability == true) { 
            data[i].innerHTML = "&#10003;";

        }
        else if (availability == false) { 
            let text = document.createTextNode("no");
            data[i].innerHTML = "&#88;";
            data[i].style.backgroundColor = 'rgba(0, 0, 0, 0.25)';
        }
    }

}

function fillDayColumn() { 

    const month_cell = document.querySelector(".hours #cell0"); 
    let text = document.createTextNode("Για την επόμενη εβδομάδα");
    month_cell.append(text);
    
    const days = document.querySelectorAll(".data_row #cell0");
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    let cellDate = new Date();

    for (let i = 0; i<days.length; i++) { 
        cellDate.setDate(new Date().getDate() + i);
        console.log(cellDate);
        let text = document.createTextNode(cellDate.toLocaleDateString('el-GR', options));
        days[i].append(text);
    }

}

let fillRow = (row) => { 

    let cell = document.createElement("th");

    cell.style.width = "20%";

    for (let i = 0; i<tableWidth; i++) { 
        if (i != 0) { 
            cell = document.createElement("td");
            cell.addEventListener("click", book);
            cell.style.colSpan = "1";
        }
        cell.id = `cell${i}`;

        row.appendChild(cell);
    }

}

let makeTable = () => {

    for (let i = 0; i<tableHeight; i++) { 
        let row = document.createElement("tr");
        console.log(typeof(row));
        if (i == 0) { 
            row.className = "hours";
        }
        else { 
            row.className = "data_row"
        }
        fillRow(row);
        table.appendChild(row);
    }
    //fillHourRow();
    fillDayColumn();
    //fillDataColumns();
}

//don't mess with those

let renderTimeslots = (timeslots) => { 
    fillDataColumns(timeslots);
}

let renderTablehours = (hourslots) => { 
    fillHourRow(hourslots);
}

let fetchTimeslots = () => { 
    fetch('/booking/courts')
    .then(
        (response) => response.json()
        .then((json) => renderTimeslots(json))
    )
}

let fetchTablehours = () => { 
    fetch('/booking/hours')
    .then(
        (response) => response.json()
        .then((json) => renderTablehours(json))
    )
}

window.addEventListener('DOMContentLoaded', (event) => { 
    makeTable();
    fetchTimeslots();
    fetchTablehours();
});


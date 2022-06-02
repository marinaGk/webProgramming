//model file for how to change database data every day to fix dates on table 
//should be completed before rendering booking table

const { increment } = require("./controller/bookingController.cjs");

let today = new Date(); //works at 12:00 AM - find way to force that

//fetch dates from db : if D_1 date is yesterday, proceed

for (let i = 0; i<4; i++) { 
    //calls model function to fetch timeslots for each court
    changeDate(i, jsonslots);
}

for (let i = 0; i<4; i++) { 
    //calls model function to fetch reservations for each court
    changeReservations(i, jsonreservations)
}

function changeDate(court, timeslots) { 
    //timeslots contains this court's timeslots 
    //changes timeslots for each court to new ones deleting yesterday's timeslots 
    increment = court * 91;
    for (i = 0; i<7; i++) { 
        date = today + i; //works per one day, sets first date to today etc 
        dateid = `D_${i + 1}`; //dateids start from D_1
        query1: 
        "update tabledates set tabledate = date where tabledateid = dateid"

        if (i!=6){ //for timeslots of day
            for (let k = 0; k<13; k++){ //each of 13 timeslots

                current_slot = "TS_" + (k+(i*13)+increment); //say slot 12: 12 + 0 * 13
                new_availability = json[((i+1)*13)+k].availability; //say slot 12: 1 * 13 + 12 = 25
                query2: 
                "update timeslot set availability = new_availability where timeslotid = current_slot and courtid = court"
            }
        }
        if (i==6){ 
            for (let k = 0; k<13; k++){ 
                current_slot = "TS_" + (k+(i*13)+increment);
                query3:
                "update timeslot set availability = 'true' where timeslotid = current_slot and courtid = court"
            }
        }
    }
}

function changeReservations(court, jsonreservations) { 
    //changes reservations' timeslots to new ones
    increment = court * 91;

    for (let reservation of jsonreservations) { 

        current_slot = reservation.timeslotid;

        //take number from reservation timeslotid
        number = number - increment;
        if (number<14) { 
            query4: 
            "delete from reservation where timeslotid = current_slot"
        }
        else {
            number = number - 13;
            new_slot = `TS_${number}`
            query5: 
            "update reservation set timeslot = new_slot where timeslotid = current_id"
        }  
    }
}
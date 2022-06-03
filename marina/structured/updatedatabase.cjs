//model file for how to change database data every day to fix dates on table 
//should be completed before rendering booking table
let model = require("./model/model_pg.cjs");

let today = new Date().toISOString().slice(0,10); //works at 12:00 AM - find way to force that

//fetch dates from db : if D_1 date is yesterday, proceed
//in model

function update() { 
    fetchDays();
}

//changes dates every day
function fetchDays() { 
    model.getTabledays(function(err, rows) { 
        if (rows[0].tabledate!=today) { 
            console.log("changing booking database")
            let datetime = new Date();
            //changes days
            for (i = 0; i<7; i++) { 

                datetime.setDate(new Date().getDate() + i);
                date = datetime.toISOString().slice(0,10);
                console.log(date);
                dateid = `TD_${i + 1}`; //dateids start from TD_1

                model.changeDate(date, dateid, function(err, state){
                    if(err){ 
                        console.log(err)
                    } 
                    else{ 
                        console.log(state);
                    } 
                })
            }
            for (let i=0; i<4; i++){ 
                changeReservations(i);        
            }   
        }
        else{ 
            console.log("all set");
        }
    })
         
}

function changeReservations(court) { 
    //changes reservations' timeslots to new ones
    let increment = court * 91;
    let courtid = "C_"+(court+1);
    model.getReservations(courtid, function(err, reservations){ 
        
        if(err){ 
            console.log(err)
        }
        else{ 
            for (let reservation of reservations) { 

                current_slot = reservation.timeslotid;
                
                //take number from reservation timeslotid
                let substr = current_slot.split("_");
                let number = substr[1];
                number = parseInt(number);
                number = number - increment;

                if (number<14) { 
                    model.deleteReservation(current_slot, function(err, state){ 
                        if(err){ 
                            console.log(err); 
                        }
                        else{ 
                            console.log(state);
                        }
                    })
                }
                else {
                    number = number - 13;
                    new_slot = `TS_${number+increment}`
                    model.updateReservation(current_slot, new_slot, function(err, state) { 
                        if(err){ 
                            console.log(err);
                        }
                        else{ 
                            console.log(state);
                        }
                    })
                }  
            }    
        }

    })
    
}

exports.update = update;
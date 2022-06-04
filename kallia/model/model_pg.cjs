'use strict';
const sql = require('./db.pg.js');

//needs to be called with courts global variable

//for specific court: returns rows for each timeslot, where each row contains -> the timeslot id, the availability of the timeslot, the date of the timeslot and the hour of the timeslot
let getTimeslots = (court, callback) => {
    let courtId = `C_${court}`;
    const query = { 
        text: 
        `SELECT timeslotid, availability, tabledate, tablehour 
        FROM timeslot 
        JOIN tabledates ON tabledateid = dayid 
        JOIN tabletimes on tabletimeid = timeid 
        WHERE courtid = '${courtId}' 
        ORDER BY tabledate, tablehour;`
    }

    sql.query(query, (err, timeslots) => { 
        if(err) { 
            callback(err.stack);
        }
        else { 
            callback(null, timeslots.rows)  //returns results as rows
        }
    })

}

//returns rows for each hour of the table, where each row contains -> th id of the hour and the hour value
let getTablehours = (callback) => { 

    const query = { 
        text: 
        `select tablehour from tabletimes ORDER BY tablehour;`
    }

    sql.query(query, (err, tablehours) => { 
        if(err) { 
            callback(err.stack);
        }
        else { 
            callback(null, tablehours.rows)
        }
    })
}

//for a specific timeslot: updates a timeslot-> sets true availability to the timeslot with the given id
let changeSlotAvailability = (timeslotid, callback) => { 

    const query = { 
        text: 
        `UPDATE timeslot
        SET availability = true 
        WHERE timeslotid = '${timeslotid}'`
    }

    sql.query(query, (err, timeslots) => { 
        if(err) { 
            callback(err.stack);
        }
        else { 
            callback(null, true)
        }
    })
}


//TOURNAMENTS

//returns rows for each tournament, where each row contains -> the tournament id, the title, the sart and end date, the skill level and the age restrictions of the tournament
let getTournaments = (callback) => {
    const query = { 
        text: 
        `select tournamentid, title, startdate, enddate, skilllevel, agerestrictions, details, encode(poster::bytea,'base64') as poster from tournament ORDER BY tournamentid;`
    }


    sql.query(query, (err, tournaments) => { 
        if(err) { 
            callback(err.stack);
        }
        else { 
            callback(null, tournaments.rows)  //returns results as rows
        }
    })

}




module.exports = {getTimeslots, getTablehours, changeSlotAvailability, getTournaments};
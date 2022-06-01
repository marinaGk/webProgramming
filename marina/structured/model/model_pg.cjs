'use strict';
const sql = require('./db.pg.js');

//needs to be called with courts global variable
let getTimeslots = (court, callback) => {
    let courtId = `C_${court}`;
    const query = { 
        text: 
        `select timeslotid, availability, tabledate, tablehour from timeslot JOIN tabledates ON tabledateid = dayid 
        JOIN tabletimes on tabletimeid = timeid WHERE courtid = '${courtId}' ORDER BY tabledate, tablehour;`
    }

    sql.query(query, (err, timeslots) => { 
        if(err) { 
            callback(err.stack);
        }
        else { 
            callback(null, timeslots.rows)
        }
    })

}

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

module.exports = {getTimeslots, getTablehours};
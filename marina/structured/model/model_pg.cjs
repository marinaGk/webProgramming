'use strict';
const sql = require('./db.pg.js');

//needs to be called with courts global variable
let getTimeslots = (court, callback) => {

    let scheduleId = `SC_${court}`;

    const query = { 
        text: `SELECT * FROM timeslot1 WHERE scheduleid = '${scheduleId}'`
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

module.exports = {getTimeslots};
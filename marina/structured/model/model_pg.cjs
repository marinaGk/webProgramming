'use strict';
const sql = require('./db.pg.js');

//needs to be called with courts global variable
let getTimeslots = (court, callback) => {

    let courtId = `SC_${court}`;
    
    const query = { 
        text: `SELECT * FROM timeslot1 WHERE scheduleid = '${courtId}'`
        //values: [courtId], 
    }
    console.log(query.text);
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
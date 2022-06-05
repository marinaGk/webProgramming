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
        `select tournamentid, title, startdate, enddate, skilllevel, agerestrictions, details, encode(poster::bytea,'base64') as poster from tournament ORDER BY startdate;`
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


let getTournamentById = (tournamentId, callback) => {
    const query = { 
        text: 
        `select * from tournament where tournamentid = '${tournamentId}';`
    }


    sql.query(query, (err, tournament) => { 
        if(err) { 
            callback(err.stack);
        }
        else { 
            callback(null, tournament.rows)  //returns results as rows
        }
    })

}

let getTournamentsNumber = (callback) => {
    const query = { 
        text: 
        `select count(*) from tournament;`
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

let addTournament = (newTournament, callback) => {
    if (newTournament.skilllevel == '') newTournament.skilllevel = null;
    if (newTournament.agerestrictions == '') newTournament.agerestrictions = null;
    if (newTournament.poster == '') {
        newTournament.poster = null;
        const query = { 
            text: 
            `insert into tournament (tournamentid, title, startdate, enddate, skilllevel, agerestrictions, details, poster)
            values ('${newTournament.tournamentid}','${newTournament.title}', '${newTournament.startdate}', '${newTournament.enddate}', ${newTournament.skilllevel}, ${newTournament.agerestrictions}, '${newTournament.details}', null);`
        }
        sql.query(query, (err, res) => { 
            if(err) { 
                callback(err.stack);
            }
            else { 
                callback(null, res.rows)  //returns results as rows
            }
        })}
    else    {
        const query = { 
            text: 
            `insert into tournament (tournamentid, title, startdate, enddate, skilllevel, agerestrictions, details, poster)
            values ('${newTournament.tournamentid}','${newTournament.title}', '${newTournament.startdate}', '${newTournament.enddate}', ${newTournament.skilllevel}, ${newTournament.agerestrictions}, '${newTournament.details}', ${newTournament.poster});`
        }
        sql.query(query, (err, res) => { 
            if(err) { 
                callback(err.stack);
            }
            else { 
                callback(null, res.rows)  //returns results as rows
            }
        })}

}
    // sql.query(query, (err, tournaments) => { 
    //     if(err) { 
    //         callback(err.stack);
    //     }
    //     else { 
    //         callback(null, tournaments.rows)  //returns results as rows
    //     }
    // })


let deleteTournament = (tournamentid, callback) => {
    const query = { 
        text: 
        `delete from tournament where tournamentid = '${tournamentid}';`
    }


    sql.query(query, (err, res) => { 
        if(err) { 
            callback(err.stack);
        }
        else { 
            callback(null, res.rows)  //returns results as rows
        }
    })

}


let getMonths = (callback) => {
    const query = { 
        text: 
        `select distinct monthname from 
        (select distinct startdate, TO_CHAR(DATE(startdate), 'Month') as monthname FROM tournament order by startdate) as orderedmonths;`
    }


    sql.query(query, (err, res) => { 
        if(err) { 
            callback(err.stack);
        }
        else { 
            callback(null, res.rows)  //returns results as rows
        }
    })

}


let deleteMonth = (monthid, callback) => {
    const query = { 
        text: 
        `delete from tournament where translate(TO_CHAR(DATE(startdate), 'Month'), ' ', '') in ('${monthid}');`
    }


    sql.query(query, (err, res) => { 
        if(err) { 
            callback(err.stack);
        }
        else { 
            callback(null, res.rows)  //returns results as rows
        }
    })

}


let updateTournament = (newTournament, callback) => {
    if (newTournament.skilllevel == '') newTournament.skilllevel = null;
    if (newTournament.agerestrictions == '') newTournament.agerestrictions = null;
    if (newTournament.poster == '') {
        newTournament.poster = null;
        const query = { 
            text: 
            `update tournament
             set title = '${newTournament.title}', startdate = '${newTournament.startdate}', enddate = '${newTournament.enddate}', skilllevel = ${newTournament.skilllevel}, agerestrictions = ${newTournament.agerestrictions}, details = '${newTournament.details}', poster = null
             where tournamentid = '${newTournament.tournamentid}';`
        }
        sql.query(query, (err, res) => { 
            if(err) { 
                callback(err.stack);
            }
            else { 
                callback(null, res.rows)  //returns results as rows
            }
        })}
    else    {
        const query = { 
            text:
            `update tournament
             set title = '${newTournament.title}', startdate = '${newTournament.startdate}', enddate = '${newTournament.enddate}', skilllevel = ${newTournament.skilllevel}, agerestrictions = ${newTournament.agerestrictions}, details = '${newTournament.details}', poster = pg_read_binary_file('\\Users\\Public\\${newTournament.poster}')
             where tournamentid = '${newTournament.tournamentid}';`
        }
        sql.query(query, (err, res) => { 
            if(err) { 
                callback(err.stack);
            }
            else { 
                callback(null, res.rows)  //returns results as rows
            }
        })}

}


let joinTournament= (participantid, tournamentid, callback) => {
    const query = { 
        text: 
        `insert into joins(participantid, tournamentid)
         VALUES (${participantid}, '${tournamentid}');`
    }


    sql.query(query, (err, res) => { 
        if(err) { 
            callback(err.stack);
        }
        else { 
            callback(null, res.rows)  //returns results as rows
        }
    })

}

let getUserTournaments = (participantid, callback) => {
    const query = { 
        text: 
        `select distinct * 
        from joins join tournament on joins.tournamentid = tournament.tournamentid
        where joins.participantid = '${participantid}';`
    }


    sql.query(query, (err, res) => { 
        if(err) { 
            callback(err.stack);
        }
        else { 
            callback(null, res.rows)  //returns results as rows
        }
    })

}



module.exports = {getTimeslots, getTablehours, changeSlotAvailability, getTournaments, getTournamentsNumber, addTournament, deleteTournament, getMonths, deleteMonth, getTournamentById, updateTournament, joinTournament, getUserTournaments};
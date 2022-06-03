'use strict';
const sql = require('./db.pg.js');
const bcrypt = require('bcrypt');

//needs to be called with courts global variable
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
            callback(null, timeslots.rows)
        }
    })

}

let getTablehours = (callback) => { 

    const query = { 
        text: 
        `SELECT tablehour FROM tabletimes ORDER BY tablehour;`
    }

    sql.query(query, (err, tablehours) => { 
        if(err) { 
            callback(err.stack);
        }
        else { 
            callback(null, tablehours.rows);
        }
    })
}

let changeSlotAvailability = (timeslotid, callback) => { 

    const query = { 
        text: 
        `UPDATE timeslot
        SET availability = true 
        WHERE timeslotid = '${timeslotid}'`
    }

    sql.query(query, (err) => { 
        if(err) { 
            callback(err.stack);
        }
        else { 
            callback(null, true)
        }
    })
}

let bookSlot = (userid, timeslotid, callback) => { 
    
    const query = { 
        text: 
        `INSERT INTO reservation(timeslotid, reserveeid)
        VALUES ($2, $1)`,
        values: [userid, timeslotid]
    }

    sql.query(query, (err) => { 
        if(err) { 
            callback(err.stack);
        }
        else { 
            callback(null, true);
        }
    })

}

let getUserByUsername = (username, callback) => { 

    const query = { 
        text: 
        `SELECT * FROM account WHERE accountname = $1`, 
        values: [username],
    }

    sql.query(query, (err, user) => { 

        if(err) { 
            console.log(err.stack)
            callback(err.stack)
        }
        else { 
            callback(null, user.rows[0])
        }

    });

}

let registerUser = (username, password, email, fullname, callback) => { 

    getUserByUsername(username, async(err, userIdbyUsername) => { 

        if(userIdbyUsername != undefined) { 
            callback(null, null, {message : "Υπάρχει ήδη χρήστης με αυτό το όνομα"})
        }
        else { 
            try{ 
                const hashedPassword = await bcrypt.hash(password, 10);

                const query = { 
                    text: 
                    `INSERT INTO account(AccountName, AccountPassword, Email, FullName, AdminRights) 
                    VALUES ($1, $2, $3, $4,'false') RETURNING accountid`,
                    values: [username, hashedPassword, email, fullname]
                }

                sql.query(query, (err, result) => {
                    if (err)
                        callback(err.stack, null);
                    else {
                        callback(null, result.rows[0].accountid)
                    }
                })
            }   
            catch { 
                console.log(err)
                callback(err)
            }
        }
    })
}

let getTabledays = (callback) => { 

    const query = { 
        text: 
        `SELECT CAST (tabledate AS text) FROM tabledates ORDER BY tabledate`
    }

    sql.query(query, (err, tabledates) => { 
        if(err) { 
            callback(err.stack);
        }
        else { 
            callback(null, tabledates.rows);
        }
    })

}

let changeDate = (date, dateid, callback) => { 
    
    const query = { 
        text: 
        `UPDATE tabledates SET tabledate = $1 WHERE tabledateid = $2`, 
        values: [date, dateid],
    }

    sql.query(query, (err) => { 
        if(err) { 
            console.log(err);
            callback(err.stack);
        }
        else { 
            callback(null, true);
        }
    })
}

let getReservations = (courtid, callback) => { 

    const query = { 
        text: 
        `SELECT reservation.timeslotid 
        FROM reservation 
        JOIN timeslot 
        ON reservation.timeslotid = timeslot.timeslotid AND timeslot.courtid = $1`, 
        values: [courtid],
    }

    sql.query(query, function(err, reservations){ 
        if(err) {
            console.log(err);
            callback(err.stack);
        }
        else{
            callback(null, reservations.rows);
        }
    })

}

let deleteReservation = (slot, callback) => { 

    const query = { 
        text: 
        `DELETE FROM reservation WHERE timeslotid = $1`, 
        values: [slot],
    }

    sql.query(query, (err, state) => { 
        if(err){ 
            callback(err.stack)
        }
        else{ 
            callback(null, true);
        }
    })

}

let updateReservation = (slot, new_slot, callback) => { 

    const query = { 
        text: 
        `UPDATE reservation SET timeslotid = $1 WHERE timeslotid = $2;`,
        values: [new_slot, slot],
    }

    sql.query(query, (err, state) => { 
        if(err){ 
            callback(err.stack);
        }
        else{ 
            callback(null, true);
        }
    })

}

module.exports = {getTimeslots, getTablehours, changeSlotAvailability, getUserByUsername, registerUser, bookSlot, getTabledays, changeDate, getReservations, deleteReservation, updateReservation};
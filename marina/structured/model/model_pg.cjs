'use strict';
const sql = require('./db.pg.js');
const bcrypt = require('bcrypt');

//used by logincontroller
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

//used by booking controller
let getTablehours = (callback) => { 

    const query = { 
        text: 
        `SELECT tablehour FROM tabletimes ORDER BY tabletimeid;`
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

let bookSlot = (userid, date, time, courtid, callback) => { 
    
    const query = { 
        text: 
        `INSERT INTO reservation(reservationdate, reservationtime, reserveeid, courtid)
        VALUES ($2, $3, $1, $4)`,
        values: [userid, date, time, courtid]
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

let deleteReservation = (date, time, courtid, callback) => { 

    const query = { 
        text: 
        `DELETE 
        FROM reservation 
        WHERE reservationdate = $1 AND reservationtime = $2 AND courtid = $3`, 
        values: [date, time, courtid],
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

let courtReservations = (courtid, callback) => { 
    
    const query = { 
        text: 
        `SELECT * 
        FROM reservation 
        WHERE courtid = $1`, 
        values: [courtid],
    }

    sql.query(query, function(err, reservations){ 
        if(err) { 
            callback(err.stack)
        }
        else{ 
            callback(null, reservations.rows)
        }
    })

}

module.exports = {getUserByUsername, registerUser, getTablehours, bookSlot, deleteReservation, courtReservations};
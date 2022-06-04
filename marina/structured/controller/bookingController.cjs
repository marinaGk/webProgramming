const dotenv = require('dotenv');
dotenv.config();

let model = require('../model/model_pg.cjs');

const max = 4; 
const min = 1;
let courtVariable = min;
let accountReservations = [];

function increment(req, res) { 
    if (courtVariable == max){ 
        courtVariable = max;
    }
    else{ 
        courtVariable++;
    }
    res.redirect('/booking');
}

function decrement(req, res) { 
    if(courtVariable == min) { 
        courtVariable = min;
    }
    else { 
        courtVariable--;
    }
    res.redirect('/booking');
}

function tablehours(req, res) { 
    model.getTablehours(function(err, rows) { 
        if(err) { 
            res.send(err);
        }
        else { 
            res.send(rows);
        }
    });
}

function changeBooking(req, res, next) { 
    let courtid = `C_${courtVariable}`;
    let date = req.params.datetime.substring(0, 10);
    let time = req.params.datetime.substring(10);
    model.deleteReservation(date, time, courtid, function(err, rows) { 
        if (err) { 
            res.send(err);
        }
        else { 
            next();
            /*model.courtReservations(courtid, function (err, rows) { 
                if (err) { 
                    res.send(err);
                }
                else { 
                    res.send(rows);
                }
            });*/
        }
    })
}

function makeBooking(req, res, next) {
    let courtid = `C_${courtVariable}`;
    let date = req.params.datetime.substring(0, 10);
    let time = req.params.datetime.substring(10);
    model.bookSlot(req.session.loggedUserId, date, time, courtid, function(err, result) { 
        if(err) { 
            res.send(err);
        }
        else{ 
            accountReservations.push(result.rows[0]);
            console.log(result.rows[0])
            console.log(accountReservations)
            next();
        }
    })
}

function getCurrentCourt(req, res) { 
    res.send(`${courtVariable}`);
}

function getReservations(req, res) { 
    let courtId = `C_${courtVariable}`;
    model.courtReservations(courtId, (err, rows) => {
        if(err) { 
            res.send(err);
        }
        else {
            res.send(rows);
        }
    });
}

function getAccountReservations(req, res) { 
    model.accountReservations(req.session.loggedUserId, (err, rows) => { 
        if(err) { 
            res.send(err); 
        }
        else {
            for (let i of rows) { 
                accountReservations.push(i);
            } 
        }
    })
}

function renderBookingAdmin(req, res) { 
    let scripts = [{script: '/scripts/confirm_form_popup.js'}];
    res.render('bookingAdmin', {layout: 'signed.hbs', title: "Villia Tennis Club | Booking", style: "/booking.css", courtVariable: courtVariable, scripts: scripts, reservations: accountReservations});
}

function renderBooking(req, res) { 
    let scripts = [];
    res.render('booking', {layout: 'signed.hbs', title: "Villia Tennis Club | Booking", style: "/booking.css", courtVariable: courtVariable, scripts: scripts, reservations: accountReservations});
}

function renderChoice(req, res) { 
    if(req.session.adminRights) { 
        renderBookingAdmin(req, res);
    }
    else{ 
        renderBooking(req, res);
    }
}

exports.increment = increment;
exports.decrement = decrement;
exports.tablehours = tablehours;
exports.renderBookingAdmin = renderBookingAdmin;
exports.changeBooking = changeBooking;
exports.makeBooking = makeBooking;
exports.getCurrentCourt = getCurrentCourt;
exports.getReservations = getReservations;
exports.renderChoice = renderChoice;
exports.getAccountReservations = getAccountReservations;
exports.accountReservations = accountReservations;
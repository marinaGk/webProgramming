const dotenv = require('dotenv');
dotenv.config();

let model = require('../model/model_pg.cjs');

const max = 4; 
const min = 1;
let courtVariable = min;    //first court is court 1


//increases the value of the court variable by 1
function increment(req, res) { 
    if (courtVariable == max){ 
        courtVariable = max;
    }
    else{ 
        courtVariable++;
    }
    res.redirect('/booking');
    renderBooking(req, res);
}

//decreases the value of the court variable by 1
function decrement(req, res) { 
    if(courtVariable == min) { 
        courtVariable = min;
    }
    else { 
        courtVariable--;
    }
    res.redirect('/booking');
    renderBooking(req, res);
}

//for the current court: sends the info for each timeslot (timeslot id, availability, date, hour)
//info sent as strings
function timeslots(req, res) {
    model.getTimeslots(courtVariable, function (err, rows) { 
        if (err) { 
            res.send(err);
        }
        else { 
            res.send(rows);
        }
    });
}

//sends the info of each hour (hour id, hour value)
//info sent as strings
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

//goes to bookingAdmin page
function renderBookingAdmin(req, res) { 
    let scripts = [{script: '/scripts/confirm_form_popup.js'}];
    res.render('bookingAdmin', {title: "Villia Tennis Club | Booking", style: "/booking.css", courtVariable: courtVariable, scripts: scripts});
}

//goes to booking page
function renderBooking(req, res) { 
    let scripts = [];
    res.render('booking', {title: "Villia Tennis Club | Booking", style: "/booking.css", courtVariable: courtVariable, scripts: scripts});
}

function changeBooking(req, res) { 
    model.changeSlotAvailability(req.params.TimeSlotID, function(err, rows) { 
        if (err) { 
            res.send(err);
        }
        else { 
            model.getTimeslots(courtVariable, function (err, rows) { 
                if (err) { 
                    res.send(err);
                }
                else { 
                    res.send(rows);
                }
            });
        }
    })
}

exports.timeslots = timeslots;
exports.renderBooking = renderBooking;
exports.increment = increment;
exports.decrement = decrement;
exports.tablehours = tablehours;
exports.renderBookingAdmin = renderBookingAdmin;
exports.changeBooking = changeBooking;
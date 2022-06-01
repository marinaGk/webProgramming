const dotenv = require('dotenv');
dotenv.config();

let model = require('../model/model_pg.cjs');

const max = 4; 
const min = 1;
let courtVariable = min;


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

function renderBooking(req, res) { 
    let scripts = [{script: '/scripts/confirm_form_popup.js'}];
    //let scripts = [];
    //res.render('booking', {title: "Villia Tennis Club | Booking", style: "/booking.css", courtVariable: courtVariable, scripts: scripts});
    res.render('bookingAdmin', {title: "Villia Tennis Club | Booking", style: "/booking.css", courtVariable: courtVariable, scripts: scripts});
}

exports.timeslots = timeslots;
exports.renderBooking = renderBooking;
exports.increment = increment;
exports.decrement = decrement;
exports.tablehours = tablehours;

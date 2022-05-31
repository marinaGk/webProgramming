const dotenv = require('dotenv');
dotenv.config();

let model = require('../model/model_pg.cjs');
let counter = 1;
//here I need to add the current court global variable somehow 
//first time calling it should be 1 by default
function timeslots(req, res) {
    let courtVariable = 1;
    counter++;
    console.log(counter);
    model.getTimeslots(courtVariable, function (err, rows) { 
        if (err) { 
            res.send(err);
        }
        else { 
            res.send(rows);
        }
    });
}

function render(req, res) { 
    let scripts = [];
    res.render('booking', {title: "Villia Tennis Club | Booking", style: "booking.css", scripts: scripts});
}

module.exports = {timeslots, render};

const dotenv = require('dotenv');
dotenv.config();

let model = require('../model/model_pg.cjs');

function renderTournament(req, res) { 
    let scripts = []; 
    model.getTournaments(function(err, tournaments) { 
        if(err) { 
            res.send(err);
        }
        else {
            res.render('tournaments', {title: "Villia Tennis Club | Tournaments", style: "tournaments.css", tournaments: tournaments , scripts: scripts});
        }
    });
}

function renderTournamentForm(req, res) { 
    let scripts = [];
    model.getTournaments(function(err, tournaments) { 
        if(err) { 
            res.send(err);
        }
        else {
            res.render('tournamentForm', {title: "Villia Tennis Club | Join A Tournament", style: "booking.css", tournaments: tournaments , scripts: scripts});
        }
    });
}

function allTournaments(req,res) {
    model.getTournaments(function(err, rows) { 
        if(err) { 
            res.send(err);
        }
        else {
            res.send(rows);
        }
    });
}


function addTournamentToForm (req,res) {
    let scripts = [];

    model.getTournaments(function(err, tournaments) { 
        if(err) { 
            res.send(err);
        }
        else {
            res.render('tournamentForm', {title: "Villia Tennis Club | Tournaments", style: "booking.css", tournaments: tournaments , selectedTournament: req.query.tournamentid, scripts: scripts});
        }
    });
}

    // model.getTournamentId(req.query.tournamentid, function(err, rows) {   //returns a tournament object with the specific id
    //     if(err) { 
    //         res.send(err);
    //     }
    //     else {
    //         //res.send(rows);
    //         res.render('tournamentForm', {title: "Villia Tennis Club | Join A Tournament", style: "booking.css" , scripts: scripts});
    //     }
    // });


exports.renderTournament = renderTournament;
exports.renderTournamentForm = renderTournamentForm;
exports.allTournaments = allTournaments;
exports.addTournamentToForm = addTournamentToForm;
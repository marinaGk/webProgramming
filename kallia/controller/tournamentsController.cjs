const dotenv = require('dotenv');
dotenv.config();

let model = require('../model/model_pg.cjs');

function renderTournament(req, res) { 
    let scripts = []; 
    res.render('tournaments', {title: "Villia Tennis Club | Tournaments", style: "tournaments.css", scripts: scripts});
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

exports.renderTournament = renderTournament;
exports.allTournaments = allTournaments;
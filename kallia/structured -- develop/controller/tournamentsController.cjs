const dotenv = require('dotenv');
dotenv.config();

let model = require('../model/model_pg.cjs');

const monthsGreek = {0: 'Ιανουάριος', 1: 'Φεβρουάριος', 2: 'Μάρτιος', 3: 'Απρίλιος', 4: 'Μάιος', 5: 'Ιούνιος', 6: 'Ιούλιος', 7: 'Αύγουστος', 8: 'Σεπτέμβριος', 9: 'Οκτώβριος', 10: 'Νοέμβριος', 11: 'Δεκέμβριος'}
const monthsEnglish = {0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December'}

function renderTournament(req, res) { 
    let scripts = []; 
    model.getTournaments(function(err, tournaments) { 
        if(err) { 
            res.send(err);
        }
        else {
            model.getMonths(function(err, months) {
                if(err) { 
                    res.send(err);
                }
                else {
                    for (m of months){
                        m.monthname = m.monthname.replace(/\s+/g, '');
                        for (let i in monthsEnglish){
                            if (monthsEnglish[i] == m.monthname){
                                m.monthid = m.monthname;
                                m.monthname = monthsGreek[i];
                            }
                        }
                    }
                    res.render('tournaments', {title: "Villia Tennis Club | Tournaments", style: "tournaments.css", tournaments: tournaments, months: months , scripts: scripts});                }
            });
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

function addTournamentToDB (req,res) {
    let scripts = [];
    model.getTournamentsNumber(function(err, number) {
        if (err)
            return console.error(err.message);
        else{
            const tournamentid = parseInt(number[0].count)+1;
            const newTournament = {"tournamentid":"TOUR_"+ tournamentid+"_"+Math.floor(Math.random() * 101), "title":req.query.title, "startdate":req.query.startdate, "enddate":req.query.enddate, "skilllevel": req.query.skilllevel, "agerestrictions": req.query.agerestrictions, "details": req.query.details, "poster": req.query.poster};
            
            model.addTournament(newTournament, function(err, data) { 
                if(err) { 
                    res.send(err);
                }
                else {
                    model.getTournaments(function(err, tournaments) { 
                        if(err) { 
                            res.send(err);
                        }
                        else {
                            model.getMonths(function(err, months) {
                                if(err) { 
                                    res.send(err);
                                }
                                else {
                                    for (m of months){
                                        m.monthname = m.monthname.replace(/\s+/g, '');
                                        for (let i in monthsEnglish){
                                            if (monthsEnglish[i] == m.monthname){
                                                m.monthid = m.monthname;
                                                m.monthname = monthsGreek[i];
                                            }
                                        }
                                    }
                                    res.render('tournaments', {title: "Villia Tennis Club | Tournaments", style: "tournaments.css", tournaments: tournaments, months: months , scripts: scripts});                }
                            });
                        }
                    });
                }
            });
        }
    }); 
}



function deleteTournamentFromDB (req,res) {
    let scripts = [];
    model.deleteTournament(req.query.tournamentid, function(err, number) {
        if (err)
            return console.error(err.message);
        else {
            model.getTournaments(function(err, tournaments) { 
                if(err) { 
                    res.send(err);
                }
                else {
                    model.getMonths(function(err, months) {
                        if(err) { 
                            res.send(err);
                        }
                        else {
                            for (m of months){
                                m.monthname = m.monthname.replace(/\s+/g, '');
                                for (let i in monthsEnglish){
                                    if (monthsEnglish[i] == m.monthname){
                                        m.monthid = m.monthname;
                                        m.monthname = monthsGreek[i];
                                    }
                                }
                            }
                            res.render('tournaments', {title: "Villia Tennis Club | Tournaments", style: "tournaments.css", tournaments: tournaments, months: months , scripts: scripts});                }
                    });
                }
            });
        }
    }); 
}



function deleteMonthFromDB (req,res) {
    let scripts = [];
    model.deleteMonth(req.query.monthid, function(err, month) {
        if (err)
            return console.error(err.message);
        else {
            model.getTournaments(function(err, tournaments) { 
                if(err) { 
                    res.send(err);
                }
                else {
                    model.getMonths(function(err, months) {
                        if(err) { 
                            res.send(err);
                        }
                        else {
                            for (m of months){
                                m.monthname = m.monthname.replace(/\s+/g, '');
                                for (let i in monthsEnglish){
                                    if (monthsEnglish[i] == m.monthname){
                                        m.monthid = m.monthname;
                                        m.monthname = monthsGreek[i];
                                    }
                                }
                            }
                            res.render('tournaments', {title: "Villia Tennis Club | Tournaments", style: "tournaments.css", tournaments: tournaments, months: months , scripts: scripts});                }
                    });
                }
            });
        }
    }); 
}


exports.renderTournament = renderTournament;
exports.renderTournamentForm = renderTournamentForm;
exports.allTournaments = allTournaments;
exports.addTournamentToForm = addTournamentToForm;
exports.addTournamentToDB = addTournamentToDB;
exports.deleteTournamentFromDB = deleteTournamentFromDB;
exports.deleteMonthFromDB = deleteMonthFromDB;
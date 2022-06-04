const dotenv = require('dotenv');
const { send } = require('express/lib/response');
dotenv.config();

let model = require('../model/model_pg.cjs');

const monthsGreek = {0: 'Ιανουάριος', 1: 'Φεβρουάριος', 2: 'Μάρτιος', 3: 'Απρίλιος', 4: 'Μάιος', 5: 'Ιούνιος', 6: 'Ιούλιος', 7: 'Αύγουστος', 8: 'Σεπτέμβριος', 9: 'Οκτώβριος', 10: 'Νοέμβριος', 11: 'Δεκέμβριος'}
const monthsEnglish = {0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December'}

// let completed = "true";


function translate (months){
    for (m of months){
        m.monthname = m.monthname.replace(/\s+/g, '');
        for (let i in monthsEnglish){
            if (monthsEnglish[i] == m.monthname){
                m.monthid = m.monthname;
                m.monthname = monthsGreek[i];
            }
        }
    }
}


function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('/');
}

function fixDates (tournaments){
    for (tour of tournaments){
        tour.startdate = formatDate(tour.startdate);
        tour.enddate = formatDate(tour.enddate);
    }
}


function renderTournament(req, res) { 
    let scripts = [{script: '/scripts/tournamentPopup.js'}]; 
    model.getTournaments(function(err, tournaments) { 
        if(err) { 
            res.send(err);
        }
        else {
            fixDates(tournaments);
            model.getMonths(function(err, months) {
                if(err) { 
                    res.send(err);
                }
                else {
                    translate(months);
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
    model.getTournamentsNumber(function(err, number) {
        if (err)
            return console.error(err.message);
        else{
            const tournamentid = parseInt(number[0].count)+1;
            const newTournament = {"tournamentid":"TOUR_"+ tournamentid+"_"+Math.floor(Math.random() * 101), "title":req.query.title, "startdate":req.query.startdate, "enddate":req.query.enddate, "skilllevel": req.query.skilllevel, "agerestrictions": req.query.agerestrictions, "details": req.query.details, "poster": req.query.poster};
            
            model.addTournament(newTournament, function(addError, data) { 
                model.getTournaments(function(err, tournaments) { 
                    if(err) { 
                        res.send(err);
                    }
                    else {
                        fixDates(tournaments);
                        model.getMonths(function(err, months) {
                            if(err) { 
                                res.send(err);
                            }
                            else {
                                translate(months);
                                if (addError){
                                    console.log(addError);
                                    // completed = "false";
                                    res.send("Τα στοιχεία που συμπληρώσατε δεν είναι εγκυρα! Ελέγξτε αν έχετε συμπληρώσει σωστά τα πεδία της φόρμας. Πηγαίνετε στην προηγούμενη σελίδα για να επαναλάβετε την προσπάθεια σας...");
                                }
                                else {
                                    console.log("form submitted");
                                    // completed = "true";
                                    res.redirect("/tournaments");
                                }
                                // res.render('tournaments', {title: "Villia Tennis Club | Tournaments", style: "tournaments.css", tournaments: tournaments, months: months , scripts: scripts, completed: completed});
                            }
                        });
                    }
                });
            });
        }
    }); 
}



function deleteTournamentFromDB (req,res) {
    model.deleteTournament(req.query.tournamentid, function(err, number) {
        if (err)
            return console.error(err.message);
        else {
            model.getTournaments(function(err, tournaments) { 
                if(err) { 
                    res.send(err);
                }
                else {
                    // fixDates(tournaments);
                    // model.getMonths(function(err, months) {
                    //     if(err) { 
                    //         res.send(err);
                    //     }
                    //     else {
                    //         translate(months);
                    //         res.redirect("/tournaments");
                    //         res.render('tournaments', {title: "Villia Tennis Club | Tournaments", style: "tournaments.css", tournaments: tournaments, months: months , scripts: scripts});
                    //     }
                    // });
                    res.redirect("/tournaments");
                }
            });
        }
    }); 
}



function deleteMonthFromDB (req,res) {
    model.deleteMonth(req.query.monthid, function(err, month) {
        if (err)
            return console.error(err.message);
        else {
            model.getTournaments(function(err, tournaments) { 
                if(err) { 
                    res.send(err);
                }
                else {
                    // fixDates(tournaments);
                    // model.getMonths(function(err, months) {
                    //     if(err) { 
                    //         res.send(err);
                    //     }
                    //     else {
                    //         translate(months);
                    //         res.render('tournaments', {title: "Villia Tennis Club | Tournaments", style: "tournaments.css", tournaments: tournaments, months: months , scripts: scripts});
                    //     }
                    // });
                    res.redirect("/tournaments");
                }
            });
        }
    }); 
}


let loadpopup = null;

function editTournamentSelect(req,res) {
    let scripts = [{script: '/scripts/tournamentPopup.js'}];
    model.getTournamentById(req.query.tournamentid, function(err, selected) { 
        if(err) { 
            res.send(err);
        }
        else {
            model.getTournaments(function(err, tournaments) { 
                if(err) { 
                    res.send(err);
                }
                else {
                    fixDates(tournaments);
                    model.getMonths(function(err, months) {
                        if(err) { 
                            res.send(err);
                        }
                        else {
                            translate(months);
                            loadpopup = "load";
                            res.render('tournaments', {title: "Villia Tennis Club | Tournaments", style: "tournaments.css", tournaments: tournaments, months: months ,selected: selected[0], loadpopup: loadpopup, scripts: scripts});
                        }
                    });
                }
            });
        }
    });
}

function editTournamentAtDB (req,res) {
    model.getTournamentsNumber(function(err, number) {
        if (err)
            return console.error(err.message);
        else{
            const newTournament = {"tournamentid": req.query.tournamentid, "title":req.query.title, "startdate":req.query.startdate, "enddate":req.query.enddate, "skilllevel": req.query.skilllevel, "agerestrictions": req.query.agerestrictions, "details": req.query.details, "poster": req.query.poster};
            
            model.updateTournament(newTournament, function(editError, data) { 
                model.getTournaments(function(err, tournaments) { 
                    if(err) { 
                        res.send(err);
                    }
                    else {
                        fixDates(tournaments);
                        model.getMonths(function(err, months) {
                            if(err) { 
                                res.send(err);
                            }
                            else {
                                translate(months);
                                if (editError){
                                    console.log(editError);
                                    // completed = "false";
                                    res.send("Τα στοιχεία που συμπληρώσατε δεν είναι εγκυρα!\nΕλέγξτε αν έχετε συμπληρώσει σωστά τα πεδία της φόρμας.\nΜην ξεχνάτε να συμπληρώσετε τα υποχρεωτικά πεδία.\nΠηγαίνετε στην προηγούμενη σελίδα για να επαναλάβετε την προσπάθεια σας...");
                                }
                                else {
                                    console.log("form submitted");
                                    // completed = "true";
                                    res.redirect("/tournaments");
                                }
                                // res.render('tournaments', {title: "Villia Tennis Club | Tournaments", style: "tournaments.css", tournaments: tournaments, months: months , scripts: scripts, completed: completed});
                            }
                        });
                    }
                });
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
exports.editTournamentSelect = editTournamentSelect;
exports.editTournamentAtDB = editTournamentAtDB;
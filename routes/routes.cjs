const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const tournamentsController = require('../controller/tournamentsController.cjs'); 

const bookingController = require('../controller/bookingController.cjs');

const loginController = require('../controller/loginController.cjs');

//page render
router.route('/').get((req, res) => { 
    if(req.session.loggedUserId) { 
        res.render('index',{layout: 'signed.hbs', title : "Villia Tennis Club", style: "index.css", reservations: bookingController.accountReservations});
    }
    else { 
        res.render('index',{title : "Villia Tennis Club", style: "index.css"});
    } 
});

router.route('/tennis').get((req, res) => { 
    if(req.session.loggedUserId){ 
        let scripts = [];
        res.render('tennis', {layout: 'signed.hbs', title: "Villia Tennis Club | Tennis", style: "tennis.css", scripts: scripts, reservations: bookingController.accountReservations});
    }
    else{ 
        let scripts = [];
        res.render('tennis', {title: "Villia Tennis Club | Tennis", style: "tennis.css", scripts: scripts});        
    }

});

router.route('/lessons').get((req, res) => { 
    if(req.session.loggedUserId){ 
        let scripts = []; 
        res.render('lessons', {layout: 'signed.hbs', title: "Villia Tennis Club | Lessons", style: "lessons.css", scripts: scripts, reservations: bookingController.accountReservations}); 
    }
    else { 
        let scripts = [];
        res.render('lessons', {title: "Villia Tennis Club | Lessons", style: "lessons.css", scripts: scripts});        
    }
});

router.route('/spaces').get((req, res) => { 
    if(req.session.loggedUserId) { 
        let scripts = [];
        res.render('spaces', {layout: 'signed.hbs', title: "Villia Tennis Club | Spaces", style: "spaces.css", scripts: scripts, reservations: bookingController.accountReservations});
    }
    else{ 
        let scripts = [];
        res.render('spaces', {title: "Villia Tennis Club | Spaces", style: "spaces.css", scripts: scripts}); 
    }
});

router.route('/courts').get((req, res) => { 
    if(req.session.loggedUserId) { 
        let scripts = [];
        res.render('courts', {layout: 'signed.hbs', title: "Villia Tennis Club | Courts", style: "courts.css", scripts: scripts, reservations: bookingController.accountReservations});
    }
    else{ 
        let scripts = [];
        res.render('courts', {title: "Villia Tennis Club | Courts", style: "courts.css", scripts: scripts});
    }
});

router.route('/restaurant').get((req, res) => { 
    if(req.session.loggedUserId) { 
        let scripts = []; 
        res.render('restaurant', {layout: 'signed.hbs', title: "Villia Tennis Club | Restaurant", style: "restaurant.css", scripts: scripts, reservations: bookingController.accountReservations})
    }
    else{ 
        let scripts = []; 
        res.render('restaurant', {title: "Villia Tennis Club | Restaurant", style: "restaurant.css", scripts: scripts, reservations: bookingController.accountReservations})
    }
})

router.route('/login').get((req, res) => { 
    res.render('login', {layout: 'formslayout.hbs', title: "Login"})
});

router.route('/signup').get((req, res) => { 
    res.render('signup', {layout: 'formslayout.hbs', title: "Signup"})
});

router.get('/logout', loginController.logout);

//account form routers
router.post('/loginForm', loginController.login, bookingController.getAccountReservations, bookingController.setGlobal);
router.post('/registerForm', loginController.register);

//booking routers 
router.get('/booking', loginController.checkAuthenticated, bookingController.renderChoice);
router.get('/booking/courts/next', bookingController.increment);
router.get('/booking/courts/previous', bookingController.decrement);
router.get('/booking/hours', bookingController.tablehours);
router.get('/booking/courts', bookingController.getCurrentCourt);
router.get('/booking/availability', bookingController.getReservations);
router.get('/booking/make/:datetime', bookingController.makeBooking, bookingController.getReservations);
router.get('/booking/delete/:datetime', bookingController.deleteBooking, bookingController.getReservations);
router.get('/booking/change/:datetime', bookingController.changeBooking, bookingController.getReservations);

//tournament routers
router.get('/tournaments', loginController.checkAuthenticated, tournamentsController.renderChoice);
router.get('/tournamentForm', tournamentsController.renderTournamentForm);
router.get('/tournaments/allTournaments', tournamentsController.allTournaments);
router.get('/selectedTournament', tournamentsController.addTournamentToForm);
router.get('/tournaments/addTournamentToDB' , tournamentsController.addTournamentToDB);
router.get('/tournaments/deleteTournamentFromDB' , tournamentsController.deleteTournamentFromDB);
router.get('/tournaments/deleteMonthFromDB' , tournamentsController.deleteMonthFromDB);
router.get('/editTournamentSelect' , tournamentsController.editTournamentSelect);
router.get('/tournaments/editTournamentAtDB' , tournamentsController.editTournamentAtDB);

module.exports = router;


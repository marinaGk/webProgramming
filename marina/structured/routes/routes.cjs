const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const max = 4; 
const min = 1;
//const tournamentsContoller = require('../controller/tournamentsController.cjs'); 

const bookingController = require('../controller/bookingController.cjs');

const loginController = require('../controller/loginController.cjs');

//page render
router.route('/').get((req, res) => { 
    res.render('index',{title : "Villia Tennis Club", style: "index.css"});
});

router.route('/tennis').get((req, res) => { 
    let scripts = [];
    res.render('tennis', {title: "Villia Tennis Club | Tennis", style: "tennis.css", scripts: scripts});
});

router.route('/lessons').get((req, res) => { 
    let scripts = [];
    res.render('lessons', {title: "Villia Tennis Club | Lessons", style: "lessons.css", scripts: scripts});
});

router.route('/tournaments').get((req, res) => { 
    let scripts = []; 
    res.render('tournaments', {title: "Villia Tennis Club | Tournaments", style: "tournaments.css", scripts: scripts}); 
});

router.route('/spaces').get((req, res) => { 
    let scripts = [];
    res.render('spaces', {title: "Villia Tennis Club | Spaces", style: "spaces.css", scripts: scripts}); 
});

router.route('/courts').get((req, res) => { 
    let scripts = []
    res.render('courts', {title: "Villia Tennis Club | Courts", style: "courts.css", scripts: scripts});
});

router.route('/login').get((req, res) => { 
    res.render('login', {layout: 'formslayout.hbs', title: "Login"})
});

router.route('/signup').get((req, res) => { 
    res.render('signup', {layout: 'formslayout.hbs', title: "Signup"})
});

//account form routers
router.post('/loginForm', loginController.login);
router.post('/registerForm', loginController.register);

//booking routers 
router.get('/booking', loginController.checkAuthenticated, bookingController.renderChoice);

router.get('/booking/courts/next', bookingController.increment);
router.get('/booking/courts/previous', bookingController.decrement);
router.get('/booking/hours', bookingController.tablehours);
router.get('/booking/courts', bookingController.timeslots);
router.get('/booking/make/:TimeSlotID', bookingController.makeBooking);
router.get('/booking/change/:TimeSlotID', bookingController.changeBooking);


module.exports = router;


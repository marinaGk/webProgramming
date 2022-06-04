const express = require('express');
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config();

const max = 4; 
const min = 1;
//const tournamentsContoller = require('../controller/tournamentsController.cjs'); 

const bookingController = require('../controller/bookingController.cjs');
const tournamentsController = require('../controller/tournamentsController.cjs');

//const loginController = require('../controller/loginControllerPasword.cjs');

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
})

router.route('/spaces').get((req, res) => { 
    let scripts = [];
    res.render('spaces', {title: "Villia Tennis Club | Spaces", style: "spaces.css", scripts: scripts}); 
});

router.route('/courts').get((req, res) => { 
    let scripts = []
    res.render('courts', {title: "Villia Tennis Club | Courts", style: "courts.css", scripts: scripts});
});

router.route('/login').get((req, res) => { 
    let userName; let passWord;
    console.log('Login form created');
    response = { 
      userName: req.query.username, 
      passWord: req.query.password
    }
    //model.createUser(response.userName, response.passWord);
    res.redirect('back');
});

router.route('/signup').get((req, res) => { 
    let username; let email; let firstname; let lastname; let password; let passwordrepeat;
    console.log('Signup form created');
    response = { 
      email: req.query.email,
      username: req.query.username, 
      firstname: req.query.firstname, 
      lastname: req.query.lastname, 
      password: req.query.password,
      passwordrepeat: req.query.repeat_password
    };
    console.log(response);
    //model.createUser(response.userName, response.passWord);
    res.redirect('back');
});

//booking routers 
router.get('/booking/courts/next', bookingController.increment);
router.get('/booking/courts/previous', bookingController.decrement);
router.get('/booking/hours', bookingController.tablehours);     //tablehours() called : for each hour -> sends a string with it's attributes
router.get('/booking/courts', bookingController.timeslots);     //timeslots() called : for current court and for each timeslot -> sends a string with it's attributes
//router.get('/booking', bookingController.renderBooking);
router.get('/booking', bookingController.renderBooking);
router.get('/booking/change/:TimeSlotID', bookingController.changeBooking);

//tournaments routers
router.get('/tournaments', tournamentsController.renderTournament);
router.get('/tournamentForm', tournamentsController.renderTournamentForm);
router.get('/tournaments/allTournaments', tournamentsController.allTournaments);
router.get('/selectedTournament', tournamentsController.addTournamentToForm);
router.get('/addTournamentToDB' , tournamentsController.addTournamentToDB);
router.get('/deleteTournamentFromDB' , tournamentsController.deleteTournamentFromDB);
router.get('/deleteMonthFromDB' , tournamentsController.deleteMonthFromDB);



// router.route('/tournaments').get((req, res) => { 
//     let scripts = []; 
//     res.render('tournaments', {title: "Villia Tennis Club | Tournaments", style: "tournaments.css", scripts: scripts}); 
// });

exports.router = router;


const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express(); 

app.engine('hbs', exphbs.engine({extname: 'hbs', defaultLayout: 'main', layoutsDir:__dirname + '/views/layouts'}));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname + '/public')));

const router = express.Router();

let port = process.env.PORT || '3000';

const server = app.listen(port, () => { console.log("Awaiting requests @ port " + port)});

//GETS FOR DIFFERENT PARTS OF WEBSITE

app.get('/', (req, res) => { 
  console.log('Get used for index'); 
  res.render('index',{title : "Villia Tennis Club", style: "index.css"} );
});

app.get('/tennis', (req, res) => { 
  console.log('Get used for tennis'); 
  let scripts = [];
  res.render('tennis', {title: "Villia Tennis Club | Tennis", style: "tennis.css", scripts: scripts}); 
});

app.get('/lessons', (req, res) =>  {
  console.log('Get used for lessons');
  let scripts = [];
  res.render('lessons', {title: "Villia Tennis Club | Lessons", style: "lessons.css", scripts: scripts}); 
});

app.get('/tournaments', (req, res) => { 
  console.log('Get used for tournaments');
  let scripts = []; 
  res.render('tournaments', {title: "Villia Tennis Club | Tournaments", style: "tournaments.css", scripts: scripts}); 
});

app.get('/spaces', (req, res) => { 
  console.log('Get used for spaces'); 
  let scripts = [];
  res.render('spaces', {title: "Villia Tennis Club | Spaces", style: "spaces.css", scripts: scripts}); 
});

app.get('/courts', (req, res) => { 
  console.log('Get used for courts'); 
  let scripts = []
  res.render('courts', {title: "Villia Tennis Club | Courts", style: "courts.css", scripts: scripts} )
});

app.get('/booking', (req, res) => { 
  console.log('Get used for booking');
  let scripts = [{script:'scripts/data.js'}, {script:'scripts/booking.js'}]
  res.render('booking', {title: "Villia Tennis Club | Booking", style: "booking.css", scripts: scripts});
});



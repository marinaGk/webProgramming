const express = require('express');

const app = express(); 

const dotenv = require('dotenv'); 
dotenv.config(); 

const exphbs = require('express-handlebars');
//session here

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '5000kb', extended: true}));

app.use(express.urlencoded({extended: false}));

//Το template μας μπορεί να χρειάζεται να φορτώσει κάποια CSS ή JS
//Δηλώνουμε πως θα βρίσκονται στον φάκελο /public
//public folder -> περιεχει τα δεοδμενα που πρεπει να φορτωσει το template
app.use(express.static('public'));

//Διαδρομές. Αντί να γράψουμε τις διαδρομές μας εδώ, τις φορτώνουμε από ένα άλλο αρχείο
const routes = require('./routes/routes.cjs');
app.use('/', routes.router);

app.engine('hbs', exphbs.engine({
  extname: 'hbs', 
  defaultLayout: 'main',    //the default layout of all the pages of the site 
}));

app.set('view engine', 'hbs');

module.exports = app;

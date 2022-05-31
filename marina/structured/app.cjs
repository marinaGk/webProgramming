const express = require('express');
const app = express(); 

const dotenv = require('dotenv'); 
dotenv.config(); 

const exphbs = require('express-handlebars');
//session here

app.use(express.urlencoded({extended: false}));

app.use(express.static('public'));

const routes = require('./routes/routes.cjs');

app.use('/', routes.router);
console.log(routes.courtVariable);
app.engine('hbs', exphbs.engine({
  extname: 'hbs', 
  defaultLayout: 'main', 
}));

app.set('view engine', 'hbs');

module.exports = app;

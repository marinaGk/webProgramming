const express = require('express');
const app = express(); 

const dotenv = require('dotenv'); 
dotenv.config(); 

const exphbs = require('express-handlebars');

app.use(express.urlencoded({extended: false}));

const currentSession = require("./app-setup/app_setup_session.cjs");
app.use(currentSession);

app.use(express.static('public'));

app.use((req, res, next) => {
  res.locals.userId = req.session.loggedUserId;
  res.locals.adminRights = req.session.adminRights;
  next();
})

const routes = require('./routes/routes.cjs');
app.use('/', routes);

const updates = require("./updatedatabase.cjs")
updates.update();

app.engine('hbs', exphbs.engine({
  extname: 'hbs', 
  defaultLayout: 'main', 
}));

app.set('view engine', 'hbs');

module.exports = app;

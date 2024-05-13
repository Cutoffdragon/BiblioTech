'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const passport = require('passport');
const session = require('express-session');
const myDB = require('./db_connection.js')
const MongoStore = require('connect-mongo');
const LocalStrategy = require('passport-local').Strategy;
const User = require("./models.js")
const routes = require('./routes.js')
const apiRoutes = require('./api.js');
const app = express()

app.set('view engine', 'pug');

app.use('/public', express.static(process.cwd() + '/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet({
  contentSecurityPolicy: false
}));

myDB.connect();

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongoUrl: process.env.DB })
}));

const strategy = new LocalStrategy(User.authenticate())
passport.use(strategy);
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

apiRoutes(app);
routes(app);

//Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

module.exports = app; 
// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var countryController = require('./controllers/country');
var userController = require('./controllers/user');
var passport = require('passport');
var authController = require('./controllers/auth');

//Connect to the relevant MongoDB
mongoose.connect('mongodb://localhost:27017/countries');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use the passport package in our application
app.use(passport.initialize());

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /countries
router.route('/countries')
  .post(authController.isAuthenticated, countryController.postCountries)
  .get(authController.isAuthenticated, countryController.getCountries);

// Create endpoint handlers for /countries/:country_id
router.route('/countries/:country_id')
  .get(authController.isAuthenticated, countryController.getCountry)
  .put(authController.isAuthenticated, countryController.putCountry)
  .delete(authController.isAuthenticated, countryController.deleteCountry);

// Create endpoint handlers for /users
router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);
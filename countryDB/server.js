// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var countryController = require('./controllers/country');

//Connect to the relevant MongoDB
mongoose.connect('mongodb://localhost:27017/countries');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Create our Express router
var router = express.Router();

// Create endpoint handlers for /countries
router.route('/countries')
  .post(countryController.postCountries)
  .get(countryController.getCountries);

// Create endpoint handlers for /countries/:country_id
router.route('/countries/:country_id')
  .get(countryController.getCountry)
  .put(countryController.putCountry)
  .delete(countryController.deleteCountry);

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(3000);
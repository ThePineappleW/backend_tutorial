// Get the packages we need
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Country = require('./models/country');

//Connect to the relevant MongoDB
mongoose.connect('mongodb://localhost:27017/countries');

// Create our Express application
var app = express();

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Create our Express router
var router = express.Router();

// Initial dummy route for testing
// http://localhost:3000/api
router.get('/', function(req, res) {
  res.json({ message: 'Please enter more countries!' });
});

// Create a new route with the prefix /countries
var countriesRoutee = router.route('/countries');

// Create endpoint /api/countries for POSTS
countriesRoutee.post(function(req, res) {
  // Create a new instance of the Country model
  var country = new Country();

  // Set the beer properties that came from the POST data
  country.name = req.body.name;
  country.capital = req.body.capital;
  country.continent = req.body.continent;
  country.hdi = req.body.hdi;

  
  // Save the country and check for errors
  country.save(function(err) {
    if (err)
      res.send(err);

    res.json({ message: 'Country entered into database!', data: country });
  });
});

// Create endpoint /api/countries for GET
countriesRoutee.get(function(req, res) {
  // Use the Country model to find all country
  Country.find(function(err, countries) {
    if (err)
      res.send(err);

    res.json(countries);
  });
});

// Create a new route with the /countries/:country_id prefix
var countryRoute = router.route('/countries/:country_id');

// Create endpoint /api/countries/:country_id for GET
countryRoute.get(function(req, res) {
  // Use the Country model to find a specific country
  Country.findById(req.params.beer_id, function(err, country) {
    if (err)
      res.send(err);

    res.json(country);
  });
});

// Register all our routes with /api
app.use('/api', router);

// Start the server
app.listen(port);
console.log('Server running on port ' + port);
//test

// Load required packages
var Country = require('../models/country');

// Create endpoint /api/countries for POSTS
exports.postCountries = function(req, res) {
  // Create a new instance of the Country model
  var country = new Country();

  // Set the country properties that came from the POST data
  country.name = req.body.name;
  country.capital = req.body.capital;
  country.continent = req.body.continent;
  country.hdi = req.body.hdi;
  country.userId = req.user._id;

  // Save the country and check for errors
  country.save(function(err) {
    if (err)
      return res.send(err);

     //Allow CORS
     res.header("Access-Control-Allow-Origin", "*");
     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    
      res.json({ message: 'Country added to database.', data: country });
  });
};

// Create endpoint /api/countries for GET
exports.getCountries = function(req, res) {
 //Allow CORS
 res.header("Access-Control-Allow-Origin", "*");
 res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 
  // Use the Country model to find all countries
  Country.find({ userId: req.user._id }, function(err, countries) {
    if (err)
      return res.send(err);

    res.json(countries);
  });
};

// Create endpoint /api/countries/:country_id for GET
exports.getCountry = function(req, res) {
  // Use the Country model to find a specific country
  Country.find({ userId: req.user._id, _id: req.params.beer_id }, function(err, country) {
    if (err)
      return res.send(err);

    res.json(country);
  });
};

// Create endpoint /api/countries/:country_id for PUT
exports.putCountry = function(req, res) {
  // Use the Country model to find a specific country
  Country.update({ userId: req.user._id, _id: req.params.beer_id }, { hdi: req.body.hdi }, function(err, num, raw) {
    if (err)
      return res.send(err);
    
    res.json({ message: num + ' updated' });
  });
};

// Create endpoint /api/countries/:country_id for DELETE
exports.deleteCountry = function(req, res) {
  // Use the Country model to find a specific country and remove it
  Country.remove({ userId: req.user._id, _id: req.params.beer_id }, function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'Country removed from database.' });
  });
};
// Load required packages
var Country = require('../models/country');

// Create endpoint /api/countries for POSTS
exports.postCountries = function(req, res) {
  // Create a new instance of the Country model
  var country = new Country();

  // Set the country properties that came from the POST data
  country.name = req.body.name;
  country.type = req.body.type;
  country.quantity = req.body.quantity;

  // Save the country and check for errors
  country.save(function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'Country added to database.', data: country });
  });
};

// Create endpoint /api/countries for GET
exports.getCountries = function(req, res) {
  // Use the Country model to find all countries
  Country.find(function(err, countries) {
    if (err)
      return res.send(err);

    res.json(countries);
  });
};

// Create endpoint /api/countries/:country_id for GET
exports.getCountry = function(req, res) {
  // Use the Country model to find a specific country
  Country.findById(req.params.country_id, function(err, country) {
    if (err)
      return res.send(err);

    res.json(country);
  });
};

// Create endpoint /api/countries/:country_id for PUT
exports.putCountry = function(req, res) {
  // Use the Country model to find a specific country
  Country.findById(req.params.country_id, function(err, country) {
    if (err)
      return res.send(err);

    // Update the existing country quantity
    country.quantity = req.body.quantity;

    // Save the country and check for errors
    country.save(function(err) {
      if (err)
        return res.send(err);

      res.json(country);
    });
  });
};

// Create endpoint /api/countries/:country_id for DELETE
exports.deleteCountry = function(req, res) {
  // Use the Country model to find a specific country and remove it
  Country.findByIdAndRemove(req.params.country_id, function(err) {
    if (err)
      return res.send(err);

    res.json({ message: 'Country removed from database.' });
  });
};
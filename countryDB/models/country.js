// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var CountrySchema = new mongoose.Schema({
  name: String,
  capital: String,
  continent: String,
  hdi: Number

});

// Export the Mongoose model
module.exports = mongoose.model('country', CountrySchema);
var mongoose = require('mongoose');

// Create the easy Life Schema.
var mrbpSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  }
});

// Export the model.
module.exports = mrbpSchema;
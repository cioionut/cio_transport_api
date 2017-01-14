var mongoose = require('mongoose');
var TourSchema = new mongoose.Schema({
  title: String,
  description: String,
  updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Tour', TourSchema);

const mongoose = require('mongoose');

const advisorySchema = new mongoose.Schema({
  title:   { type: String, required: true },
  type:    { type: String, enum: ['Pest', 'Fertilizer', 'Technology', 'Scheme', 'Weather', 'Market'], required: true },
  content: { type: String, required: true },
  region:  String,
  crops:   [String],
  author:  String,
  source:  String,
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Advisory', advisorySchema);

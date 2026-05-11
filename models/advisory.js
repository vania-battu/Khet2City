const mongoose = require('mongoose');

const advisorySchema = new mongoose.Schema({
  title:   { type: String, required: true },
  type:    { type: String, enum: ['Pest', 'Fertilizer', 'Technology', 'Scheme', 'Weather', 'Market', 'Organic Techniques', 'Market Insights', 'Sustainable Tech', 'Community Wisdom'], required: true },
  content: { type: String, required: true },
  region:  String,
  crops:   [String],
  author:  { type: String, required: true }, // Name display
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isProfessional: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('Advisory', advisorySchema);

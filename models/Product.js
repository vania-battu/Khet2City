const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  farmer:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name:     { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ['Vegetables', 'Grains', 'Dairy', 'Fruits', 'Pulses', 'Spices', 'Other'] },
  description: String,
  price:    { type: Number, required: true, min: 0 },
  unit:     { type: String, enum: ['kg', 'litre', 'piece', 'quintal', 'dozen'], default: 'kg' },
  quantity: { type: Number, required: true, min: 0 },
  image:    { url: { type: String, default: '' }, publicId: String },
  harvestDate:  Date,
  certification: { type: String, enum: ['None', 'Organic', 'FSSAI', 'GAP'], default: 'None' },
  deliveryOptions: [{ type: String, enum: ['Self', 'Shiprocket', 'Porter', 'Pickup'] }],
  location: { village: String, district: String, state: String },
  isAvailable:  { type: Boolean, default: true },
  views:        { type: Number, default: 0 },
  rating:       { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
}, { timestamps: true });

// Full-text search index
productSchema.index({ name: 'text', description: 'text', category: 'text' });

module.exports = mongoose.model('Product', productSchema);

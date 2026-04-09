const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:  { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  password: { type: String, required: true, minlength: 6, select: false },
  role:  { type: String, enum: ['farmer', 'buyer', 'admin'], default: 'buyer' },

  // Farmer fields
  farmName:     String,
  farmLocation: { village: String, district: String, state: String, pincode: String },
  farmSize:     Number,
  crops:        [String],

  // Buyer fields
  deliveryAddress: { street: String, city: String, state: String, pincode: String },

  // Shared
  profileImage: { url: String, publicId: String },
  upiId:        String,
  language:     { type: String, default: 'en' },
  isActive:     { type: Boolean, default: true },
  rating:       { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare entered password with hashed
userSchema.methods.matchPassword = async function (entered) {
  return await bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('User', userSchema);

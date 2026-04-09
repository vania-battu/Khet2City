const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer:   { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  farmer:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity:     { type: Number, required: true, min: 1 },
  pricePerUnit: { type: Number, required: true },
  totalAmount:  { type: Number, required: true },
  deliveryAddress: { street: String, city: String, state: String, pincode: String },
  deliveryMethod:  { type: String, enum: ['Self', 'Shiprocket', 'Porter', 'Pickup'], default: 'Shiprocket' },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Packed', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Pending'
  },
  payment: {
    method:           { type: String, enum: ['UPI', 'Card', 'Wallet', 'COD'], default: 'UPI' },
    status:           { type: String, enum: ['Pending', 'Paid', 'Failed', 'Refunded'], default: 'Pending' },
    razorpayOrderId:  String,
    razorpayPaymentId: String,
    paidAt:           Date,
  },
  trackingId: String,
  notes:      String,
  rating: { score: { type: Number, min: 1, max: 5 }, review: String, ratedAt: Date },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);

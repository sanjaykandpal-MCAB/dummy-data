const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema (unchanged)
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date }
});

// Item Schema (modified)
const ItemSchema = new Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stockQuantity: { type: Number, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Fruit', 'Vegetable', 'Non-veg', 'Breads', 'Other']
  },
  imageUrl: String
}, { timestamps: true });

// Cart Schema (modified)
const CartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    item: { type: Schema.Types.ObjectId, ref: 'Item' },
    quantity: { type: Number, required: true, min: 1 }
  }],
  lastUpdated: { type: Date, default: Date.now }
});

// Order Schema (modified)
const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    item: { type: Schema.Types.ObjectId, ref: 'Item' },
    quantity: { type: Number, required: true },
    priceAtTime: { type: Number, required: true }
  }],
  status: { 
    type: String, 
    enum: ['pending', 'processing', 'completed', 'cancelled'],
    default: 'pending'
  },
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// New schema for device sessions
const DeviceSessionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  deviceId: { type: String, required: true },
  lastActive: { type: Date, default: Date.now }
});

// Create models
const User = mongoose.model('User', UserSchema);
const Item = mongoose.model('Item', ItemSchema);
const Cart = mongoose.model('Cart', CartSchema);
const Order = mongoose.model('Order', OrderSchema);
const DeviceSession = mongoose.model('DeviceSession', DeviceSessionSchema);

module.exports = { User, Item, Cart, Order, DeviceSession };
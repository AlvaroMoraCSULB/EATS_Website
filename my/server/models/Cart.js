const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: [1, 'Quantity cannot be less than 1'],
    default: 1
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, { _id: false }); // Prevents automatic ID generation for subdocuments

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Cart must belong to a user'],
    unique: true
  },
  items: [cartItemSchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update timestamp on save
cartSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Auto-populate items when querying
cartSchema.pre(/^find/, function(next) {
  this.populate({
    path: 'items.item',
    select: 'name price imageUrl'
  });
  next();
});

// Instance method to calculate total
cartSchema.methods.calculateTotal = function() {
  return this.items.reduce((total, cartItem) => {
    return total + (cartItem.item.price * cartItem.quantity);
  }, 0);
};

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
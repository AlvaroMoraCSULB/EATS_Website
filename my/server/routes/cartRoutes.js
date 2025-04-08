const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const authMiddleware = require('../middleware/authMiddleware');
const Cart = require('../models/Cart');
const Item = require('../models/Item');

// GET user's cart
router.get('/', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.item');
    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// POST add item to cart
router.post('/add', authMiddleware, async (req, res) => {
  try {
    // Validate itemId format
    if (!mongoose.Types.ObjectId.isValid(req.body.itemId)) {
      return res.status(400).json({ message: 'Invalid item ID format' });
    }

    // Check item exists
    const item = await Item.findById(req.body.itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Find or create cart
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ 
        user: req.user.id, 
        items: [] 
      });
    }

    // Update cart
    const existingItemIndex = cart.items.findIndex(
      i => i.item.toString() === req.body.itemId
    );

    if (existingItemIndex >= 0) {
      cart.items[existingItemIndex].quantity += 1;
    } else {
      cart.items.push({ 
        item: req.body.itemId, 
        quantity: 1 
      });
    }

    // Validate before save
    try {
      await cart.validate();
    } catch (validationError) {
      return res.status(400).json({ 
        message: 'Cart validation failed',
        error: validationError.errors 
      });
    }

    const savedCart = await cart.save();
    const populatedCart = await Cart.populate(savedCart, { path: 'items.item' });

    res.json(populatedCart);

  } catch (err) {
    console.error('Cart error:', err);
    res.status(500).json({ 
      message: 'Server error processing cart',
      error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});



// UPDATE item quantity
router.put('/update/:itemId', authMiddleware, async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    const cart = await Cart.findOneAndUpdate(
      { 
        user: req.user.id,
        'items.item': req.params.itemId 
      },
      { 
        $set: { 'items.$.quantity': quantity },
        $currentDate: { updatedAt: true }
      },
      { new: true }
    ).populate('items.item');

    if (!cart) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// REMOVE item from cart
router.delete('/remove/:itemId', authMiddleware, async (req, res) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { 
        $pull: { items: { item: req.params.itemId } },
        $currentDate: { updatedAt: true }
      },
      { new: true }
    ).populate('items.item');

    res.json(cart || { items: [] });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// CLEAR cart
router.delete('/clear', authMiddleware, async (req, res) => {
  try {
    await Cart.findOneAndDelete({ user: req.user.id });
    res.json({ message: 'Cart cleared' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
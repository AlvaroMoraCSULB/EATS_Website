const Item = require('../models/Item');

exports.getItems = async (req, res) => {
  try {
    const items = await Item.find({}, 'name price imageUrl'); // Explicitly select fields
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./models/Item');

// Sample items with YOUR image paths
const sampleItems = [
  {
    name: "Breadboard (Small)",
    price: 5.00,
    imageUrl: "/breadboard.jpg" 
  },
  {
    name: "Breadboard (Large)", 
    price: 10.00,
    imageUrl: "/breadboard.jpg" 
  },
  {
	name: "Voltage Regulator",
	price: 1.00,
	imageUrl: "/5vregulator.jpg"
  },
  {
	name: "Wires x10",
	price: 1.00,
	imageUrl: "/jumperwires.jpg"
  },
  {
	name: "Shirts",
	price: 20.00,
	imageUrl: "/BackShirt.PNG"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Clear and seed
    await Item.deleteMany(); 
    await Item.insertMany(sampleItems);
    
    console.log(`✅ Seeded ${sampleItems.length} items with correct image paths`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
}

seedDatabase();
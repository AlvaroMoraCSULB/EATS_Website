require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cartRoutes = require("./routes/cartRoutes"); 
const profileRoutes = require('./routes/profileRoutes');
const fileRoutes = require('./routes/fileRoutes');
const forumRoutes = require('./routes/forumRoutes');

const app = express();




// Express static file serving
app.use('/profile_pics', express.static(path.join(__dirname, '../client/public/profile_pics')));

// Middleware
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/cart", cartRoutes); 
app.use('/api/profile', profileRoutes);
app.use('/api/files', fileRoutes);
app.use("/api/forum", forumRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
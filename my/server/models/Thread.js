const mongoose = require("mongoose");

const threadSchema = new mongoose.Schema({
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  content: { 
    type: String, 
    required: true,
    maxlength: 2000 
  },
  comments: [{
    author: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required: true 
    },
    content: { 
      type: String, 
      required: true,
      maxlength: 1000 
    },
    createdAt: { 
      type: Date, 
      default: Date.now 
    }
  }],
  isPinned: {
    type: Boolean,
    default: false
  }
}, { 
  timestamps: true 
});

// Add text index for search functionality
threadSchema.index({ content: 'text', 'comments.content': 'text' });

module.exports = mongoose.model("Thread", threadSchema);
const Thread = require("../models/Thread");
const User = require("../models/User");

exports.createThread = async (req, res) => {
  try {
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: "Thread content is required" });
    }

    const thread = await Thread.create({
      author: req.user._id,
      content
    });

    // Populate author info for immediate frontend use
    await thread.populate('author', 'username profilePic');
    
    res.status(201).json(thread);
  } catch (error) {
    console.error("Thread creation error:", error);
    res.status(500).json({ 
      message: "Failed to create thread",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.getThreads = async (req, res) => {
  try {
    const threads = await Thread.find()
      .sort({ createdAt: -1 })
      .populate('author', 'username profilePic')
      .populate('comments.author', 'username profilePic');

    res.json(threads);
  } catch (error) {
    console.error("Thread fetch error:", error);
    res.status(500).json({ 
      message: "Failed to fetch threads",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { id } = req.params;

    if (!content) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const thread = await Thread.findById(id);
    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }

    thread.comments.push({
      author: req.user._id,
      content
    });

    const savedThread = await thread.save();
    await savedThread.populate('comments.author', 'username profilePic');

    res.status(201).json(savedThread);
  } catch (error) {
    console.error("Comment addition error:", error);
    res.status(500).json({ 
      message: "Failed to add comment",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
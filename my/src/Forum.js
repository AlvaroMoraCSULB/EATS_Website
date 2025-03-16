import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

const Forum = () => {
  const [threads, setThreads] = useState([]);
  const [newThread, setNewThread] = useState("");
  const [newComment, setNewComment] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    fetchThreads();
    setUserLoggedIn(!!localStorage.getItem("authToken"));
  }, []);

  const fetchThreads = async () => {
    try {
      const response = await axios.get("http://localhost:5000/threads");
      setThreads(response.data);
    } catch (error) {
      console.error("Error fetching threads:", error);
    }
  };

  const handleThreadSubmit = async (e) => {
    e.preventDefault();
    if (!newThread.trim()) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "http://localhost:5000/threads",
        { content: newThread },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewThread("");
      fetchThreads();
    } catch (error) {
      console.error("Error creating thread:", error);
    }
  };

  const handleCommentSubmit = async (threadId) => {
    if (!newComment[threadId]?.trim()) return;

    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `http://localhost:5000/threads/${threadId}/comments`,
        { content: newComment[threadId] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewComment({ ...newComment, [threadId]: "" });
      fetchThreads();
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      {/* Navigation Menu */}
      <div className="hamburger-menu">
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="hamburger-icon">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <span className="menu-text">Forum</span>
        <nav className="menu">
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/forum">Forum</Link></li>
          </ul>
        </nav>
      </div>

      {/* Forum Content */}
      <div className="forum-container">
        <h1>Embedded Applications Technology Society - Forum</h1>

        {userLoggedIn ? (
          <div className="thread-form">
            <h2>Create a Discussion Thread</h2>
            <form onSubmit={handleThreadSubmit}>
              <textarea
                value={newThread}
                onChange={(e) => setNewThread(e.target.value)}
                placeholder="Write your discussion thread..."
                required
              />
              <button type="submit">Post Thread</button>
            </form>
          </div>
        ) : (
          <p>Please <Link to="/login">log in</Link> to create a thread.</p>
        )}

        <h2>Discussion Threads</h2>
        {threads.map((thread) => (
          <div key={thread._id} className="thread">
            <p><strong>{thread.author}</strong>: {thread.content}</p>
            <h4>Comments:</h4>
            {thread.comments.map((comment) => (
              <p key={comment._id}><strong>{comment.author}</strong>: {comment.content}</p>
            ))}
            {userLoggedIn && (
              <div className="comment-section">
                <textarea
                  value={newComment[thread._id] || ""}
                  onChange={(e) => setNewComment({ ...newComment, [thread._id]: e.target.value })}
                  placeholder="Add a comment..."
                  required
                />
                <button onClick={() => handleCommentSubmit(thread._id)}>Comment</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;

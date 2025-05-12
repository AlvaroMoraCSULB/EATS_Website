import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './context/authContext';
import { getThreads, createThread, addComment } from './services/forumService';
import './Forum.css';

const Forum = () => {
  const { user, token } = useAuth();
  const [threads, setThreads] = useState([]);
  const [newThreadContent, setNewThreadContent] = useState('');
  const [newComments, setNewComments] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        setIsLoading(true);
        const data = await getThreads();
        setThreads(data);
      } catch (err) {
        console.error('Failed to load threads:', err);
        setError('Failed to load discussions');
      } finally {
        setIsLoading(false);
      }
    };
    fetchThreads();
  }, []);

  const handleThreadSubmit = async (e) => {
    e.preventDefault();
    if (!newThreadContent.trim()) return;
    
    try {
      await createThread(newThreadContent, token);
      setNewThreadContent('');
      const updatedThreads = await getThreads();
      setThreads(updatedThreads);
    } catch (err) {
      console.error('Failed to create thread:', err);
      setError('Failed to post discussion');
    }
  };

  const handleCommentSubmit = async (threadId) => {
    if (!newComments[threadId]?.trim()) return;
    
    try {
      await addComment(threadId, newComments[threadId], token);
      setNewComments(prev => ({ ...prev, [threadId]: '' }));
      const updatedThreads = await getThreads();
      setThreads(updatedThreads);
    } catch (err) {
      console.error('Failed to add comment:', err);
      setError('Failed to post comment');
    }
  };

  if (isLoading) return <div className="loading">Loading discussions...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="forum-container">
      <h1>Embedded Applications Technology Society - Forum</h1>

      {user ? (
        <div className="thread-form">
          <h2>Create a Discussion Thread</h2>
          <form onSubmit={handleThreadSubmit}>
            <textarea
              value={newThreadContent}
              onChange={(e) => setNewThreadContent(e.target.value)}
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
          <p>
            <strong>{thread.author?.username || 'Unknown user'}</strong>: 
            {thread.content}
          </p>
          
          <div className="comments-section">
            <h4>Comments:</h4>
            {thread.comments?.map((comment) => (
              <p key={comment._id}>
                <strong>{comment.author?.username || 'Unknown user'}</strong>: 
                {comment.content}
              </p>
            ))}
            
            {user && (
              <div className="comment-form">
                <textarea
                  value={newComments[thread._id] || ''}
                  onChange={(e) => setNewComments(prev => ({
                    ...prev,
                    [thread._id]: e.target.value
                  }))}
                  placeholder="Add a comment..."
                  required
                />
                <button onClick={() => handleCommentSubmit(thread._id)}>
                  Comment
                </button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forum;
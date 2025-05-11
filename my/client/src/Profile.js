import { useState } from 'react';
import { useAuth } from './context/authContext';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import './Profile.css';

export default function ProfilePage() {
  const { user, logout, verifyToken } = useAuth();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type and size
    if (!file.type.startsWith('image/')) {
      setUploadError('Please select an image file');
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setUploadError('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append('profilePic', file);

      const response = await fetch('/api/profile/picture', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Upload failed');
      }

      const data = await response.json();
      // Refresh user data to show new profile picture
      await verifyToken();
      
      // Reset file input to allow uploading same file again
      e.target.value = '';
      
    } catch (err) {
      console.error('Upload failed:', err);
      setUploadError(err.message || 'Failed to upload profile picture');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-content">
        <div className="profile-grid">
          <div className="profile-image-section">
            <label htmlFor="profilePicInput">
              {user?.profilePic ? (
                <img 
                  src={`/profile_pics/uploaded/${user.profilePic}?${Date.now()}`} 
                  alt="Profile" 
                  className="profile-image"
                  onError={(e) => {
                    e.target.src = '/profile_pics/default_profile.jpg';
                  }}
                />
              ) : (
                <User size={150} strokeWidth={1.5} className="default-avatar" />
              )}
              {isUploading && (
                <div className="upload-overlay">
                  <div className="upload-spinner"></div>
                  <span>Uploading...</span>
                </div>
              )}
            </label>
            <h2>{user?.username || "Guest"}</h2>
            <input
              type="file"
              id="profilePicInput"
              accept="image/*"
              onChange={handleProfilePicChange}
              disabled={isUploading}
            />
            {uploadError && <p className="upload-error">{uploadError}</p>}
          </div>

          <div className="profile-options">
            {user && (
              <div className="user-info">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Role:</strong> {user.is_officer ? "Officer" : "Member"}</p>
              </div>
            )}
            <div className="action-links">
              <label htmlFor="profilePicInput" className="action-link">
                Change profile pic
              </label>
              <button className="action-link" onClick={() => navigate('/forum')}>
                View threads posted
              </button>
            </div>
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
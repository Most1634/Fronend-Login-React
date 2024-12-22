import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="auth-container">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="auth-container">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <h2>Welcome {user.name || 'User'}</h2>
      <div className="profile-info">
        <p><strong>Name:</strong> {user.name || 'Not provided'}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>User ID:</strong> {user.id}</p>
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Profile;

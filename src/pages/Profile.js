import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { experiments } from '../data/experiments';
import './Profile.css';

const Profile = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Welcome, {user.name || user.email}</h2>
        <button onClick={logout} className="logout-button">Logout</button>
      </div>

      <div className="profile-content">
        <div className="user-info">
          <h3>User Information</h3>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>ID:</strong> {user.id}</p>
        </div>

        <div className="experiments-section">
          <h3>Epics Experiments</h3>
          <div className="experiments-grid">
            {experiments.map(exp => (
              <div key={exp.key} className="experiment-card">
                <h4>{exp.definition.name}</h4>
                <div className="experiment-meta">
                  <span className={`status ${exp.current_status.state}`}>
                    Status: {exp.current_status.state}
                  </span>
                  <span>Milestone: {exp.definition.milestone}</span>
                </div>
                <div className="experiment-details">
                  <p><strong>Group:</strong> {exp.definition.group}</p>
                  <p><strong>Default Enabled:</strong> {exp.definition.default_enabled.toString()}</p>
                  {exp.current_status.gates.map((gate, index) => (
                    <p key={index}>
                      <strong>{gate.key}:</strong> {gate.value.toString()}
                    </p>
                  ))}
                </div>
                <div className="experiment-links">
                  <a href={exp.definition.introduced_by_url} target="_blank" rel="noopener noreferrer">
                    Merge Request
                  </a>
                  <a href={exp.definition.rollout_issue_url} target="_blank" rel="noopener noreferrer">
                    Rollout Issue
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

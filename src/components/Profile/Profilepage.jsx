import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.css";

export default function ProfilePage() {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem('user');
    return localUser ? JSON.parse(localUser) : null;
  });

  const [error, setError] = useState("");
  const [isFetchingData, setIsFetchingData] = useState(true);

  useEffect(() => {
    const userExists = localStorage.getItem('user');
    
    if (!userExists) {
      setIsFetchingData(false);
      navigate("/login", { replace: true });
      return;
    }

    const fetchUserData = async () => {
      setIsFetchingData(true);
      setError("");

      try {
        const response = await axios.get("https://task-4-pt0q.onrender.com/api/user/data", {
          withCredentials: true,
        });

        console.log('Full API Response:', response.data); 

        if (response.data && response.data.success && response.data.userData) { 
          const fetchedUser = response.data.userData;
          setUser(fetchedUser);
          localStorage.setItem('user', JSON.stringify(fetchedUser));  
        } else {
          setError(response.data.message || "No user data found. Please log in again.");
          localStorage.removeItem('user');
          setUser(null); 
        }
      } catch (err) {
        console.error("User data fetch failed:", err.response?.status, err.message);
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError("Session expired. Please log in again.");
        } else {
          setError("Failed to fetch profile. Check connection and try again.");
        }
        localStorage.removeItem('user');
        setUser(null); 
      } finally {
        setIsFetchingData(false);
      }
    };
    
    fetchUserData();
  }, [navigate]);

  if (isFetchingData) {
    return (
      <div className="profile-container">
        <div className="profile-card loading">
          <p>Loading user profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {  
    return (
      <div className="profile-container">
        <div className="profile-card error-card">
          <h2>Access Denied</h2>
          <p className="error-msg">{error || "Unable to load profile."}</p>
          <button 
            className="login-redirect-btn"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
          <button 
            className="retry-btn"
            onClick={() => window.location.reload()}
          >
            Retry Fetch
          </button>
        </div>
      </div>
    );
  }

  const isVerified = user.isAccountVerified === true;
  const verifiedStatus = isVerified ? "Verified" : "Unverified";
  const verifiedClass = isVerified ? "status-verified" : "status-unverified";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>
        
        <div className="profile-details">
          <div className="detail-item">
            <span className="label">Name : </span>
            <span className="value">{user.name || "N/A"}</span>
          </div>

          <div className="detail-item">
            <span className="label">Email : </span>
            <span className="value">{user.email}</span>
          </div>

          <div className="detail-item">
            <span className="label">Status : </span>
            <span className={`value ${verifiedClass}`}>
              {verifiedStatus}
            </span>
          </div>
        </div>

        {error && <p className="error-msg">{error}</p>}
        
      </div>
    </div>
  );
}
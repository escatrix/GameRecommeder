import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.css";

// API Endpoint for User Data
const USER_DATA_API_URL = "https://task-4-pt0q.onrender.com/api/user/data"; 

export default function ProfilePage() {
  const navigate = useNavigate();
  
  // Initialize user state from local storage
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem('user');
    return localUser ? JSON.parse(localUser) : null;
  });

  const [error, setError] = useState("");
  const [isFetchingData, setIsFetchingData] = useState(true);

  // --- Fetch User Data on Load ---
  useEffect(() => {
    const tokenExists = localStorage.getItem('user');
    
    // 1. Initial check: If no local data exists, redirect to login (basic protection)
    if (!tokenExists) {
        setIsFetchingData(false);
        navigate("/login", { replace: true });
        return;
    }

    const fetchUserData = async () => {
      setIsFetchingData(true);
      setError("");

      try {
        const response = await axios.get(USER_DATA_API_URL, {
          withCredentials: true,
        });

        if (response.data && response.data.success && response.data.data) {
          // Success: Set fresh data and update local storage
          setUser(response.data.data);
          localStorage.setItem('user', JSON.stringify(response.data.data));
        } else {
          // Failure: Backend sent success: false 
          setError(response.data.message || "Failed to retrieve user data.");
          localStorage.removeItem('user');
          setUser(null); 
        }
      } catch (err) {
        // Critical Failure: Axios catches 401/403 (JWT invalid/expired/missing)
        console.error("User data fetch failed, session invalid:", err);
        setError("Session expired. Please log in again to refresh your data.");
        localStorage.removeItem('user');
        setUser(null); // Stop displaying protected data
      } finally {
        setIsFetchingData(false);
      }
    };
    
    // If local data exists, proceed to fetch fresh data.
    fetchUserData();

  }, [navigate]);

  // --- Render Logic ---

  if (isFetchingData) {
    return (
      <div className="profile-container">
        <div className="profile-card loading">
          <p>Loading user profile...</p>
        </div>
      </div>
    );
  }

  // If fetching is done but no user data is present (due to API failure/cleanup)
  if (!user && error) {
    return (
        <div className="profile-container">
            <div className="profile-card error-card">
                <h2>Access Denied</h2>
                <p className="error-msg">{error}</p>
                <button 
                  className="login-redirect-btn"
                  onClick={() => navigate("/login")}
                >
                  Go to Login
                </button>
            </div>
        </div>
    );
  }

  // Determine verification status display
  const isVerified = user.isAccountVerified === true;
  const verifiedStatus = isVerified ? "Verified" : "Unverified";
  const verifiedClass = isVerified ? "status-verified" : "status-unverified";

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>User Profile</h2>
        
        <div className="profile-details">
          <div className="detail-item">
            <span className="label">Name</span>
            <span className="value">{user.name || "N/A"}</span>
          </div>

          <div className="detail-item">
            <span className="label">Email</span>
            <span className="value">{user.email}</span>
          </div>

          <div className="detail-item">
            <span className="label">Status</span>
            <span className={`value ${verifiedClass}`}>
              {verifiedStatus}
            </span>
          </div>
        </div>

        {error && <p className="error-msg">{error}</p>}
        
        {/* Removed the Logout Button */}
      </div>
    </div>
  );
}

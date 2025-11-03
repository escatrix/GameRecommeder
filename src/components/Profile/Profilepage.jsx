import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.css";

// API Endpoints
const LOGOUT_API_URL = "https://task-4-pt0q.onrender.com/api/auth/logout";
const USER_DATA_API_URL = "https://task-4-pt0q.onrender.com/api/user/data"; 

export default function ProfilePage() {
  const navigate = useNavigate();
  
  // State for user data, initialized with locally stored data (if available)
  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem('user');
    return localUser ? JSON.parse(localUser) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFetchingData, setIsFetchingData] = useState(true);

  // --- 1. Logout Handler (Defined early so useEffect can use it) ---
  const handleLogout = async (isForced = false) => {
    if (!isForced) {
        setLoading(true);
    }
    setError("");
    
    try {
      if (!isForced) {
        // Call the backend API to clear the HTTP-only cookie
        await axios.post(LOGOUT_API_URL, {}, { withCredentials: true });
      }

      // Frontend cleanup: Clear localStorage and state
      localStorage.removeItem('user');
      setUser(null);

      // Redirect to the login page
      navigate("/login", { replace: true });

    } catch (err) {
      console.error("Logout error:", err);
      // Even if API call fails, we assume cookie is cleared or invalid, proceed with redirect
      localStorage.removeItem('user');
      navigate("/login", { replace: true });
    } finally {
      setLoading(false);
    }
  };


  // --- 2. Fetch User Data on Load (Refactored) ---
  useEffect(() => {
    const tokenExists = localStorage.getItem('user');
    
    // 1. Check if the user is even expected to be logged in
    if (!tokenExists) {
        setIsFetchingData(false);
        navigate("/login", { replace: true });
        return;
    }

    const fetchUserData = async () => {
      setIsFetchingData(true);
      try {
        const response = await axios.get(USER_DATA_API_URL, {
          withCredentials: true,
        });

        if (response.data && response.data.success && response.data.data) {
          // Success: Set fresh data
          setUser(response.data.data);
          localStorage.setItem('user', JSON.stringify(response.data.data));
        } else {
          // Failure: Backend sent success: false (JWT recognized, but user status bad)
          handleLogout(true); 
        }
      } catch (err) {
        // Critical Failure: Axios catches 401/403 (JWT invalid/expired/missing)
        console.error("User data fetch failed, session invalid:", err);
        handleLogout(true); // Force logout and redirection
      } finally {
        setIsFetchingData(false);
      }
    };
    
    // If local data exists, proceed to fetch fresh data.
    fetchUserData();

  }, [navigate]); // Dependency array is now stable

  // --- Render Logic ---

  if (isFetchingData || !user) {
    // Show a loading state until data is fetched or redirection occurs
    return (
      <div className="profile-container">
        <div className="profile-card loading">
          <p>Loading user profile...</p>
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

        <button 
          className="logout-btn" 
          onClick={() => handleLogout()} 
          disabled={loading}
        >
          {loading ? 'Logging Out...' : 'Log Out'}
        </button>
      </div>
    </div>
  );
}

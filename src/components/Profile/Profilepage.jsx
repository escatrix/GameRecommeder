
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.css";

// API Endpoints
const LOGOUT_API_URL = "https://task-4-pt0q.onrender.com/api/auth/logout";
// Assuming a protected endpoint exists to get fresh user data
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

  // --- 1. Fetch User Data ---
  useEffect(() => {
    const fetchUserData = async () => {
      setIsFetchingData(true);
      try {
        // Fetch fresh user data from the protected endpoint using the JWT cookie
        const response = await axios.get(USER_DATA_API_URL, {
          withCredentials: true,
        });

        if (response.data && response.data.success && response.data.data) {
          // Assuming response.data.data contains { name, email, isAccountVerified }
          setUser(response.data.data);
          localStorage.setItem('user', JSON.stringify(response.data.data));
        } else {
          // If the backend returns success: false (e.g., JWT expired), navigate to login
          handleLogout(true); // Forced logout without calling API again
        }
      } catch (err) {
        // Axios catches 401 Unauthorized, meaning JWT is invalid/expired
        console.error("User data fetch failed:", err);
        handleLogout(true); // Force logout and redirection
      } finally {
        setIsFetchingData(false);
      }
    };
    
    // Only attempt to fetch if local storage data is present (implying user believes they are logged in)
    if (user) {
        fetchUserData();
    } else {
        // If no local data, user is not logged in, redirect them
        navigate("/login", { replace: true });
    }

  }, [navigate]); // Dependency array includes navigate

  // --- 2. Logout Handler ---
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
      setError(err.response?.data?.message || "Logout failed on the server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./ProfilePage.css";

// export default function ProfilePage() {
//   const navigate = useNavigate();
  
//   const [user, setUser] = useState(() => {
//     const localUser = localStorage.getItem('user');
//     return localUser ? JSON.parse(localUser) : null;
//   });

//   const [error, setError] = useState("");
//   const [isFetchingData, setIsFetchingData] = useState(true);

//   useEffect(() => {
//     const userExists = localStorage.getItem('user');
    
//     if (!userExists) {
//       setIsFetchingData(false);
//       navigate("/login", { replace: true });
//       return;
//     }

//     const fetchUserData = async () => {
//       setIsFetchingData(true);
//       setError("");

//       try {
//         const response = await axios.get("https://task-4-pt0q.onrender.com/api/user/data", {
//           withCredentials: true,
//         });

//         console.log('Full API Response:', response.data);  // Temp: Confirm structure

//         if (response.data && response.data.success && response.data.userData) {  // Fixed: userData, not data
//           const fetchedUser = response.data.userData;
//           setUser(fetchedUser);
//           localStorage.setItem('user', JSON.stringify(fetchedUser));  // Update with fresh data
//         } else {
//           // Handle 200 but no userData (e.g., backend edge case)
//           setError(response.data.message || "No user data found. Please log in again.");
//           localStorage.removeItem('user');
//           setUser(null); 
//         }
//       } catch (err) {
//         console.error("User data fetch failed:", err.response?.status, err.message);
//         if (err.response?.status === 401 || err.response?.status === 403) {
//           setError("Session expired. Please log in again.");
//         } else {
//           setError("Failed to fetch profile. Check connection and try again.");
//         }
//         localStorage.removeItem('user');
//         setUser(null); 
//       } finally {
//         setIsFetchingData(false);
//       }
//     };
    
//     fetchUserData();
//   }, [navigate]);

//   if (isFetchingData) {
//     return (
//       <div className="profile-container">
//         <div className="profile-card loading">
//           <p>Loading user profile...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!user) {  // Simplified: !user covers error + null cases
//     return (
//       <div className="profile-container">
//         <div className="profile-card error-card">
//           <h2>Access Denied</h2>
//           <p className="error-msg">{error || "Unable to load profile."}</p>
//           <button 
//             className="login-redirect-btn"
//             onClick={() => navigate("/login")}
//           >
//             Go to Login
//           </button>
//           <button  // New: Quick retry
//             className="retry-btn"
//             onClick={() => window.location.reload()}
//           >
//             Retry Fetch
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const isVerified = user.isAccountVerified === true;
//   const verifiedStatus = isVerified ? "Verified" : "Unverified";
//   const verifiedClass = isVerified ? "status-verified" : "status-unverified";

//   return (
//     <div className="profile-container">
//       <div className="profile-card">
//         <h2>User Profile</h2>
        
//         <div className="profile-details">
//           <div className="detail-item">
//             <span className="label">Name</span>
//             <span className="value">{user.name || "N/A"}</span>
//           </div>

//           <div className="detail-item">
//             <span className="label">Email</span>
//             <span className="value">{user.email}</span>
//           </div>

//           <div className="detail-item">
//             <span className="label">Status</span>
//             <span className={`value ${verifiedClass}`}>
//               {verifiedStatus}
//             </span>
//           </div>
//         </div>

//         {error && <p className="error-msg">{error}</p>}
        
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProfilePage.css";

// Assuming you have an icon for the Logout button
// import { BiLogOutCircle } from "react-icons/bi"; 

export default function ProfilePage() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const localUser = localStorage.getItem('user');
    return localUser ? JSON.parse(localUser) : null;
  });

  const [error, setError] = useState("");
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Function to clear session data and redirect
  const clearSessionAndRedirect = (path = "/login") => {
    localStorage.removeItem('user');
    setUser(null);
    navigate(path, { replace: true });
  };

  const handleLogout = async () => {
    setIsLoggingOut(true);
    setError("");
    try {
      // NOTE: Assuming there's a logout endpoint that clears the HttpOnly cookie
      await axios.post("https://task-4-pt0q.onrender.com/api/user/logout", {}, {
        withCredentials: true,
      });
      // Regardless of the 200 response, client-side session must be cleared
      clearSessionAndRedirect("/login");
    } catch (err) {
      console.error("Logout failed:", err.response?.status, err.message);
      // Log out locally even if backend call fails (to avoid locked state)
      setError("Logout failed on server, but logging out locally.");
      setTimeout(() => clearSessionAndRedirect("/login"), 1500);
    } finally {
      setIsLoggingOut(false);
    }
  };


  useEffect(() => {
    const userExists = localStorage.getItem('user');

    if (!userExists) {
      setIsFetchingData(false);
      // Removed initial redirect to avoid flickering, let the final return handle it
      return;
    }

    const fetchUserData = async () => {
      setIsFetchingData(true);
      setError("");

      try {
        const response = await axios.get("https://task-4-pt0q.onrender.com/api/user/data", {
          withCredentials: true,
        });

        if (response.data && response.data.success && response.data.userData) {
          const fetchedUser = response.data.userData;
          setUser(fetchedUser);
          localStorage.setItem('user', JSON.stringify(fetchedUser));
        } else {
          setError(response.data.message || "No user data found. Please log in again.");
          clearSessionAndRedirect(null); // Clear session locally without immediate redirect
        }
      } catch (err) {
        console.error("User data fetch failed:", err.response?.status, err.message);
        if (err.response?.status === 401 || err.response?.status === 403) {
          setError("Session expired. Please log in again.");
        } else {
          setError("Failed to fetch profile. Check connection and try again.");
        }
        clearSessionAndRedirect(null); // Clear session locally without immediate redirect
      } finally {
        setIsFetchingData(false);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array means this runs once on mount

  if (isFetchingData) {
    return (
      <div className="profile-container">
        <div className="profile-card loading">
          {/* Re-added the ProfilePic container temporarily if you need an icon while loading */}
          {/* <div className="profile-pic-container"><div className="profile-pic"><FaUser /></div></div> */}
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
          <p className="error-msg">{error || "Unable to load profile. Please log in."}</p>
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
      <div className="bada">
<div className="profile-container">
      <div className="profile-card">
        {/* Placeholder for Profile Icon (Optional) */}
        {/* <div className="profile-pic-container">
          <div className="profile-pic"><FaUser /></div>
        </div> */}
        
        <h2>User Profile</h2>

        <div className="profile-details">
          {/* Name - Now in its own group */}
          <div className="detail-group">
            <span className="label">Name</span>
            <span className="value">{user.name || "N/A"}</span>
          </div>

          {/* Email - Now in its own group */}
          <div className="detail-group">
            <span className="label">Email</span>
            <span className="value">{user.email}</span>
          </div>

          {/* Status - Now in its own group */}
          <div className="detail-group">
            <span className="label">Status</span>
            <span className={`value ${verifiedClass}`}>
              {verifiedStatus}
            </span>
          </div>
          
          {/* Added placeholder for a potential 4th detail item (e.g., Role) */}
          {/* <div className="detail-group">
            <span className="label">Role</span>
            <span className="value">Gamer</span>
          </div> */}

        </div>

        {error && <p className="error-msg">{error}</p>}

        {/* LOGOUT BUTTON - Added back based on your original CSS/Intent */}
        <button
          className="logout-btn"
          onClick={handleLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? "Logging Out..." : "Logout"}
        </button>
      </div>
    </div>
    </div>
  );
}
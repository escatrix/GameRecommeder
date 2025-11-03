import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const LOGIN_API_URL = "https://task-4-pt0q.onrender.com/api/auth/login";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 

  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   setError("");
  //   setLoading(true);

  //   axios.post(LOGIN_API_URL, {
  //       email,    
  //       password, 
  //     })
  //     .then((response) => {
  //       // 
        
  //       console.log("API Success Response:", response.data);
  //       if (response.data && response.data.token) {
  //         localStorage.setItem('token', response.data.token);
  //         if (response.data.user) {
  //           localStorage.setItem('user', JSON.stringify(response.data.user));
  //         }
  //         navigate("/", { replace: true });

  //       } else {
  //         setError(response.data.message || "Invalid credentials provided.");
  //       }

  //       setLoading(false);
  //     })
  //     .catch((err) => {
  //       console.error("Login API error:", err);
  //       setError(
  //         err.response?.data?.message || "Login failed. Please try again."
  //       );
  //       setLoading(false);
  //     });
  // };

   const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Use await to pause execution until the API call is complete
      const response = await axios.post(
        LOGIN_API_URL, 
        {
          email,    
          password, 
        }, 
        // CRITICAL FIX: Must include withCredentials to send/receive JWT cookie
        { withCredentials: true } 
      );

      // Check for the backend's explicit success flag
      if (response.data && response.data.success === true) {
        
        // The backend sets the token via an HTTP-only cookie, 
        // so we don't need response.data.token. We just save the user data if provided.
        if (response.data.data) {
          // Assuming user data is nested under 'data' field in the backend response
          localStorage.setItem('user', JSON.stringify(response.data.data)); 
        }
        
        // Redirect to the home page upon successful login
        navigate("/", { replace: true });

      } else {
        // Handle explicit server-side validation failures that return success: false
        setError(response.data.message || "Login failed. Please check your credentials.");
      }

    } catch (err) {
      // Catch any network errors, 4xx, or 5xx response statuses
      console.error("Login API error:", err);
      setError(
        // Use optional chaining to safely access nested error messages
        err.response?.data?.message || "Login failed. Please check your credentials and try again."
      );
    } finally {
      // This block runs regardless of success or failure
      setLoading(false);
    }
  };
  return (
    <div className="form">
      <div className="auth-container">
        <div className="auth-card">
          <h2>Login</h2>
          <p>
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
           
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && <p className="error-msg">{error}</p>}

            <div className="auth-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="#">Forgot Password?</Link>
            </div>

            <button type="submit" className="auth-btn" disabled={loading}>
              {loading ? 'Logging In...' : 'Log In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

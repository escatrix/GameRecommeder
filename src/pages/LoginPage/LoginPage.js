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

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    axios.post(LOGIN_API_URL, {
        email,    
        password, 
      })
      .then((response) => {
        // 
        
        console.log("API Success Response:", response.data);
        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
          navigate("/", { replace: true });

        } else {
          setError(response.data.message || "Invalid credentials provided.");
        }

        setLoading(false);
      })
      .catch((err) => {
        console.error("Login API error:", err);
        setError(
          err.response?.data?.message || "Login failed. Please try again."
        );
        setLoading(false);
      });
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

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const LOGIN_API_URL = "https://backend-auth-ben6.onrender.com/api/auth/login";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(LOGIN_API_URL, {
        email,
        password,
      });

      // --- KEY CHANGE: Validate the RESPONSE DATA, not just the status ---
      // A successful login should return data including a token.
      // We check if 'response.data' and 'response.data.token' exist.
      if (response.data && response.data.token) {
        // --- Successful Login Logic ---

        // 1. Store the authentication token in localStorage.
        // This is crucial for keeping the user logged in across pages.
        localStorage.setItem('token', response.data.token);
        
        // 2. Optionally, save user data as well.
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }

        console.log("Login successful! Token received:", response.data.token);

        // 3. Navigate to the home page because validation was successful.
        navigate("/", { replace: true });

      } else {
        // --- Handle cases where the API responds 200 OK, but login failed ---
        // This happens if the credentials were wrong.
        setError(response.data.message || "Invalid credentials provided.");
      }
    } catch (err) {
      // This 'catch' block handles network errors or server-side crashes (e.g., 404, 500).
      console.error("Login API error:", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false); // Stop loading in all cases
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
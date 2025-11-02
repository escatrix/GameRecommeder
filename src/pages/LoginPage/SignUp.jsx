import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import axios from "axios";
import "./Auth.css";

// Define your API URLs
const SEND_OTP_URL = "https://backend-auth-ben6.onrender.com/api/auth/register/send-verify-otp";
const VERIFY_OTP_URL = "https://backend-auth-ben6.onrender.com/api/auth/verify-account";

export default function SignupPage() {
  // Use useNavigate for navigation after successful OTP verification
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [otpData, setOtpData] = useState({
    otp: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  // New state to control visibility of the OTP section
  const [showOtpSection, setShowOtpSection] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };
  
  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setOtpData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };


  // Step 1: Handle Initial Signup (Send OTP)
  const handleSignup = async (e) => {
    e.preventDefault();

    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // API call to register and send OTP
      const response = await axios.post(SEND_OTP_URL, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess("Registration successful! Check your email for the OTP.");
        // Set state to show the OTP verification section
        setShowOtpSection(true);
        // Optionally clear the password fields
        setFormData((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(
        err.response?.data?.message || "Failed to create account or send OTP. Try again!"
      );
    }
  };


  // Step 2: Handle OTP Verification
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!otpData.otp) {
        setError("Please enter the OTP.");
        return;
    }

    try {
      const response = await axios.post(VERIFY_OTP_URL, {
        email: formData.email, // Use the email from the initial form
        otp: otpData.otp,
      });

      if (response.status === 200 || response.status === 201) {
        setSuccess("Account verified successfully! Redirecting to login...");
        // Clear all data
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setOtpData({ otp: "" });
        // Redirect the user to the login page after a short delay
        setTimeout(() => {
            navigate("/login");
        }, 1500);
      }
    } catch (err) {
      console.error("OTP Verification error:", err);
      setError(
        err.response?.data?.message || "OTP verification failed. Please check the OTP and try again."
      );
    }
  };


  return (
    <div className="form">
      <div className="auth-container">
        <div className="auth-card">
          <h2>Sign up</h2>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>

          {/* Conditional Rendering: Show Signup Form OR OTP Verification Form */}
          {!showOtpSection ? (
            // --- Signup Form ---
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                placeholder="Set Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />

              {error && <p className="error-msg">{error}</p>}
              {success && <p className="success-msg">{success}</p>}

              <button type="submit" className="auth-btn">
                Register (Send OTP)
              </button>
            </form>
          ) : (
            // --- OTP Verification Section ---
            <form onSubmit={handleVerifyOtp}>
              <p>
                A verification code has been sent to **{formData.email}**.
                Please enter it below.
              </p>
              <input
                type="text"
                placeholder="Enter OTP (6 digits)"
                name="otp"
                value={otpData.otp}
                onChange={handleOtpChange}
                maxLength="6"
                required
              />
              
              {error && <p className="error-msg">{error}</p>}
              {success && <p className="success-msg">{success}</p>}

              <button type="submit" className="auth-btn">
                Verify Account
              </button>
              
              {/* Optional: Add a Resend OTP button */}
              <button 
                type="button" 
                className="auth-btn secondary" 
                onClick={handleSignup} // Re-use signup logic to resend OTP
                style={{ marginTop: '10px' }}
              >
                Resend OTP
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./Auth.css";

const SEND_OTP_URL = "https://task-4-pt0q.onrender.com/api/auth/register/send-verify-otp";
const VERIFY_OTP_URL = "https://task-4-pt0q.onrender.com/api/auth/verify-account";

export default function SignupPage() {
  const navigate = useNavigate();
  // const [confirm , setConfirm] =useState("") // <-- 
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
const [name, setName] = useState("");
  const [otpData, setOtpData] = useState({
    otp: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOtpSection, setShowOtpSection] = useState(false);

 
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);


  const handleOtpChange = (e) => {
    const { name, value } = e.target;
    setOtpData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setSuccess("");
  };

  const handleSignup = async(e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    
    setIsLoading(true);

    try {
      const response = await axios.post(SEND_OTP_URL, {
        name: name,
        email: email,
        password: password
      }, { withCredentials: true });

      console.log(response);
      

      setShowOtpSection(true);

    } catch(error) {
      console.log("Error in sending otp", error.message);
      if (error.response && error.response.status === 409) {
        setError("A user with this email already exists.");
      } else {
        setError(error.response?.data?.message || "Failed to send OTP. Please try again.");
      }
    }
    
    setIsLoading(false);
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!otpData.otp) {
      setError("Please enter the OTP.");
      return;
    }

    setIsVerifying(true);

    try {
      const response = await axios.post(VERIFY_OTP_URL, {
        otp: otpData.otp,
      },{withCredentials:true});

      if (response.status === 200 || response.status === 201) {
        setSuccess("Account verified successfully! Redirecting to login...");
        setOtpData({ otp: "" });
        
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError("OTP verification returned an unexpected status.");
      }

    } catch (err) {
      console.error("OTP Verification error:", err);
      
      if (err.response && err.response.status === 409) {
        setError("User already exists or the verification token is invalid.");
      } else {
        setError(
          err.response?.data?.message || "OTP verification failed. Please check the OTP and try again."
        );
      }
    }
    
    setIsVerifying(false);
  };


  return (
    <div className="form">
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign up</h2>
        <p>
        Already have an account? <Link to="/login">Login</Link>
        </p>

        {!showOtpSection ? (
          
        <form onSubmit={handleSignup}>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={name}
            onChange={(e)=>{setName(e.target.value)}}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            required
          />
          <input
            type="password"
            placeholder="Set Password"
            name="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            required
          />

          {error && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">{success}</p>}
          
          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Sending OTP..." : "Register (Send OTP)"}
          </button>
        </form>
        ) : (
          
        <form onSubmit={handleVerifyOtp}>
          <p>
            A verification code has been sent to <strong>{email}</strong>.
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

          <button type="submit" className="auth-btn" disabled={isVerifying}>
            {isVerifying ? "Verifying..." : "Verify Account"}
          </button>

          <button
            type="button"
            className="auth-btn secondary"
            onClick={handleSignup}
            disabled={isLoading} 
          >
            {isLoading ? "Resending..." : "Resend OTP"}
          </button>
        </form>
        )}
      </div>
    </div>
    </div>
  );
}
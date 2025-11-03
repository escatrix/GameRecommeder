import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./Auth.css";


const SEND_OTP_URL = "https://backend-auth-ben6.onrender.com/api/auth/register/send-verify-otp";
const VERIFY_OTP_URL = "https://backend-auth-ben6.onrender.com/api/auth/verify-account";

export default function SignupPage() {
  const navigate = useNavigate();
  const [confirm , setConfirm] =useState("")
  const[name,setName]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")


  // const [formData, setFormData] = useState({
  //   name: "",
  //   email: "",
  //   password: ""
  // });

  const [otpData, setOtpData] = useState({
    otp: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOtpSection, setShowOtpSection] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  //   setError("");
  //   setSuccess("");
  // };

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

    try{
      const response = await axios.post("https://backend-auth-ben6.onrender.com/api/auth/register/send-verify-otp",{
        name:name,
        email:email,
        password:password
      },{withCredentials:true})

      console.log(response)
      setName("")
      setEmail("")
      setPassword("")
    }catch(error){
      console.log("Error in sending otp",error.message)
    }

   
  };


  const handleVerifyOtp = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!otpData.otp) {
      setError("Please enter the OTP.");
      return;
    }

    axios
      .post(VERIFY_OTP_URL, {
        email: formData.email, // Use the email from the initial form
        otp: otpData.otp,
      })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setSuccess("Account verified successfully! Redirecting to login...");
          setFormData({ name: "", email: "", password: "", confirmPassword: "" });
          setOtpData({ otp: "" });
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      })
      .catch((err) => {

        console.error("OTP Verification error:", err);
        setError(
          err.response?.data?.message || "OTP verification failed. Please check the OTP and try again."
        );
      });
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
              {/* <input
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              /> */}

              {error && <p className="error-msg">{error}</p>}
              {success && <p className="success-msg">{success}</p>}

              <button type="submit" className="auth-btn">
                Register (Send OTP)
              </button>
            </form>
          ) : (
            
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

              <button
                type="button"
                className="auth-btn secondary"
                onClick={handleSignup} 
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
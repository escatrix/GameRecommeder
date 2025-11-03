// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./Auth.css";

// const LOGIN_API_URL = "https://task-4-pt0q.onrender.com/api/auth/login";

// export default function LoginPage() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   // const handleLogin = (e) => {
//   //   e.preventDefault();
//   //   setError("");
//   //   setLoading(true);

//   //   axios.post(LOGIN_API_URL, {
//   //       email,    
//   //       password, 
//   //     })
//   //     .then((response) => {
//   //       // 

//   //       console.log("API Success Response:", response.data);
//   //       if (response.data && response.data.token) {
//   //         localStorage.setItem('token', response.data.token);
//   //         if (response.data.user) {
//   //           localStorage.setItem('user', JSON.stringify(response.data.user));
//   //         }
//   //         navigate("/", { replace: true });

//   //       } else {
//   //         setError(response.data.message || "Invalid credentials provided.");
//   //       }

//   //       setLoading(false);
//   //     })
//   //     .catch((err) => {
//   //       console.error("Login API error:", err);
//   //       setError(
//   //         err.response?.data?.message || "Login failed. Please try again."
//   //       );
//   //       setLoading(false);
//   //     });
//   // };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {

//       const response = await axios.post(
//         LOGIN_API_URL,
//         {
//           email,
//           password,
//         },
//         { withCredentials: true }
//       );


//       if (response.data && response.data.success === true) {
//         if (response.data.data) {
//           localStorage.setItem('user', JSON.stringify(response.data.data));
//         }
//         navigate("/", { replace: true });
//       } else {
//         setError(response.data.message || "Login failed. Please check your credentials.");
//       }
//     } catch (err) {
//       console.error("Login API error:", err);
//       setError(
//         err.response?.data?.message || "Login failed. Please check your credentials and try again."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <div className="form">
//       <div className="auth-container">
//         <div className="auth-card">
//           <h2>Login</h2>
//           <p>
//             Don’t have an account? <Link to="/signup">Sign Up</Link>
//           </p>

//           <form onSubmit={handleLogin}>
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}

//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />

//             {error && <p className="error-msg">{error}</p>}

//             <div className="auth-options">
//               <label>
//                 <input type="checkbox" /> Remember me
//               </label>
//               <Link to="#">Forgot Password?</Link>
//             </div>

//             <button type="submit" className="auth-btn" disabled={loading}>
//               {loading ? 'Logging In...' : 'Log In'}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

// API Endpoints
const LOGIN_API_URL = "https://task-4-pt0q.onrender.com/api/auth/login";
const RESET_OTP_URL = "https://task-4-pt0q.onrender.com/api/auth/reset-otp";
const RESET_PASSWORD_URL = "https://task-4-pt0q.onrender.com/api/auth/resetPassword";

export default function LoginPage() {
  const navigate = useNavigate();

  // Primary States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  
  // UI States
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  // Controls which screen is shown: 'login', 'request_otp', 'reset_password'
  const [mode, setMode] = useState('login'); 

  // --- HANDLER FUNCTIONS ---

  const resetMessages = () => {
    setError("");
    setSuccess("");
    setLoading(false);
  };

  // --- 1. LOGIN HANDLER ---
  const handleLogin = async (e) => {
    e.preventDefault();
    resetMessages();
    setLoading(true);

    try {
      const response = await axios.post(
        LOGIN_API_URL,
        { email, password },
        { withCredentials: true }
      );

      if (response.data && response.data.success === true) {
        
        if (response.data.data) {
          localStorage.setItem('user', JSON.stringify(response.data.data));
        }
        
        navigate("/", { replace: true });

      } else {
        setError(response.data.message || "Login failed. Please check your credentials.");
      }

    } catch (err) {
      console.error("Login API error:", err);
      setError(
        err.response?.data?.message || "Login failed. Please check your credentials and try again."
      );
    } finally {
      setLoading(false);
    }
  };


  // --- 2. SEND RESET OTP HANDLER (Step 1 of Reset Flow) ---
  const handleSendResetOtp = async (e) => {
    e.preventDefault();
    resetMessages();
    
    if (!email) {
      setError("Please enter your email address to reset your password.");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(RESET_OTP_URL, { email });

      if (response.data && response.data.success === true) {
        setSuccess(response.data.message || "OTP sent! Check your email and proceed to reset.");
        // Move to the next screen to enter OTP and new password
        setMode('reset_password'); 
        setOtp('');
        setNewPassword('');
      } else {
        setError(response.data.message || "Failed to send OTP. Please check your email address.");
      }
    } catch (err) {
      console.error("Reset OTP error:", err);
      setError(err.response?.data?.message || "Error requesting OTP. Please try again later.");
    } finally {
      setLoading(false);
    }
  };


  // --- 3. RESET PASSWORD HANDLER (Step 2 of Reset Flow) ---
  const handleResetPassword = async (e) => {
    e.preventDefault();
    resetMessages();

    if (!email || !otp || !newPassword) {
      setError("Please fill in all required fields.");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post(RESET_PASSWORD_URL, {
        email: email,
        otp: otp,
        newPassword: newPassword,
      });

      if (response.data && response.data.success === true) {
        setSuccess(response.data.message || "Password successfully reset! Redirecting to login.");
        
        // Clear all fields and return to the login screen after a delay
        setTimeout(() => {
          setEmail('');
          setPassword('');
          setOtp('');
          setNewPassword('');
          setMode('login'); 
          setSuccess('');
        }, 2000);
      } else {
        setError(response.data.message || "Password reset failed. Invalid OTP or weak password.");
      }
    } catch (err) {
      console.error("Reset Password API error:", err);
      setError(err.response?.data?.message || "Error resetting password. Check OTP/email.");
    } finally {
      setLoading(false);
    }
  };


  // --- RENDER LOGIC ---

  const renderForm = () => {
    if (mode === 'request_otp') {
      // Step 1: Request OTP Screen
      return (
        <form onSubmit={handleSendResetOtp}>
          <h3>Forgot Password?</h3>
          <p>Enter your email to receive a password reset code.</p>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          
          {error && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">{success}</p>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Sending OTP...' : 'Send Reset Code'}
          </button>
          <button 
            type="button" 
            className="auth-btn secondary"
            onClick={() => { resetMessages(); setMode('login'); }}
            disabled={loading}
          >
            Back to Login
          </button>
        </form>
      );
    } else if (mode === 'reset_password') {
      // Step 2: Reset Password Screen
      return (
        <form onSubmit={handleResetPassword}>
          <h3>Reset Password</h3>
          <p>Code sent to: <strong>{email}</strong></p>
          
          <input
            type="text"
            placeholder="OTP (6 digits)"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength="6"
            required
          />
          
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          {error && <p className="error-msg">{error}</p>}
          {success && <p className="success-msg">{success}</p>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
          
          <button 
            type="button" 
            className="auth-btn secondary"
            onClick={handleSendResetOtp} // Resend logic
            disabled={loading}
          >
            Resend Code
          </button>
        </form>
      );
    } else {
      // Default: Login Screen
      return (
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
            {/* Link to trigger OTP Request mode */}
            <a 
              href="#"
              onClick={(e) => { 
                e.preventDefault(); 
                resetMessages(); 
                setMode('request_otp'); 
              }}
            >
              Forgot Password?
            </a>
          </div>

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? 'Logging In...' : 'Log In'}
          </button>
        </form>
      );
    }
  };

  return (
    <div className="form">
      <div className="auth-container">
        <div className="auth-card">
          <h2>{mode === 'login' ? 'Login' : 'Password Reset'}</h2>
          <p>
            {mode === 'login' ? 
              <>Don’t have an account? <Link to="/signup">Sign Up</Link></> : 
              'Securely reset your credentials.'
            }
          </p>

          {renderForm()}
          
        </div>
      </div>
    </div>
  );
}

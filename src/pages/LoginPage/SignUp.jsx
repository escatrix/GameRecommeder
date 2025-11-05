// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios"; 
// import "./Auth.css";


// const SEND_OTP_URL = "https://task-4-pt0q.onrender.com/api/auth/register/send-verify-otp";
// const VERIFY_OTP_URL = "https://task-4-pt0q.onrender.com/api/auth/verify-account";

// export default function SignupPage() {
//   const navigate = useNavigate();
//   const [confirm , setConfirm] =useState("")
//   const[name,setName]=useState("")
//   const[email,setEmail]=useState("")
//   const[password,setPassword]=useState("")


//   // const [formData, setFormData] = useState({
//   //   name: "",
//   //   email: "",
//   //   password: ""
//   // });

//   const [otpData, setOtpData] = useState({
//     otp: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [showOtpSection, setShowOtpSection] = useState(false);

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData((prev) => ({ ...prev, [name]: value }));
//   //   setError("");
//   //   setSuccess("");
//   // };

//   const handleOtpChange = (e) => {
//     const { name, value } = e.target;
//     setOtpData((prev) => ({ ...prev, [name]: value }));
//     setError("");
//     setSuccess("");
//   };

//   const handleSignup = async(e) => {
//     e.preventDefault();

//     setError("");
//     setSuccess("");

//     try{
//       const response = await axios.post("https://task-4-pt0q.onrender.com/api/auth/register/send-verify-otp",{
//         name:name,
//         email:email,
//         password:password
//       },{withCredentials:true})

//       console.log(response)
//       setName("")
//       setEmail("")
//       setPassword("")
//       setShowOtpSection(true)
//     // }// Inside handleSignup
//   } catch(error){
//     console.log("Error in sending otp", error.message);

//     // Add this part:
//     if (error.response && error.response.status === 409) {
//       setError("A user with this email already exists.");
//     } else {
//       // Show a generic error or the one from the backend
//       setError(error.response?.data?.message || "Failed to send OTP. Please try again.");
//     }
//   }

   
//   };


//   // const handleVerifyOtp = async(e) => {
//   //   e.preventDefault();

//   //   setError("");
//   //   setSuccess("");

//   //   if (!otpData.otp) {
//   //     setError("Please enter the OTP.");
//   //     return;
//   //   }

    

//   //   axios
//   //     .post(VERIFY_OTP_URL, {
//   //       email: email, // Use the email from the initial form
//   //       otp: otpData.otp,
//   //     })
//   //     .then((response) => {
//   //       if (response.status === 200 || response.status === 201) {
//   //         setSuccess("Account verified successfully! Redirecting to login...");
          
//   //         setOtpData({ otp: "" });
//   //         setTimeout(() => {
//   //           navigate("/login");
//   //         }, 1500);
//   //       }
//   //     })
//   //     .catch((err) => {

//   //       console.error("OTP Verification error:", err);
//   //       setError(
//   //         err.response?.data?.message || "OTP verification failed. Please check the OTP and try again."
//   //       );
//   //     });
//   // };
//   const handleVerifyOtp = async (e) => {
//   e.preventDefault();

//   setError("");
//   setSuccess("");

//   if (!otpData.otp) {
//     setError("Please enter the OTP.");
//     return;
//   }


//   // try {

//   //   const response = await axios.post(VERIFY_OTP_URL, {
//   //     // email: email, // Use the email from the initial form
//   //     otp: otpData.otp,
//   //   },{withCredentials:true});


//   //   if (response.status === 200 || response.status === 201) {
//   //     setSuccess("Account verified successfully! Redirecting to login...");
//   //     setOtpData({ otp: "" });
      
//   //     setTimeout(() => {
//   //       navigate("/login");
//   //     }, 1500);
//   //   }else if(response.status === 409){

//   //     setError("user already exist")
//   //   } 
//   //   else {
//   //     setError("OTP verification returned an unexpected status.");
//   //   }

//   // } catch (err) {

    
//   //   console.error("OTP Verification error:", err);
    
//   //   setError(
//   //     err.response?.data?.message || "OTP verification failed. Please check the OTP and try again."
//   //   );
//   // }
//   // Inside handleVerifyOtp
// try {
//   const response = await axios.post(VERIFY_OTP_URL, {
//     otp: otpData.otp,
//   },{withCredentials:true});

//   // Now you ONLY check for success cases here
//   if (response.status === 200 || response.status === 201) {
//     setSuccess("Account verified successfully! Redirecting to login...");
//     setOtpData({ otp: "" });
    
//     setTimeout(() => {
//       navigate("/login");
//     }, 1500);
//   } else {
//     // This is a good fallback, but 2xx are usually all you need to check
//     setError("OTP verification returned an unexpected status.");
//   }

// } catch (err) {
//   // ALL ERRORS (like 409) are caught here
//   console.error("OTP Verification error:", err);
  
//   // Now, check for the 409 status inside the catch block
//   if (err.response && err.response.status === 409) {
//     setError("User already exists or the verification token is invalid.");
//   } else {
//     // This is your original, good-practice error handling
//     setError(
//       err.response?.data?.message || "OTP verification failed. Please check the OTP and try again."
//     );
//   }
// }
// };


//   return (
//     <div className="form">
//     <div className="auth-container">
//       <div className="auth-card">
//         <h2>Sign up</h2>
//         <p>
//         Already have an account? <Link to="/login">Login</Link>
//         </p>

//         {!showOtpSection ? (
          
//         <form onSubmit={handleSignup}>
//           <input
//             type="text"
//             placeholder="Full Name"
//             name="name"
//             value={name}
//             onChange={(e)=>{setName(e.target.value)}}
//             required
//           />
//           <input
//           type="email"
//           placeholder="Email"
//           name="email"
//           value={email}
//           onChange={(e)=>{setEmail(e.target.value)}}
//          required
//           />
//           <input
//             type="password"
//             placeholder="Set Password"
//             name="password"
//             value={password}
//             onChange={(e)=>{setPassword(e.target.value)}}
//             required
            
//           />
          
//             {/* <input
//               type="password"
//               placeholder="Confirm Password"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 required
//               /> */}

//           {error && <p className="error-msg">{error}</p>}
//           {success && <p className="success-msg">{success}</p>}
//           <button type="submit" className="auth-btn">
//            Register (Send OTP)
//           </button>
//           </form>
//           ) : (
            
//           <form onSubmit={handleVerifyOtp}>
//           <p>
//             A verification code has been sent to **{email}**.
//             Please enter it below.
//             </p>
//           <input
//             type="text"
//           placeholder="Enter OTP (6 digits)"
//            name="otp"
//             value={otpData.otp}
//             onChange={handleOtpChange}
//              maxLength="6"
//             required
//               />

//         {error && <p className="error-msg">{error}</p>}
//          {success && <p className="success-msg">{success}</p>}

//         <button type="submit" className="auth-btn">
//             Verify Account
//           </button>

//           <button
//           type="button"
//           className="auth-btn secondary"
//           onClick={handleSignup} 
       
//           >
//             Resend OTP
//           </button>
//          </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./Auth.css";

const SEND_OTP_URL = "https://task-4-pt0q.onrender.com/api/auth/register/send-verify-otp";
const VERIFY_OTP_URL = "https://task-4-pt0q.onrender.com/api/auth/verify-account";

export default function SignupPage() {
  const navigate = useNavigate();
  // const [confirm , setConfirm] =useState("") // <-- Removed, was not used
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [otpData, setOtpData] = useState({
    otp: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showOtpSection, setShowOtpSection] = useState(false);

  // --- 1. Added Loading States ---
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
    
    // --- 2. Set Loading for Send/Resend ---
    setIsLoading(true);

    try {
      const response = await axios.post(SEND_OTP_URL, {
        name: name,
        email: email,
        password: password
      }, { withCredentials: true });

      console.log(response);
      
      // --- 3. CRITICAL FIX: Do NOT clear these states ---
      // Clearing them breaks the "Resend OTP" button and the
      // "code sent to {email}" message.
      // setName("")
      // setEmail("")
      // setPassword("")

      setShowOtpSection(true);

    } catch(error) {
      console.log("Error in sending otp", error.message);
      if (error.response && error.response.status === 409) {
        setError("A user with this email already exists.");
      } else {
        setError(error.response?.data?.message || "Failed to send OTP. Please try again.");
      }
    }
    
    // --- 4. Stop Loading ---
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

    // --- 5. Set Loading for Verify ---
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
    
    // --- 6. Stop Loading ---
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
          
          {/* --- 7. Updated Register Button --- */}
          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Sending OTP..." : "Register (Send OTP)"}
          </button>
        </form>
        ) : (
          
        <form onSubmit={handleVerifyOtp}>
          <p>
            {/* This will now work correctly since email state is not cleared */}
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

          {/* --- 8. Updated Verify Button --- */}
          <button type="submit" className="auth-btn" disabled={isVerifying}>
            {isVerifying ? "Verifying..." : "Verify Account"}
          </button>

          {/* --- 9. Updated Resend Button --- */}
          <button
            type="button"
            className="auth-btn secondary"
            onClick={handleSignup}
            disabled={isLoading} // Uses the same loading state as register
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
import React, { useState , memo } from "react";
import "./Navbar.css";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate} from "react-router-dom";
import { IoRadioButtonOnSharp } from "react-icons/io5";
import { PiFunctionDuotone } from "react-icons/pi";
import axios from "axios";



const Navbar = ({isLoggedIn=false , setIsLoggedIn}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  console.log('Navbar received isLoggedIn:', isLoggedIn);  // true after login
const navigate = useNavigate();
  const LOGOUT_API_URL = "https://task-4-pt0q.onrender.com/api/auth/logout";
  const handleLogout = async () => {
  try {
    const response = await axios.post(LOGOUT_API_URL, {}, { withCredentials: true });
    if (response.data.success) {
      console.log(response.data.message); 
    }
  } catch (error) {
    console.error("Logout API error:", error.response?.data?.message || error.message);
  } finally {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/', { replace: true });
  }
};

  return (
    <nav className="navbar" key={isLoggedIn ? 'logged-in' : 'logged-out'}>
      <div className="nav-left">
        <h1 className="logo">
          Game<span>Recommender</span>
        </h1>
      </div>

      

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`menu ${menuOpen ? "open" : ""}`}>
       
        <li><Link to="/">Home</Link></li>
        {/* <li><Link to="/login">Login</Link></li>
        <li className="signup"><Link to="/signup">Sign Up</Link></li> */}
        {isLoggedIn?(
          <li  onClick={handleLogout}>
             
              Logout
            
          </li>
        ):(
          <>
          <li><Link to="/login">Login</Link></li>
        <li className="signup"><Link to="/signup">Sign Up</Link></li> 
        </>
        )}
        {isLoggedIn && <li><Link to="/profile">Profile</Link></li>}
      </ul>
    </nav>
  );
};

export default memo(Navbar);

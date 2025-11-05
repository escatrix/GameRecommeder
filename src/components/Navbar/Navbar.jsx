import React, { useState } from "react";
import "./Navbar.css";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { IoRadioButtonOnSharp } from "react-icons/io5";
import { PiFunctionDuotone } from "react-icons/pi";

const Navbar = ({isLoggedIn , setIsLoggedIn}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  function handleLogout(){
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    Navigate('/')
  }

  return (
    <nav className="navbar">
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
          <li className="logout">
            <button onClick={handleLogout} className="nav-btn">
              Logout
            </button>
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

export default Navbar;

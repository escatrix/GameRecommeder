import React, { useState } from "react";
import "./Navbar.css";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="logo">
          Game<span>Recommender</span>
        </h1>
      </div>

      <div className="search">
        <FaSearch className="search-icon" />
        <input type="text" placeholder="Search Game" />
      </div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`menu ${menuOpen ? "open" : ""}`}>
       
        <li><Link to="/mlmodel">Try Now</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li className="signup"><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/profile">Profile</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;

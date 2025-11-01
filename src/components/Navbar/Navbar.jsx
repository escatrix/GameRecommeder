import React from "react";
import "./Navbar.css";
import { FaSearch ,FaUser , FaRegUserCircle} from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";



const Navbar = () => {
  return (
    <nav className="navbar">
     <div className="search"><FaSearch  className="icon" /><input placeholder="Search Game" /> </div>
     <div className="auth">
      
      <button className="sign">Sign Up </button>
      <button className="login">Login</button>
      <FaUserCircle className="proficon"/>
     </div>
      
    </nav>
  );
};

export default Navbar;

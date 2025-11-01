import React, { useState } from "react";
import { FaLock , FaUser ,FaCalendarAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import "./LoginPage.css";

function LoginPage() {
    const  [action , setAction] = useState('')
    const registerLink =()=>{
        setAction(' active')
    }
    const loginLink =()=>{
        setAction('')
    }
  
  return (
    <div className="bg-form">
    <div className={`wrapper ${action}`}>
        <div className="form-box login">
            <form>
                <h1>Login</h1>
                <div className="input-box">
                    <input type="text" placeholder="Email" required/>
                    <MdEmail className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required/>
                    <FaLock className="icon" />
                </div>
                <div className="remember-forget">
                    <label><input type="checkbox"/>Remember Me</label>
                    <a href="#"> Forget Password</a>
                </div>
                <button type="submit">Login</button>

                <div className="signup">
                    <p>Not a member ? <a href="#" onClick={registerLink}>SignUp Now</a></p>
                </div>
            </form>
        </div>


        <div className="form-box signup">
            <form>
                <h1>SignUp</h1>
                <div className="input-box">
                    <input type="text" placeholder="Name" required/>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                    <input type="date" placeholder="Age" required/>
                    <FaCalendarAlt className="icon"/>
                </div>
                <div className="input-box">
                    <input type="text" placeholder="Email" required/>
                    <MdEmail className="icon"/>
                </div>
                <div className="input-box">
                    <input type="password" placeholder="Password" required/>
                    <FaLock className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" placeholder="comfirm Password" required/>
                    <FaLock className="icon" />
                </div>
                <div className="remember-forget">
                    <label><input type="checkbox"/>I agree to the terms and conditions</label>
              
                </div>
                <button type="submit">SignUP</button>

                <div className="signup">
                    <p>Already a member ? <a href="#" onClick={loginLink}>LogIn</a></p>
                </div>
            </form>
        </div>
     
    </div>
    </div>
  );
}

export default LoginPage;


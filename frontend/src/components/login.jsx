import React, { useState } from 'react';
import './login.css';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

function Login() {
  const [action, setAction] = useState("Login");

  return (
    <div className="container">
      <div className="header">
      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => { if (action !== "Sign Up") setAction("Sign Up"); }}
        >
          Sign Up
        </div>
        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => { if (action !== "Login") setAction("Login"); }}
        >
          Login
        </div>
      </div>
        

        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        {action === "Login" ? null : (
          <div className="input">
            <img src={user_icon} alt="" />
            <input type="text" placeholder="Name" />
          </div>
        )}

        <div className="input">
          <img src={email_icon} alt="" />
          <input type="email" placeholder="Email" />
        </div>

        <div className="input">
          <img src={password_icon} alt="" />
          <input type="password" placeholder="Password" />
        </div>

        {action === "Sign Up" ? null : (
          <div className="forgot-password">
            Lost Password? <span>Click Here!</span>
          </div>
        )}
      </div>
      <div className="submit-container">
      <div className="submit-2">
        Submit
      </div>
      </div>
     </div>
  );
}

export default Login;

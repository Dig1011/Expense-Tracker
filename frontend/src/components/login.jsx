import React, { useState } from 'react';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

function Login() {
  const [action, setAction] = useState("Login");

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      <div className="flex flex-col items-center bg-transparent pb-8 w-full max-w-md mx-auto">
        <div className="flex flex-col items-center gap-2.5 w-full mt-5">
          <div className="flex gap-7 mt-8">
            <div
              className={`flex justify-center items-center p-2 text-white bg-indigo-700 font-bold cursor-pointer rounded-full text-lg ${action === "Login" ? "bg-opacity-50 text-gray-400 " : "w-52"}`}
              onClick={() => { if (action !== "Sign Up") setAction("Sign Up"); }}
            >
              Sign Up
            </div>
            <div
              className={`flex justify-center items-center p-2 text-black bg-indigo-700 font-bold cursor-pointer rounded-full text-lg ${action === "Sign Up" ? "bg-opacity-50 text-gray-400" : "w-52"}`}
              onClick={() => { if (action !== "Login") setAction("Login"); }}
            >
              Login
            </div>
          </div>

          <div className="text-5xl text-gray-200 font-medium">{action}</div>
          <div className="w-12 h-2 rounded-lg bg-gray-200"></div>
        </div>

        <div className="flex flex-col gap-5 mt-9">
          {action === "Login" ? null : (
            <div className="flex items-center mx-auto w-96 h-18 bg-opacity-80 bg-gray-300 rounded-lg">
              <img src={user_icon} alt="" className="ml-4 mr-4" />
              <input type="text" placeholder="Name" className="h-10 w-80 bg-transparent border-none outline-none text-black text-xl" />
            </div>
          )}

          <div className="flex items-center mx-auto w-96 h-18 bg-opacity-80 bg-gray-300 rounded-lg">
            <img src={email_icon} alt="" className="ml-4 mr-4" />
            <input type="email" placeholder="Email" className="h-10 w-80 bg-transparent border-none outline-none text-black text-xl" />
          </div>

          <div className="flex items-center mx-auto w-96 h-18 bg-opacity-80 bg-gray-300 rounded-lg">
            <img src={password_icon} alt="" className="ml-4 mr-4" />
            <input type="password" placeholder="Password" className="h-10 w-80 bg-transparent border-none outline-none text-black text-xl" />
          </div>

          {action === "Sign Up" ? null : (
            <div className="pl-16 mt-5 text-xl text-gray-200">
              Lost Password? <span className="text-purple-700 cursor-pointer font-medium">Click Here!</span>
            </div>
          )}
        </div>
        <div className="flex gap-7 mt-14">
          <div className="flex justify-center items-center w-52 h-15 text-white bg-purple-300 font-bold cursor-pointer rounded-full text-xl">
            Submit
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

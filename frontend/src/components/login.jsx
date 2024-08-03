import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';

function Login() {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (action === "Sign Up") {
        await axios.post('http://localhost:5000/signup', {
          username: formData.email,
          password: formData.password
        });
        setSuccess('User created successfully');
      } else {
        const response = await axios.post('http://localhost:5000/signin', {
          username: formData.email,
          password: formData.password
        });
        setSuccess('User logged in successfully');
        localStorage.setItem('token', response.data.token);
        setTimeout(() => {
          navigate('/add');
        }, 1000);
      }
      setError('');
    } catch (err) {
      setError('Error during authentication');
      setSuccess('');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="flex flex-col items-center bg-white p-8 w-full max-w-md rounded-xl shadow-lg">
        <div className="flex flex-col items-center gap-2.5 w-full mt-5">
          <div className="flex gap-7 mt-8">
            <div
              className={`flex justify-center items-center px-6 py-3 font-bold cursor-pointer rounded-full text-lg transition-all duration-300 ${action === "Login" ? "bg-gray-300 text-gray-700" : "bg-indigo-700 text-white"}`}
              onClick={() => { if (action !== "Sign Up") setAction("Sign Up"); }}
            >
              Sign Up
            </div>
            <div
              className={`flex justify-center items-center px-6 py-3 font-bold cursor-pointer rounded-full text-lg transition-all duration-300 ${action === "Sign Up" ? "bg-gray-300 text-gray-700" : "bg-indigo-700 text-white"}`}
              onClick={() => { if (action !== "Login") setAction("Login"); }}
            >
              Login
            </div>
          </div>

          <div className="text-4xl text-gray-800 font-semibold mt-6">{action}</div>
          <div className="w-16 h-2 mt-2 rounded-full bg-indigo-700"></div>
        </div>

        <div className="flex flex-col gap-5 mt-9 w-full">
          {action === "Login" ? null : (
            <div className="flex items-center w-full h-14 bg-gray-200 rounded-lg px-4">
              <img src={user_icon} alt="User Icon" className="mr-4" />
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="flex-grow bg-transparent border-none outline-none text-gray-800 text-lg"
              />
            </div>
          )}

          <div className="flex items-center w-full h-14 bg-gray-200 rounded-lg px-4">
            <img src={email_icon} alt="Email Icon" className="mr-4" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="flex-grow bg-transparent border-none outline-none text-gray-800 text-lg"
            />
          </div>

          <div className="flex items-center w-full h-14 bg-gray-200 rounded-lg px-4">
            <img src={password_icon} alt="Password Icon" className="mr-4" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="flex-grow bg-transparent border-none outline-none text-gray-800 text-lg"
            />
          </div>

          {action === "Sign Up" ? null : (
            <div className="text-right mt-5 text-lg text-gray-600">
              Lost Password? <span className="text-indigo-700 cursor-pointer font-medium">Click Here!</span>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center mt-14">
          <div
            className="flex justify-center items-center w-52 h-14 text-white bg-indigo-700 font-bold cursor-pointer rounded-full text-xl transition-transform transform hover:scale-105"
            onClick={handleSubmit}
          >
            Submit
          </div>
        </div>

        {error && <div className="mt-4 text-red-500">{error}</div>}
        {success && <div className="mt-4 text-green-500">{success}</div>}
      </div>
    </div>
  );
}

export default Login;

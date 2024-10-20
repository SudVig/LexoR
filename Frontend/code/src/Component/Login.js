import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyUser } from './Api'; // Assume this is your API function to verify a user
import { UserContext } from '../App';

function Login() {
  const { loginId, setloginid } = useContext(UserContext);
  const navigate = useNavigate(); // Hook to get navigate object
  const [error, setError] = useState(null); // State for managing error messages

  useEffect(() => {
    const storedLoginId = localStorage.getItem("loginid");
    if (storedLoginId) {
      navigate('/Home'); // Redirect to home if already logged in
    }
  }, [navigate]);

  async function login(event) {
    event.preventDefault(); // Prevent default form submission

    const email = event.target.email.value; // Get email value
    const password = event.target.password.value; // Get password value

    try {
      const response = await verifyUser(email, password);
      console.log(response);
      if (response) {
        // Store login id and navigate to home after successful login
        localStorage.setItem("loginid", response.user.uid);
        setloginid(response.user.uid); // Assuming response contains login id
        navigate('/Home'); 
      } else {
        setError(response.message || 'Login failed. Please try again.'); // Set error message from response
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'An error occurred. Please try again.'); // Generic error message
    }
  }

  function handleSignupRedirect() {
    navigate('/signup'); // Navigate to the signup page
  }

  return (
    <div className="min-h-screen bg-slate-800 transition-opacity duration-300 flex items-center justify-center">
      <section className='flex flex-col sm:flex-row w-full max-w-4xl shadow-lg rounded-lg overflow-hidden space-y-6 sm:space-y-0'>
        {/* Left Section - Login Form */}
        <div className='left bg-gradient-to-br from-slate-900 to-gray-800 w-full sm:w-1/2 p-8 flex flex-col justify-center space-y-6 animate__animated animate__fadeInLeft'>
          <h1 className='text-white text-3xl font-semibold text-center animate__animated animate__bounceIn'>Login</h1>
          <form className='flex flex-col items-center space-y-4' onSubmit={login} method="post">
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder='Enter your Email' 
              className='w-full rounded-lg bg-transparent border-2 border-orange-500 p-1 focus:outline-none caret-white text-white max-w-64 animate__animated animate__fadeInUp transition-all duration-300 focus:border-orange-400 focus:shadow-lg outline-none' 
              autoComplete="off"
              required
            />
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder='Enter your Password' 
              className='w-full rounded-lg bg-transparent border-2 border-orange-500 p-1 focus:outline-none caret-white text-white max-w-64 animate__animated animate__fadeInUp transition-all duration-300 focus:border-orange-400 focus:shadow-lg outline-none' 
              autoComplete="off"
              required
            />
            <input 
              type='submit' 
              value="Login" 
              className='bg-gradient-to-tr from-orange-400 to-orange-600 pr-6 pl-6 pb-1 pt-1 rounded-lg hover:opacity-75 transition-opacity duration-300 text-white font-bold text-base animate__animated animate__pulse animate__infinite' 
            />
            {error && <p className='text-red-500 text-xs'>{error}</p>} {/* Display error message */}
            <p className='text-white text-xs cursor-pointer hover:text-orange-400 transition duration-300' onClick={handleSignupRedirect}>Don't have an account? Sign Up</p>
          </form>
        </div>

        {/* Right Section - Branding */}
        <div className='right bg-gradient-to-tr from-orange-500 to-orange-700 w-full sm:w-1/2 hidden sm:flex flex-col justify-center p-8 space-y-6 animate__animated animate__fadeInRight'>
          <h1 className='text-white text-4xl font-bold text-center animate__animated animate__zoomIn'>LexoR</h1>
          <p className='text-white max-w-md mx-auto text-center text-lg'>
            "The only way to do great work is to love what you do." - Steve Jobs
          </p>
        </div>
      </section>
    </div>
  );
}

export default Login;

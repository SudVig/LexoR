import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUser } from './Api'; // Assume this is your API function to create a user

function Signup() {
  const navigate = useNavigate(); // Hook to get navigate object
  const [error, setError] = useState(null); // State for managing error messages

  useEffect(() => {
    const storedLoginId = localStorage.getItem("loginid");
    if (storedLoginId) {
      navigate('/Home'); // Redirect to home if already logged in
    }
  }, [navigate]);

  function handleLoginRedirect() {
    navigate('/'); // Navigate to the login page
  }

  // Function to check if the password is strong
  function isStrongPassword(password) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  async function signup(event) {
    event.preventDefault(); // Prevent default form submission

    const name = event.target.Name.value; // Get name value
    const email = event.target.email.value; // Get email value
    const password = event.target.password.value; // Get password value
    const cpassword = event.target.cpassword.value; // Get confirm password value

    // Basic validation
    if (password !== cpassword) {
      setError('Passwords do not match. Please try again.'); // Set error message
      return;
    }

    // Check if the password is strong
    if (!isStrongPassword(password)) {
      setError('Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters.'); // Set error message
      return;
    }

    try {
      const response = await createUser(name, email, password);
      if (response.success) {
        // Navigate to login or home after successful signup
        navigate('/'); // Change to the home page if you want
      } else {
        setError(response.message || 'Signup failed. Please try again.'); // Set error message from response
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || 'An error occurred. Please try again.'); // Generic error message
    }
  }

  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center">
      <section className='flex flex-col sm:flex-row w-full max-w-4xl shadow-lg rounded-lg overflow-hidden'>
        {/* Left Section - Signup Form */}
        <div className='bg-gradient-to-br from-slate-900 to-slate-800 w-full sm:w-1/2 p-8 flex flex-col justify-center space-y-6'>
          <h1 className='text-white text-3xl font-semibold text-center'>Sign Up</h1>
          <form className='flex flex-col items-center space-y-4' onSubmit={signup}>
            <input 
              type="text" 
              name="Name" 
              id="Name" 
              placeholder='Enter your Name' 
              className='w-full rounded-lg bg-transparent border-2 border-orange-500 p-2 focus:outline-none caret-white text-white max-w-64 focus:border-orange-400 transition duration-300' 
              required
            />
            <input 
              type="email" 
              name="email" 
              id="email" 
              placeholder='Enter your Email' 
              className='w-full rounded-lg bg-transparent border-2 border-orange-500 p-2 focus:outline-none caret-white text-white max-w-64 focus:border-orange-400 transition duration-300' 
              required
            />
            <input 
              type="password" 
              name="password" 
              id="password" 
              placeholder='Enter your Password' 
              className='w-full rounded-lg bg-transparent border-2 border-orange-500 p-2 focus:outline-none caret-white text-white max-w-64 focus:border-orange-400 transition duration-300' 
              required
            />
            <input 
              type="password" 
              name="cpassword" 
              id="cpassword" 
              placeholder='Confirm Password' 
              className='w-full rounded-lg bg-transparent border-2 border-orange-500 p-2 focus:outline-none caret-white text-white max-w-64 focus:border-orange-400 transition duration-300' 
              required
            />
            <input 
              type='submit' 
              value="Sign Up" 
              className='bg-gradient-to-tr from-orange-400 to-orange-600 pr-6 pl-6 pb-1 pt-1 rounded-lg hover:opacity-75 transition-opacity duration-300 text-white font-bold text-base' 
            />
            {error && <p className='text-red-500 text-xs'>{error}</p>} {/* Display error message */}
            <p className='text-white text-xs cursor-pointer hover:text-orange-400 transition duration-300' onClick={handleLoginRedirect}>
              Already Have Account? Login
            </p>
          </form>
        </div>

        {/* Right Section - Branding */}
        <div className='bg-gradient-to-tr from-orange-500 to-orange-700 w-full sm:w-1/2 hidden sm:flex flex-col justify-center p-8 space-y-6'>
          <h1 className='text-white text-4xl font-bold text-center'>LexoR</h1>
          <p className='text-white max-w-md mx-auto text-center text-lg'>
            "The only way to do great work is to love what you do." - Steve Jobs
          </p>
        </div>
      </section>
    </div>
  );
}

export default Signup;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';  // Import a CSS file for styling

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.ok) {
        // Navigate to login page on successful registration
        navigate('/login');
      } else {
        // Handle errors
        const result = await response.json();
        setError(result.message || 'Registration failed');
      }
    } catch (error) {
      setError('An error occurred during registration');
    }
  };

  return (
    <div className="signup-container">
      <button className="back-button" onClick={handleBackToHome}>×</button>
      <h1>Sign Up</h1>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;
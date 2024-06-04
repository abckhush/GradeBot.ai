import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/signup');
  };

  return (
    <div>
      <h1>Welcome to Our Application</h1>
      <div>
        <button onClick={handleLoginClick}>Login</button>
        <button onClick={handleRegisterClick}>Register</button>
      </div>
    </div>
  );
}

export default Home;
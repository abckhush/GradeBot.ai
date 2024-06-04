import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; 
import icon from './icon.png';

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/signup');
  };

  return (
    <div className='home-container'>
      <div className='home-header'>
      <h1>GradeBot.ai</h1>
      <img src={icon} alt="gradebot.ai" className='home-icon' />
      </div>
      <h3>Calculate grades efficiently and easily. </h3>
      <h4>Save Time, Grade Smarter</h4> 
      <div className="home-foot">
        <button className="login" onClick={handleLoginClick}>Login</button> <br />
        <div className='gap-home'>Don't have an account?<button className="register" onClick={handleRegisterClick}>Register Now</button>
      </div></div>
    </div>
  );
}

export default Home;
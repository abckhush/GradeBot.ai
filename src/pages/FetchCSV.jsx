import React, { useState, useEffect } from "react";
import { FaLockOpen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './FetchCSV.css';
import icon from './icon.png';

const FetchCSV = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [csvFiles, setCsvFiles] = useState([]);

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    fetchCsvFiles();
  }, []);

  const fetchCsvFiles = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/csv-files', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const files = await response.json();
      setCsvFiles(files);
    } catch (error) {
      console.error('Error fetching CSV files:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/main');
  };

  return (
    <div className="csv-container">
      <div className='csv-header'>
        <div className='icon-csv-head'>
          <img src={icon} alt="gb" className='csv-icon' />
          <h3>GradeBot.ai</h3>
        </div>
        <div className="user-info">
          <button onClick={handleLogout} className="csv-logout"><b>Logout</b> <FaLockOpen size={18} /></button>
        </div>
      </div>
      <div className="csv-text">
        <h3>Hi, {username}.</h3>
      </div>
        <button className="back-button" onClick={handleBackToHome}>×</button>
      <div className="csv-filess">
        <h3>Here are your previous CSV files.</h3>
        <ul>
          {csvFiles.map((file, index) => (
              <li key={index}>
              <a href={`data:text/csv;charset=utf-8,${encodeURIComponent(file.csvData)}`} download={`grading_results_${index}.csv`}>
                Download CSV from {new Date(file.createdAt).toLocaleString()}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FetchCSV;

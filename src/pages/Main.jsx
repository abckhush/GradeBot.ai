import React, { useState, useEffect } from "react";
import { FaFilePdf, FaFileArchive, FaLockOpen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import icon from './icon.png';

const Main = () => {
  const navigate = useNavigate();
  const [zipFile, setZipFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [zipFileName, setZipFileName] = useState('Upload Student\'s Answers');
  const [pdfFileName, setPdfFileName] = useState('Upload Answer Key');
  const [result, setResult] = useState(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate('/');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (event.target.id === 'zip-upload') {
      setZipFile(file);
      setZipFileName(file.name);
    } else {
      setPdfFile(file);
      setPdfFileName(file.name);
    }
  };

  const handleCSVClick = () => {
    navigate('/csv-files');
  };

  const handleFileUpload = async () => {
    if (!zipFile || !pdfFile) {
      alert('Please select both ZIP and PDF files.');
      return;
    }

    const formData = new FormData();
    formData.append('zipFile', zipFile);
    formData.append('pdfFile', pdfFile);

    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:5000/upload-files', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        setResult(result);
    } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
    }
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="main-container">
      <div className='main-header'>
        <div className='icon-main-head'>
          <img src={icon} alt="gb" className='main-icon' />
          <h3>GradeBot.ai</h3>
        </div>
        <div className="user-info">
          <button onClick={handleLogout} className="main-logout"><b>Logout</b> <FaLockOpen size={18} /></button>
        </div>
      </div>
      <div className="main-text">
        <h3>Hi, {username}.</h3>
        <p>GradeBot is here to help you with grading answers. Let's make your task easy. Shall we?</p>
        <button className="csv" onClick={handleCSVClick}>Preview Previous CSV Files</button>
      </div>
      <div className='main-foot'>
        <div className="upload-icon">
          <label htmlFor="zip-upload">
            <FaFileArchive size={64} />
            <p>{zipFileName}</p>
          </label>
          <input
            id="zip-upload"
            type="file"
            accept=".zip"
            className="upload-input"
            onChange={handleFileChange}
          />
        </div>
        <div className="upload-icon">
          <label htmlFor="pdf-upload">
            <FaFilePdf size={64} />
            <p>{pdfFileName}</p>
          </label>
          <input
            id="pdf-upload"
            type="file"
            accept=".pdf"
            className="upload-input"
            onChange={handleFileChange}
          />
        </div>
      </div>
      <button onClick={handleFileUpload}>Submit Answers</button>

      {result && (
        <div className="result">
          <p>Grades calculated successfully.</p>
          <a href={`data:text/csv;charset=utf-8,${encodeURIComponent(result.csvData)}`} download="grading_results.csv"><span>Download CSV</span></a>
        </div>
      )}
    </div>
  );
};

export default Main;

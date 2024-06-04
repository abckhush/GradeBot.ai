import React, {useState} from "react";
import { FaFilePdf, FaFileArchive, FaLockOpen} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Main.css';
import icon from './icon.png';

const Main = () => {
  const navigate = useNavigate();
  const [zipFile, setZipFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [result, setResult] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/');
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (event.target.id === 'zip-upload') {
      setZipFile(file);
    } else {
      setPdfFile(file);
    }
  };

  const handleFileUpload = async () => {
    if (!zipFile || !pdfFile) {
      alert('Please select both ZIP and PDF files.');
      return;
    }

    const formData = new FormData();
    formData.append('zipFile', zipFile);
    formData.append('pdfFile', pdfFile);

    try {
      const response = await fetch('http://localhost:5000/upload-files', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      setResult(result);
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
        <h3>Hi, User.</h3>
        <p>GradeBot is here to help you with grading answers. Let's make your task easy. Shall we?</p>
      </div>
      <div className='main-foot'>
      <div className="upload-icon">
        <label htmlFor="zip-upload">
          <FaFileArchive size={64} />
          <p>Upload Student's Answers</p>
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
          <p>Upload Answer Key</p>
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
      <button onClick={handleFileUpload}>Upload Files</button>

      {result && (
        <div className="result">
          <p>Files processed successfully.</p>
          <a href={`data:text/csv;charset=utf-8,${encodeURIComponent(result.csvData)}`} download="grading_results.csv"><span>Download CSV</span></a>
        </div>
      )}
    </div>
  );
};

export default Main;

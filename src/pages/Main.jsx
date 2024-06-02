import React from 'react';
import { FaFilePdf, FaFileArchive } from 'react-icons/fa';
import './Main.css'; 

const Main = () => {
  const handlePdfUpload = (event) => {
    const file = event.target.files[0];
    console.log('Uploaded PDF:', file);
  };

  const handleZipUpload = (event) => {
    const file = event.target.files[0];
    console.log('Uploaded ZIP:', file);
  };

  return (
    <div className="main-container">
      <div className="upload-icon">
        <label htmlFor="pdf-upload">
          <FaFilePdf size={64} />
          <p>Upload PDF</p>
        </label>
        <input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          className="upload-input"
          onChange={handlePdfUpload}
        />
      </div>
      <div className="upload-icon">
        <label htmlFor="zip-upload">
          <FaFileArchive size={64} />
          <p>Upload ZIP</p>
        </label>
        <input
          id="zip-upload"
          type="file"
          accept=".zip"
          className="upload-input"
          onChange={handleZipUpload}
        />
      </div>
    </div>
  );
};

export default Main;

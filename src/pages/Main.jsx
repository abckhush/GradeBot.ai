import React, { useState } from 'react';
import { FaFilePdf, FaFileArchive } from 'react-icons/fa';
import './Main.css';

const Main = () => {
  const [zipFile, setZipFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [result, setResult] = useState(null);

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
          onChange={handleFileChange}
        />
      </div>
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
          onChange={handleFileChange}
        />
      </div>
      <button onClick={handleFileUpload}>Upload Files</button>

      {result && (
        <div className="result">
          <p>Files processed successfully.</p>
          <a href={`data:text/csv;charset=utf-8,${encodeURIComponent(result.csvData)}`} download="grading_results.csv">Download CSV</a>
        </div>
      )}
    </div>
  );
};

export default Main;

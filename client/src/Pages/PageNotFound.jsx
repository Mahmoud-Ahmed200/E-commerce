// src/components/PageNotFound.jsx (or src/pages/PageNotFound.jsx)
import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css'; // We'll create this CSS file next

function PageNotFound() {
  return (
    <div className="page-not-found-container">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-text text-danger">Oops! The page you're looking for doesn't exist!</p>
      <Link to="/" className="back-home-btn">Go to Homepage</Link>
      {}
    </div>
  );
}

export default PageNotFound;
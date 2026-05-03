import React from 'react';
import './Loader.css';

export const Loader: React.FC = () => {
  return (
    <div className="loader-container" aria-label="Loading content" role="status">
      <div className="loader"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

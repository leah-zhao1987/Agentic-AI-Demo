import { Link } from 'react-router-dom';
import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="mb-6">
          <div className="text-6xl font-bold text-blue-600 animate-pulse">404</div>
          <h1 className="text-2xl font-bold text-gray-800 mt-4">Page Not Found</h1>
          <div className="h-1 w-24 bg-blue-500 mx-auto my-4"></div>
        </div>        
        <div>
          <Link 
            to="/" 
            className="inline-flex items-center px-6 py-3 text-white font-semibold bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <svg 
              className="h-5 w-5 mr-2" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
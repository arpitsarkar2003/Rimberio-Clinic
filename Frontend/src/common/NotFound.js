import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({isDarkMode}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center`}>
      <video src="/404.mp4" autoPlay loop muted alt="404 GIF" className="mb-4 w-[40%]" />
      <p className={`${isDarkMode ? 'text-white text-2xl font-bold' : 'text-black text-2xl font-bold'}`}>Oops! The page you're looking for doesn't exist.</p>
      <div className='mt-4'>
        <Link className='bgcolor hover:bg-[#808000] text-white font-bold py-2 px-4 rounded mt-4 transition duration-150' to="/">
        Go Back to Home
        </Link>
        
      </div>
    </div>
  );
};

export default NotFound;
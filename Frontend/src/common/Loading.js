import React from 'react';

const Loading = ({ isDarkMode }) => {
  return (
    <div className="loading-overlay flex flex-col items-center">
    <img src={`${isDarkMode ? '/images/logos/logo_home_header_dark.png' : '/images/logos/logo_home_header_white.png'}`} alt="logo" className="logo mx-auto max-w-sm" />
      <img src="/HeartLoading.gif" alt="Loading..." className="loading-gif" />
      <style jsx>{`
        .loading-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }
        .loading-gif {
          width: 70px; /* Adjust size as needed */
          height: auto;
        }
      `}</style>
    </div>
  );
};

export default Loading;

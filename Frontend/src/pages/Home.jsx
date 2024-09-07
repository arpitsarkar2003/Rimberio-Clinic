import React from 'react'

function Home({isDarkMode}) {
  return (
    <div>
        <div className={`App flex-col flex justify-center items-center h-[60vh] ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <img src={`${isDarkMode ? '/images/logos/logo_home_header_dark.png' : '/images/logos/logo_home_header_white.png'}`} alt="logo" className="logo mx-auto max-w-sm" />
      <h1 className={`text-3xl font-bold font-customcali tracking-wide ${isDarkMode ? 'text-white' : 'text-black'}`}>Site under construction !!</h1>
    </div>
    <div className={`App flex-col flex justify-center items-center h-screen ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <img src={`${isDarkMode ? '/images/logos/logo_home_header_dark.png' : '/images/logos/logo_home_header_white.png'}`} alt="logo" className="logo mx-auto max-w-sm" />
      <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Site under construction !!</h1>
    </div>
    <div className={`App flex-col flex justify-center items-center h-screen ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <img src={`${isDarkMode ? '/images/logos/logo_home_header_dark.png' : '/images/logos/logo_home_header_white.png'}`} alt="logo" className="logo mx-auto max-w-sm" />
      <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Site under construction !!</h1>
    </div>
    <div className={`App flex-col flex justify-center items-center h-screen ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <img src={`${isDarkMode ? '/images/logos/logo_home_header_dark.png' : '/images/logos/logo_home_header_white.png'}`} alt="logo" className="logo mx-auto max-w-sm" />
      <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Site under construction !!</h1>
    </div>
    
    </div>
  )
}

export default Home
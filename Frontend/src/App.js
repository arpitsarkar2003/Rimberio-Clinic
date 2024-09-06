import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const color = "white";

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(prefers-color-scheme: ${color})`);
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e) => {
      setIsDarkMode(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);


  return (
    <>
     <div className={`App flex-col flex justify-center items-center h-screen ${isDarkMode ? 'bg-black' : 'bg-white'}`}>
      <img src={`${isDarkMode ? '/images/logos/logo_home_header_dark.png' : '/images/logos/logo_home_header_white.png'}`} alt="logo" className="logo mx-auto max-w-sm" />
      <h1 className={`text-3xl font-bold ${isDarkMode ? 'text-white' : 'text-black'}`}>Site under construction !!</h1>
    </div>
    
    </>
   
  );
}

export default App;

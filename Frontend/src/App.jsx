import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './common/NotFound';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/patient/MyProfile';
import MyAppoientment from './pages/patient/MyAppoientment';
import Appoientment from './pages/Appoientment';
import Doctors from './pages/Doctors';
import Navbar from './component/Navbar';
import MobileNavbar from './component/MobileNavbar';
import Loading from './common/Loading';


function App() {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const color = "white";

  const isAuth = false;


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

  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);


  return (
    <>

      {loading && <Loading isDarkMode={isDarkMode}/>}
      <div className='mx-4 sm:mx-[9%] font-customcali tracking-wide'>
        <div className="hidden xl:block">
          <Navbar isDarkMode={isDarkMode} />
        </div>
        <div className="block xl:hidden">
          <MobileNavbar isDarkMode={isDarkMode} />
        </div>
        <div className='mt-[7rem]'>
          <Routes>
            <Route path='/' element={<Home isDarkMode={isDarkMode} />} />
            <Route path='/about' element={<About isDarkMode={isDarkMode} />} />
            <Route path='/contact' element={<Contact isDarkMode={isDarkMode} />} />
            <Route path='/my-profile' element={<MyProfile isDarkMode={isDarkMode} />} />
            <Route path='/my-appointments' element={<MyAppoientment isDarkMode={isDarkMode} />} />
            <Route path='/appointment/:docId' element={<Appoientment isDarkMode={isDarkMode} />} />
            <Route path='/doctors' element={<Doctors isDarkMode={isDarkMode} />} />
            <Route path='/doctors/:speciality' element={<Doctors isDarkMode={isDarkMode} />} />
            {/* <Route path='/'/>
        <Route path='/'/>
        <Route path='/'/> */}

            <Route path='/login' element={<Home isDarkMode={isDarkMode} />} />
            <Route path='/register' />








            <Route path='*' element={<NotFound isDarkMode={isDarkMode} />} />
          </Routes>
        </div>

      </div>
    </>


  );
}

export default App;

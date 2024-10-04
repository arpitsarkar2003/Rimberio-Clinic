import { useEffect, useState } from 'react';
import './App.css';
import { Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
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
import Footer from './component/Footer';
import Auth from './auth/Auth';

import ScrollToTop from './common/ScrollToTop';

function App() {

  const [isDarkMode, setIsDarkMode] = useState(false);
  const color = "white";

  const navigate = useNavigate();

  const [isAuth, setIsAuth] = useState(false);
  const toggleAuth = () => {
    setIsAuth(prevState => !prevState); // Toggle auth state for login/logout
    navigate(0);
  };

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
      <ScrollToTop />
      {loading && <Loading isDarkMode={isDarkMode}/>}

      <Routes>
        {/* Routes with Navbar and Footer */}
        <Route element={<MainLayout isDarkMode={isDarkMode} isAuth={isAuth} toggleAuth={toggleAuth} />}>
          <Route path='/' element={<Home isDarkMode={isDarkMode} isAuth={isAuth}/>} />
          <Route path='/about' element={<About isDarkMode={isDarkMode} />} />
          <Route path='/contact' element={<Contact isDarkMode={isDarkMode} />} />
          <Route path='/my-profile' element={<MyProfile isDarkMode={isDarkMode} />} />
          <Route path='/my-appointments' element={<MyAppoientment isDarkMode={isDarkMode} />} />
          <Route path='/appointment/:docId' element={<Appoientment isDarkMode={isDarkMode} />} />
          <Route path='/doctors' element={<Doctors isDarkMode={isDarkMode} />} />
          <Route path='/doctors/:speciality' element={<Doctors isDarkMode={isDarkMode} />} />
        </Route>

        {/* Route without Navbar and Footer */}
        <Route path='/Authentication' element={<AuthLayout />}>
          <Route path='' element={<Auth />} />
        </Route>

        {/* Catch-All Route */}
        <Route path='*' element={<NotFound isDarkMode={isDarkMode} />} />
      </Routes>
    </>
  );
}

// Layout component for pages with Navbar and Footer
const MainLayout = ({ isDarkMode, isAuth, toggleAuth }) => {
  return (
    <>
      <div className='mx-4 sm:mx-[9%] tracking-wide font-customcali'>
        <div className="hidden xl:block">
          <Navbar isDarkMode={isDarkMode} isAuth={isAuth} toggleAuth={toggleAuth} />
        </div>
        <div className="block xl:hidden">
          <MobileNavbar isDarkMode={isDarkMode} isAuth={isAuth} toggleAuth={toggleAuth} />
        </div>
        <div className='mt-[7rem]'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

// Layout for Auth route (without Navbar and Footer)
const AuthLayout = () => {
  return (
    <div className="auth-container">
      <Outlet />
    </div>
  );
};

export default App;

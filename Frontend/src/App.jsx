import { useEffect, useState } from 'react';
import './App.css';
import { Navigate, Outlet, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import NotFound from './common/NotFound';
import About from './pages/About';
import Contact from './pages/Contact';
import MyProfile from './pages/patient/PatientProfile';
import Appoientment from './pages/Appoientment';
import Doctors from './pages/Doctors';
import Navbar from './component/Navbar';
import MobileNavbar from './component/MobileNavbar';
import Footer from './component/Footer';
import Auth from './auth/Auth';
import ScrollToTop from './common/ScrollToTop';
import Loading from './common/Loading';

import PatiendPaymentRecords from './pages/patient/pages/PatientPaymentRecords';
import PatientReports from './pages/patient/pages/PatientReports';
import PatientNavbar from './pages/patient/components/PatientNavbar';
import PatientSettings from './pages/patient/pages/PatientSettings';
import AdminLogin from './pages/admin/auth/AdminLogin';
import AdminDashboard from './pages/admin/pages/AdminDashboard';
import AdminNavbar from './pages/admin/components/AdminNavbar';
import AdminSidebar from './pages/admin/components/AdminSidebar';
import PatientAppoientment from './pages/patient/pages/PatientAppoientment';



function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  // Toggle User Auth
  const toggleAuth = () => {
    setIsAuth(prevState => !prevState);
    navigate(0);
  };

  // Toggle Admin Auth
  const toggleAdminAuth = () => {
    setIsAdminAuth(true); // Set to true after successful login
    navigate('/admin/dashboard');
  };

  // Handle dark mode based on user system preferences
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(mediaQuery.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      {loading && <Loading />}

      <Routes>
        {/* Routes with Navbar and Footer */}
        <Route element={<MainLayout isAuth={isAuth} toggleAuth={toggleAuth} />}>
          <Route path='/' element={<Home isAuth={isAuth} />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />




          <Route path='/my-profile' element={<PatientLayout />}>
            <Route path='' element={<MyProfile />} />
            <Route path='myappointments' element={<PatientAppoientment />} />
            <Route path='reports' element={<PatientReports />} />
            <Route path='paymentrecords' element={<PatiendPaymentRecords />} />
            <Route path='setting' element={<PatientSettings />} />
            <Route path='*' element={<NotFound />} />
          </Route>



          <Route path='/appointment/:docId' element={<Appoientment isAuth={isAuth}/>} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
        </Route>

        {/* Route without Navbar and Footer */}
        <Route path='/Authentication' element={<AuthLayout />}>
          <Route path='' element={<Auth />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout isAdminAuth={isAdminAuth} />}>
          <Route path='dashboard' element={<AdminDashboard />} />
        </Route>

        <Route path='/admin/login' element={<AdminLogin toggleAdminAuth={toggleAdminAuth} />} />

        {/* Catch-All Route */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

const AdminLayout = ({ isAdminAuth }) => {
  return (
    <>
      {isAdminAuth ? (
        <div className="flex h-screen bg-lime-50">
          <AdminSidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <AdminNavbar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-lime-50">
              <div className="container mx-auto px-6 py-8">
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      ) : (
        <Navigate to="/admin/login" />
      )}
    </>
  );
};

const PatientLayout = () => (
  <>
    <div className='border-t'>
      <PatientNavbar />
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  </>
);

const MainLayout = ({ isDarkMode, isAuth, toggleAuth }) => {
  return (
    <>
      <div className='mx-4 sm:mx-[9%] tracking-wide font-customcali'>
        <div className="hidden xl:block">
          <Navbar isAuth={isAuth} toggleAuth={toggleAuth} />
        </div>
        <div className="block xl:hidden">
          <MobileNavbar isAuth={isAuth} toggleAuth={toggleAuth} />
        </div>
        <div className='mt-[7rem]'>
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
};

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <Outlet />
    </div>
  );
};

export default App;

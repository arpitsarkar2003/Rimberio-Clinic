import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoIosClose ,IoIosMenu } from "react-icons/io";


const NavItem = ({ to, children, onClick }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => 
      isActive 
        ? 'border items-center justify-center w-full px-5 py-2 mb-4 hover:border-green-300 hover:bg-lime-400 leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer' 
        : 'text-gray-800 hover:text-slate-500 px-2 py-1'
    }
    onClick={onClick}
  >
    {children}
  </NavLink>
);

const MobileNavbar = ({ isDarkMode, isAuth, selectAuth }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
      const handleScroll = () => {
          setIsScrolled(window.scrollY > 0);
      };
      window.addEventListener('scroll', handleScroll);
      return () => {
          window.removeEventListener('scroll', handleScroll);
      };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative z-50 upp">
      {/* Logo and Hamburger Menu */}
      <div className={`flex justify-between items-center px-4 py-1 bg-white fixed top-0 left-0 right-0 ${isScrolled ? 'border-b-2 border-gray-200  backdrop-blur-2xl bg-white shadow-md transition-shadow duration-150 ease-in-out' : 'bg-white backdrop-blur-2xl shadow-none'}`}>
        <Link to="/">
        <img
          src={`${isDarkMode ? '/images/logos/logo_home_header_dark.png' : '/images/logos/logo_home_header_white.png'}`}
          alt="Logo"
          className="w-56"
        />
        </Link>
       
        <button onClick={toggleMenu} className="text-3xl focus:outline-none">
          {menuOpen ? <IoIosClose /> : <IoIosMenu />}
        </button>
      </div>

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 right-0 w-[60%] h-full bg-white shadow-lg transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-6 ">
          <button onClick={toggleMenu} className="text-3xl absolute top-6 right-6 focus:outline-1 focus:outline-lime-800" title='close'>
            <IoIosClose className='w-12'/>
          </button>
          <ul className="mt-16 space-y-6 text-md font-bold text-center w-full">
            {/* <Link to="/" onClick={toggleMenu}>
              <li className="border items-center justify-center w-full px-5 py-2 mb-4 hover:border-green-300 hover:bg-lime-400 leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer">
                Home
              </li>
            </Link>
            <Link to="/doctors" onClick={toggleMenu}>
              <li className="border items-center justify-center w-full px-5 py-2 mb-4 hover:border-green-300 hover:bg-lime-400 leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer">
                Doctors
              </li>
            </Link>
            <Link to="/about" onClick={toggleMenu}>
              <li className="border items-center justify-center w-full px-5 py-2 mb-4 hover:border-green-300 hover:bg-lime-400 leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer">
                About
              </li>
            </Link>
            <Link to="/contact" onClick={toggleMenu}>
              <li className="border items-center justify-center w-full px-5 py-2 mb-4 hover:border-green-300 hover:bg-lime-400 leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer">
                Contact
              </li>
            </Link> */}
            <li className='w-full'>
              <NavItem to="/" onClick={toggleMenu}>Home</NavItem>
            </li>
            
            {/* Authentication button */}
            <div className="mt-8">
              {isAuth ? (
                <button
                  onClick={() => {
                    toggleMenu();
                    selectAuth();
                  }}
                  className="flex items-center justify-center w-full px-5 py-2 mb-4 text-md font-bold border-2 border-green-300 leading-6 capitalize duration-100 transform rounded-sm cursor-pointer hover:border-green-500 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none hover:shadow-lg"
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={() => {
                    toggleMenu();
                    selectAuth();
                  }}
                  className="flex items-center justify-center w-full px-5 py-2 mb-4 text-md font-bold bg-lime-400 leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none hover:shadow-lg"
                >
                  Login / Register
                  <span className="ml-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      data-name="Layer 1"
                      viewBox="0 0 24 24"
                      className="w-5 h-5 fill-current"
                    >
                      <path
                        fill="currentColor"
                        d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"
                      />
                    </svg>
                  </span>
                </button>
              )}
            </div>
          </ul>
        </div>
        <div className='flex justify-center items-center h-full text-sm'>
            <sapn className='text-lime-800 font-bold pr-1'>Rimberio </sapn>Copyright © 2024. All rights reserved.
        </div>
      </div>

      {/* Overlay when the menu is open */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </div>
  );
};

export default MobileNavbar;

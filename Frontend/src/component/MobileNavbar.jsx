import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { IoIosClose } from "react-icons/io";
import { RiArrowDropDownLine } from 'react-icons/ri';
import { BsReverseLayoutSidebarReverse } from "react-icons/bs";


const NavItem = ({ to, children, onClick }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? 'bg-lime-400 text-white px-5 py-4 block w-full text-center rounded-md'
        : 'text-gray-800 px-5 py-4 block w-full text-center hover:bg-gray-100 btn'
    }
    onClick={onClick}
  >
    {children}
  </NavLink>
);

const MobileNavbar = ({ isDarkMode, isAuth, selectAuth }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="relative z-50">
      {/* Logo and Hamburger Menu */}
      <div className={`flex justify-between items-center px-4 py-1 bg-white fixed top-0 left-0 right-0 ${isScrolled ? 'border-b-2 border-gray-200 backdrop-blur-2xl bg-white shadow-md transition-shadow duration-150 ease-in-out' : 'bg-white backdrop-blur-2xl shadow-none'}`}>
        <Link to="/">
          <img
            src={`${isDarkMode ? '/images/logos/logo_home_header_dark.png' : '/images/logos/logo_home_header_white.png'}`}
            alt="Logo"
            className="w-56"
          />
        </Link>
        <div className='flex  items-center space-x-4'>
          {isAuth && (
            <div className="relative w-full flex justify-center">
              <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleDropdown}>
                <img src="/images/profile_pic.png" alt="user" className="w-10 h-10 rounded-full border-2 border-gray-300" />
                <RiArrowDropDownLine className="w-8 h-8 text-gray-700" />
              </div>
              {isDropdownOpen && isAuth && (
                <div className="absolute top-12 border right-0 mt-4 w-48 bg-white rounded-md z-50">
                  <Link to="/my-profile" onClick={toggleMenu} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Profile</Link>
                  <Link to="/my-appointments" onClick={toggleMenu} className="block px-4 py-2 text-gray-800 hover:bg-gray-100">My Appointments</Link>
                  <button onClick={selectAuth} className="block w-full text-left px-4 py-2 text-white bg-red-500 hover:bg-red-600">Logout</button>
                </div>
              )}
            </div>
          )}


          <button onClick={toggleMenu} className="text-3xl focus:outline-none">
            {menuOpen ? <IoIosClose /> : <BsReverseLayoutSidebarReverse className='w-12' />}
          </button>
        </div>

      </div>

      {/* Slide-in Menu */}
      <div
        className={`fixed flex flex-col justify-between top-0 right-0 w-[70%] h-full bg-white shadow-lg transform ${menuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="p-6">
          <button onClick={toggleMenu} className="text-3xl absolute top-6 right-6 focus:outline-none" title='close'>
            <IoIosClose className='w-12' />
          </button>

          <ul className="mt-16 space-y-6 text-md font-bold text-center w-full">
            <li className='w-full space-y-5'>
              <NavItem to="/" onClick={toggleMenu}>Home</NavItem>
              <NavItem to="/doctors" onClick={toggleMenu}>Doctors</NavItem>
              <NavItem to="/about" onClick={toggleMenu}>About</NavItem>
              <NavItem to="/contact" onClick={toggleMenu}>Contact</NavItem>
            </li>
          </ul>
        </div>
        <div>
          {isAuth ? (
            <div className="relative w-full  flex flex-col items-center px-10 space-y-2">
              <NavItem to="/my-profile" onClick={toggleMenu}>My Profile</NavItem>
              <NavItem to="/my-appointments" onClick={toggleMenu}>My Appointments</NavItem>
              <button onClick={selectAuth} className="flex items-center justify-center w-full px-5 py-4 mb-4 text-lg font-bold bg-red-500 rounded-sm hover:shadow-lg hover:-translate-y-1">Log Out</button>
            </div>
          ) : (
            <div className="relative w-full flex flex-col items-center px-10 space-y-2">
              <button
                onClick={selectAuth}
                className="flex items-center justify-center w-full px-4 py-4 mb-4 text-md font-bold bg-lime-400 rounded-sm hover:shadow-lg hover:-translate-y-1"
              >
                Login / Register
              </button>
            </div>

          )}
          <div className='flex justify-center items-center pb-5 pt-5 text-xs'>
            <span className='text-lime-800 font-bold pr-1 flex items-center'>
              <img className='w-16' src={`${isDarkMode ? '/images/logos/logo_home_header_dark.png' : '/images/logos/logo_home_header_white.png'}`} alt='favicon' />
            </span>
            <span className='pt-1'>Copyright © 2024. All rights reserved.</span>
          </div>
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

import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";


const NavItem = ({ to, children, onClick }) => (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        isActive 
          ? 'text-lime-700 px-2 py-2 border-t border-lime-700 rounded-md ' 
          : 'text-gray-800 hover:text-slate-500 px-2 py-1'
      }
      onClick={onClick}
    >
      {children}
    </NavLink>
  );

const Navbar = ({ isDarkMode, isAuth, selectAuth }) => {

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

    return (
        <div className={` fixed top-0 left-[8%] right-[8%] z-50 border-gray-300 flex justify-between items-center ${isScrolled ? 'border-b-2 border-gray-200  backdrop-blur-2xl bg-white' : 'bg-white backdrop-blur-2xl shadow-none'}`}>
            <Link to="/">
                <img src={`${isDarkMode ? '/images/logos/logo_home_header_dark.png' : '/images/logos/logo_home_header_white.png'}`} alt="header_logo" className="w-56" />
            </Link>
            <div>
                <ul className="flex justify-between items-center space-x-5">
                    <Link to="/" className="flex justify-center items-center flex-col group"><li className="border border-transparent items-center justify-center w-full px-5 py-1 mb-4 text-md font-bold hover:border-green-300 hover:bg-lime-400 capitalize duration-100 transform rounded-md  cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto hover:shadow-lg hover:-translate-y-1">
                    <NavItem to="/">Home</NavItem>
                    </li><hr className="border-lime-700 hover:border-lime-700 w-[70%] group-hover:w-[90%]" /></Link>

                    <Link to="/doctors" className="flex justify-center items-center flex-col group"><li className="border border-transparent items-center justify-center w-full px-5 py-1 mb-4 text-md font-bold hover:border-green-300 hover:bg-lime-400 leading-6 capitalize duration-100 transform rounded-md  cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto hover:shadow-lg hover:-translate-y-1">
                        <NavItem to="/doctors">Doctors</NavItem>
                    </li><hr className="border-lime-700 hover:border-lime-700 w-[70%] group-hover:w-[90%]" /></Link>


                    <Link to="/about" className="flex justify-center items-center flex-col group"><li className="border border-transparent items-center justify-center w-full px-5 py-1 mb-4 text-md font-bold hover:border-green-300 hover:bg-lime-400 leading-6 capitalize duration-100 transform rounded-md  cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto hover:shadow-lg hover:-translate-y-1">
                       <NavItem to="/about"> about</NavItem>

                    </li> <hr className="border-lime-700 hover:border-lime-700 w-[70%] group-hover:w-[90%]" /></Link>


                    <Link to="/contact" className="flex justify-center items-center flex-col group"><li className="border border-transparent items-center justify-center w-full px-5 py-1 mb-4 text-md font-bold hover:border-green-300 hover:bg-lime-400 leading-6 capitalize duration-100 transform rounded-md  cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto hover:shadow-lg hover:-translate-y-1">
                        <NavItem to="/contact">contact</NavItem>
                    </li><hr className="border-lime-700 hover:border-lime-700 w-[70%] group-hover:w-[90%]" /></Link>
                </ul>
            </div>
            <div>
                {isAuth ?
                    <button
                        onClick={selectAuth}
                        className="flex items-center justify-center w-full px-4 py-4 text-md font-bold leading-6 capitalize duration-100 transform border-2 rounded-sm cursor-pointer border-green-300 focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:w-auto sm:px-6 border-text  hover:shadow-lg hover:-translate-y-1"
                    >
                        Logout
                    </button>
                    :
                    <button
                        onClick={selectAuth}
                        className="flex flex-row items-center justify-center w-full px-4 py-4 mb-4 text-md font-bold bg-lime-400 leading-6 capitalize duration-100 transform rounded-sm shadow cursor-pointer focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none sm:mb-0 sm:w-auto sm:mr-4 md:pl-8 md:pr-6 xl:pl-12 xl:pr-10   hover:shadow-lg hover:-translate-y-1"
                    >
                        Login / Register
                        <span class="ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" class="w-5 h-5 fill-current"><path fill="currentColor" d="M17.92,11.62a1,1,0,0,0-.21-.33l-5-5a1,1,0,0,0-1.42,1.42L14.59,11H7a1,1,0,0,0,0,2h7.59l-3.3,3.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l5-5a1,1,0,0,0,.21-.33A1,1,0,0,0,17.92,11.62Z"></path>
                            </svg>
                        </span>
                    </button>}
            </div>
        </div>
    );
}

export default Navbar;
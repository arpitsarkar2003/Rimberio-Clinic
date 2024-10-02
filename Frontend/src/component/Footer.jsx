import React from 'react';
import { generatePDF } from '../common/GeneratePDF';
import { Link, NavLink } from 'react-router-dom';


const NavItem = ({ to, children, onClick }) => (
    <NavLink 
      to={to} 
      className={({ isActive }) => 
        isActive 
          ? 'text-lime-900 underline' 
          : 'text-lime-600 hover:text-lime-900'
      }
      onClick={onClick}
    >
      {children}
    </NavLink>
  );

const Footer = () => {
    const clinicDetails = {
        name: "Rimberio Medical Clinic",
        address: "1234 Health St, Cityname, Country",
        phone: ["+1234567890"],
        website: "https://rimberio.com",
        email: "info@rimberio.com",
    };

    const logo = "/images/logos/logo_footer_white.png";  // Path to your logo image

    const currentYear = new Date().getFullYear(); 

    return (
        <div className="mx-10 mt-40 font-customcali">
            <hr />
            <div className="flex items-center text-center sm:text-left flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 text-sm">
                {/* Left Section */}
                <div className='flex flex-col items-center sm:items-start'>
                    <Link to="/"><img src={logo} alt="Rimberio Medical Clinic Logo" className="w-52 mb-5" /></Link>
                    <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                </div>
                {/* Center Section */}
                <div>
                    <h1 className='text-xl font-medium mb-5'>Company</h1>
                    <ul className='text-lg font-bold gap-2 flex flex-col'>
                        <li><NavItem to="/">Home</NavItem></li>
                        <li><NavItem to="/doctors">Doctors</NavItem></li>
                        <li><NavItem to="/about">About Us</NavItem></li>
                        <li><NavItem to="/contact">Contact Us</NavItem></li>
                    </ul>
                </div>
                {/* Right Section */}
                <div>
                <h1 className='text-xl font-medium mb-5'>Get In Touch</h1>
                <ul className='text-lg font-semibold text-gray-500 gap-2 flex flex-col'>
                        <li className='hover:text-gray-700 hover:underline'><a href={`tel:${clinicDetails.phone[0]}`}>{clinicDetails.phone}</a></li>
                        <li className='hover:text-gray-700 hover:underline'>{clinicDetails.address}</li>
                        <li className='hover:text-gray-700 hover:underline' title='Click to send email'><a href='mailto:{clinicDetails.email}'>{clinicDetails.email}</a></li>
                        <li className='hover:text-gray-700 hover:underline'><a href={clinicDetails.website}></a>{clinicDetails.website}</li>
                    </ul>
                    
                </div>
            </div>
            <div className=''>
                <hr />
                <div className='flex items-center justify-center space-x-5 h-[7vh]'>
                      <p className='text-green-700 opacity-70 font-bold'>© {currentYear} Rimberio Medical Clinic. All rights reserved.</p> 
                      <span className='text-2xl'>•</span>
                <button title='Click to download privacy policy' className='hover:underline hover:text-gray-800 text-gray-500 font-semibold' onClick={() => generatePDF(clinicDetails, logo)}>Privacy Policy & Term of Use</button>
                </div>
              
            </div>
        </div>
    );
}

export default Footer;

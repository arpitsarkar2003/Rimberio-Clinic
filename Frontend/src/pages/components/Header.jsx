import { Link } from "react-router-dom";
import { TiArrowRight } from "react-icons/ti";

const Header = () => {
    return ( 
        <div className="flex flex-col md:flex-row flex-wrap bg-gradient-to-br from-lime-500 to-lime-600 rounded-lg px-6 md:px-10 lg:px-20 shadow-xl overflow-hidden">
            {/* left */}
            <div className="flex flex-col justify-center items-center md:items-start md:w-1/2 gap-6 py-12 m-auto md:py-[10vw] md:mb-[-30px]">
                <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight md:leading-tight lg:leading-tight text-center md:text-left">
                    Book Appointment <br /> With Trusted Doctors
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-4 text-white text-base md:text-lg font-light text-center md:text-left">
                    <img src="/images/group_profiles.png" alt="Group of doctors" className="w-32 md:w-36 rounded-full shadow-md" />
                    <p className="max-w-md">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
                </div> 
                <a href="#specialists" className="btn-dark flex justify-center items-center gap-2 text-lime-700 font-semibold bg-white text-lg px-6 py-3 rounded-full hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg">
                    <span>Book Appointment</span> <TiArrowRight className="text-2xl" />
                </a>
            </div>

            {/* right */}
            <div className="md:w-1/2 relative mt-8 md:mt-0">
                <img src="/images/header_img.png" alt="Doctor with patient" className="w-full h-auto md:absolute bottom-0 rounded-t-lg md:rounded-none shadow-lg md:shadow-none" />
            </div>
        </div>
     );
}
 
export default Header;
import { Link } from "react-router-dom";
import { specialityData } from "../../common/assets";

const SpecialityMenu = () => {
    return (
        <div id="specialists" className="flex flex-col items-center gap-8 py-20 text-gray-800">
            <h2 className="text-center text-4xl sm:text-5xl font-bold uppercase text-lime-700">Find by Speciality</h2>
            <div className="w-24 h-1 bg-lime-500 rounded-full"></div>
            <p className="max-w-2xl text-center text-lg text-gray-600">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>

            <div className="flex justify-center flex-wrap gap-8 pt-8 w-full">
                {specialityData.map((item, index) => (
                    <Link 
                        onClick={() => window.scrollTo(0, 0)} 
                        key={index} 
                        to={`/doctors/${item.speciality}`} 
                        className="flex flex-col items-center text-center w-24 cursor-pointer transition-all duration-300 hover:transform hover:scale-110 group"
                    >
                        <div className="w-20 h-20 rounded-full bg-lime-100 flex items-center justify-center mb-3 group-hover:bg-lime-200 transition-colors duration-300">
                            <img src={item.image} alt={item.speciality} className="w-12 h-12"/>
                        </div>
                        <p className="text-sm font-semibold group-hover:text-lime-700 transition-colors duration-300">{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SpecialityMenu;
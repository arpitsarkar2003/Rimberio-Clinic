import { TiArrowRight } from "react-icons/ti";
import { doctors } from "../../common/assets";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const TopDoctors = ({ docrows }) => {
  const [shuffledDoctors, setShuffledDoctors] = useState([]);
  const router = useNavigate();

  useEffect(() => {
    setShuffledDoctors(shuffleArray([...doctors]));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8 my-20 text-gray-900">
      <h2 className="text-center text-4xl sm:text-5xl font-bold uppercase text-lime-700">Top Doctors</h2>
      <p className="max-w-2xl text-center text-lg text-gray-600">Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
      
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-8">
        {shuffledDoctors.slice(0, docrows).map((item, index) => (
          <div 
            onClick={() => router(`/appointment/${item._id}`)}
            key={index} 
            className="bg-white rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            <img 
              className="w-full object-cover object-center" 
              src={item.image} 
              alt={item.name} 
            />
            <div className="p-4">
              <p className="text-xl text-gray-900 font-bold">{item.name}</p>
              <p className="text-sm text-lime-600 font-medium mt-1">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => router('/doctors')} 
        className="mt-10 px-8 py-3 bg-lime-500 text-white rounded-full flex items-center space-x-2 hover:bg-lime-600 transition-all duration-300 shadow-md hover:shadow-lg text-lg font-medium"
      >
        <span>View More</span>
        <TiArrowRight className="text-2xl" />
      </button>
    </div>
  );
};

export default TopDoctors;
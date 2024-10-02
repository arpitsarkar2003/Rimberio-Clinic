import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { specialityData } from '../common/assets';
import { FaFilter, FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';
import { IoSearch } from 'react-icons/io5';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

function Doctors() {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const applyFilter = () => {
    let filtered = doctors;
    if (speciality) {
      filtered = filtered.filter(item => item.speciality === speciality);
    }
    if (isAvailable) {
      filtered = filtered.filter(item => item.isAvailable === 'Available');
    }
    if (searchTerm) {
      filtered = filtered.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, isAvailable, searchTerm]);

  const removeAllFilters = () => {
    setSearchTerm('');
    setIsAvailable(false);
    navigate('/doctors');
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const showRemoveFilterButton = searchTerm || isAvailable || speciality;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Find Your Doctor</h1>

      {/* Search and Filters Section */}
      <div className="flex flex-col md:flex-row justify-center items-center mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <div className="w-full md:w-1/2 lg:w-2/5">
          <div className="relative">
            <input
              type="text"
              className="w-full p-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
              placeholder="Search doctors by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        {/* Desktop Filters */}
        <div className="hidden md:flex items-center space-x-4">
          <select
            value={speciality || ''}
            onChange={(e) => navigate(`/doctors/${e.target.value}`)}
            className="p-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-500"
          >
            <option value="">All Specialities</option>
            {specialityData.map((item, index) => (
              <option key={index} value={item.speciality}>
                {item.speciality}
              </option>
            ))}
          </select>

          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={() => setIsAvailable(!isAvailable)}
              className="form-checkbox h-5 w-5 text-lime-500 rounded focus:ring-lime-500 border-gray-300"
            />
            <span className="text-gray-700">Available Now</span>
          </label>
        </div>

        {/* Mobile Filter Button */}
        <button
          className="md:hidden w-full bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition-colors duration-300"
          onClick={openModal}
        >
          <FaFilter className="inline-block mr-2" /> Filters
        </button>
      </div>

      {/* Remove All Filters Button */}
      {showRemoveFilterButton && (
        <div className="flex justify-center mb-6">
          <button
            onClick={removeAllFilters}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center"
          >
            <FaTimes className="mr-2" /> Remove All Filters
          </button>
        </div>
      )}

      {/* Mobile Filter Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Filter Modal"
        className="modal fixed inset-0 bg-white p-6 overflow-auto"
        overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Filters</h2>
          <button onClick={closeModal} className="text-2xl">&times;</button>
        </div>
        <div className="space-y-4">
          {specialityData.map((item, index) => (
            <button
              key={index}
              onClick={() => { navigate(`/doctors/${item.speciality}`); closeModal(); }}
              className={`w-full p-3 text-left border rounded-lg transition-colors duration-300 ${
                speciality === item.speciality ? 'bg-lime-100 border-lime-500' : 'border-gray-300 hover:bg-gray-100'
              }`}
            >
              {item.speciality}
            </button>
          ))}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={() => setIsAvailable(!isAvailable)}
              className="form-checkbox h-5 w-5 text-lime-500 rounded focus:ring-lime-500 border-gray-300"
            />
            <span className="text-gray-700">Available Now</span>
          </label>
          <button
            className="w-full bg-lime-500 text-white px-4 py-2 rounded-lg hover:bg-lime-600 transition-colors duration-300"
            onClick={() => { applyFilter(); closeModal(); }}
          >
            Apply Filters
          </button>
        </div>
      </Modal>

      {/* Doctors List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filterDoc.length > 0 ? (
          filterDoc.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <img
                className="w-full object-cover object-center"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {item.rating && (
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>
                            {item.rating > i ? (
                              <AiFillStar className="text-yellow-400" />
                            ) : (
                              <AiOutlineStar className="text-yellow-400" />
                            )}
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="ml-2 text-sm text-gray-600">{item.rating}</span>
                  </div>
                  <span className={`text-sm font-medium ${
                    item.isAvailable === 'Available' ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {item.isAvailable === 'Available' ? 'Available' : 'Not Available'}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.name}</h3>
                <p className="text-sm text-gray-600">{item.speciality}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500 py-8">No doctors found</p>
        )}
      </div>
    </div>
  );
}

export default Doctors;
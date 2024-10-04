import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Rating from '../common/Rating';
import { AiFillCalendar } from 'react-icons/ai';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import TopDoctors from './components/TopDoctors';

function Appointment() {
  const [filterDoc, setFilterDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [docSlots, setDocSlots] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTime, setSelectedTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [nextFiveDays, setNextFiveDays] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);

  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);

  const fetchDocInfo = async () => {
    setLoading(true);
    const docInfo = doctors.find((doc) => doc._id === docId);
    setFilterDoc(docInfo);
    setLoading(false);
  };

  const getAvailableSlots = () => {
    setDocSlots([]);
    let today = new Date();
    let newDocSlots = [];

    for (let i = 0; i < 14; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let timeSlots = [];
      for (let j = 8; j <= 17; j++) {
        timeSlots.push({
          day: currentDate.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric' }),
          time: `${j < 12 ? j : j - 12}:00 ${j < 12 ? 'AM' : 'PM'}`,
        });
      }
      newDocSlots.push({ date: currentDate, slots: timeSlots });
    }

    setDocSlots(newDocSlots);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    if (filterDoc) {
      getAvailableSlots();
    }
  }, [filterDoc]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    const dayIndex = docSlots.findIndex(slot => slot.date.toDateString() === date.toDateString());
    setSelectedDay(dayIndex !== -1 ? dayIndex : 0);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button
      className="flex justify-end items-center gap-2 text-lime-600"
      onClick={onClick}
      ref={ref}
      style={{ alignSelf: 'flex-end', zIndex: 10 }}
      disabled={filterDoc?.isAvailable !== 'Available'}
    >
      <AiFillCalendar className="w-5 h-5" />
      <span className="pt-2 whitespace-nowrap">{value || 'Select Date'}</span>
    </button>
  ));

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <img src='/spinner.gif' alt='Loading...' className='w-24' />
      </div>
    );
  }

  if (!filterDoc) {
    return <div>Doctor not found.</div>;
  }

  const displayedSlots = nextFiveDays ? docSlots.slice(0, 5) : docSlots;

  return (
    <div className='pt-10'>
      {/* Doctor Details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img
            src={filterDoc.image || '/images/default-doctor.png'}
            className='bg-lime-500 w-full rounded-lg'
            alt={filterDoc.name}
          />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
          <h1 className='flex items-center gap-2 text-2xl font-bold font-customcali italic'>
            <span className='pt-1 tracking-wide'>{filterDoc.name}</span>
            <img src='/images/verified_icon.svg' alt='' title='Verified' className='w-5' />
          </h1>

          <div className='flex items-center gap-2 mt-1'>
            <span>Status :</span>
            <p className={`${filterDoc.isAvailable === 'Available' ? 'text-lime-500' : 'text-red-500'}`}>
              {filterDoc.isAvailable}
            </p>
          </div>

          <div className='flex flex-col gap-2 text-lg text-gray-600 mt-1 font-medium'>
            <div>
              <span>Degree : </span>
              <span className='font-bold tracking-wide'>{filterDoc.degree}</span>
            </div>
            <div>
              <span>Speciality : </span>
              <span className='font-bold tracking-wide'>{filterDoc.speciality}</span>
            </div>
            <div>
              <span>Years Of Experience : </span>
              <span className='font-bold'>{filterDoc.experience}</span>
            </div>
            <div className='flex items-center'>
              <Rating rating={filterDoc.rating} /> ({filterDoc.rating})
            </div>
          </div>

          <div>
            <p className='flex items-center gap-1 text-base font-medium text-gray-800'>
              <span className='pt-2'>About</span>
              <img src='/images/info_icon.svg' alt='' />
            </p>
            <p className='text-gray-500 max-w-[700px] mt-1 tracking-wide'>{filterDoc.about}</p>
          </div>
          <hr className='mt-5 ' />
          <p className='mt-2 text-2xl font-semibold text-gray-700'>
            Appointment Fee : <span>{currencySymbol}{filterDoc.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='relative mt-10 bg-white p-6 rounded-lg border border-gray-200'>
        {filterDoc.isAvailable !== 'Available' && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex justify-center items-center z-10">
            <p className="text-red-500 font-bold text-xl">Doctor is not available at the moment.</p>
          </div>
        )}
        <div className={`${filterDoc.isAvailable !== 'Available' ? 'pointer-events-none opacity-30' : ''}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className='text-xl font-semibold'>Booking slots</h2>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              minDate={new Date()}
              customInput={<CustomInput />}
              calendarClassName="shadow-lg border-t border-gray-200"
            />
          </div>

          {/* Selected Date and Time Banner */}
          {(selectedDate || selectedTime) && (
            <div className="mb-4 p-3 bg-lime-100 border border-lime-300 rounded-md text-lime-800">
              <p className="font-semibold">Selected Appointment:</p>
              <p>
                {selectedDate && format(selectedDate, 'MMMM d, yyyy')}
                {selectedDate && selectedTime && ' at '}
                {selectedTime}
              </p>
            </div>
          )}

          {/* Days List */}
          <div className='flex gap-2 overflow-x-auto mb-6'>
            {displayedSlots.map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateChange(day.date)}
                className={`flex-shrink-0 px-4 py-2 rounded-md text-center cursor-pointer transition-all duration-300 ease-in-out ${
                  selectedDay === index ? 'bg-lime-600 text-white scale-105' : 'bg-gray-100 text-gray-700 hover:bg-lime-100'
                }`}
              >
                <div className='font-semibold'>{format(day.date, 'EEE')}</div>
                <div>{format(day.date, 'MMM d')}</div>
              </button>
            ))}
          </div>

          {/* Time Slots for Selected Day */}
          <div className='grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3'>
            {docSlots[selectedDay]?.slots?.map((slot, index) => (
              <button
                key={index}
                onClick={() => handleTimeSelection(slot.time)}
                className={`px-4 py-2 border rounded-md text-center transition-all duration-300 ease-in-out ${
                  selectedTime === slot.time
                    ? 'bg-lime-600 text-white border-lime-600 scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-lime-100 border-gray-300'
                }`}
              >
                {slot.time}
              </button>
            ))}
          </div>

          <div className='mt-6 flex justify-center'>
            {selectedTime && selectedDate ? (
              <button
                className='px-8 btn py-3 bg-lime-600 text-white rounded-md font-semibold hover:bg-lime-700 transition-colors'
                onClick={() => setShowModal(true)}
              >
                Confirm Appointment
              </button>
            ) : (
              <button
                className='px-8 py-3 bg-gray-400 text-white rounded-md font-semibold cursor-not-allowed'
                disabled
              >
                Select Date and Time
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Appointment Confirmation Modal */}
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-lg'>
            <h2 className='text-xl font-semibold mb-4'>Confirm Appointment</h2>
            <p className='text-gray-700'>
              You are about to book an appointment with Dr. {filterDoc.name} on{' '}
              <span className='font-semibold'>
                {format(selectedDate, 'MMMM d, yyyy')} at {selectedTime}
              </span>.
            </p>
            <div className='flex justify-end mt-6'>
              <button
                className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md mr-2'
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className='px-4 py-2 bg-lime-600 text-white rounded-md'
                onClick={() => {
                  // Handle booking confirmation logic here
                  alert('Appointment Confirmed!');
                  setShowModal(false);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Doctors Section */}
      <div className='mt-10'>
        <TopDoctors docrows={4}/>
      </div>
    </div>
  );
}

export default Appointment;

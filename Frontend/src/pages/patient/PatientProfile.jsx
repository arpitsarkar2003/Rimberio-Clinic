// import React from 'react'

// function MyProfile() {
//   return (
//     <div className='border flex'>
//       <div className='flex flex-col items-center w-1/3 border-r p-10'>
//         <div className='p-10 border rounded-full bg-black w-48 h-48'>
//             Image
//         </div>
//         <div className='pt-2'>
//           <span>Patient Name:</span>  <span className='text-2xl italic font-bold tracking-wide'>Arpit Sarkar</span>
//         </div>
//       </div>
     
//       <div className='max-w-xl'>
//         details
//       </div>
//     </div>
//   )
// }

// export default MyProfile



import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaSave, FaTimes } from 'react-icons/fa';

function MyProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'Arpit',
    lastName: 'Sarkar',
    dob: '1995-01-01',
    email: 'arpit@example.com',
    phone: '1234567890',
    bloodPressure: '120/89 mmHg',
    heartRate: '120 BPM',
    glucose: '97 mg/dl',
    cholesterol: '85 mg/dl',
    history: [
      { date: '20 Jan, 2023', diagnosis: 'Malaria', severity: 'High', visits: 2, status: 'Under Treatment' },
      { date: '12 Jan, 2022', diagnosis: 'Viral Fever', severity: 'Low', visits: 1, status: 'Cured' },
      { date: '20 Jan, 2021', diagnosis: 'Covid 19', severity: 'High', visits: 6, status: 'Cured' }
    ]
  });

  const handleEdit = () => setIsEditing(!isEditing);
  const handleSave = () => {
    setIsEditing(false);
    // Here you would implement backend save logic when ready.
  };

  return (
    <div className='m-5 flex flex-col lg:flex-row lg:flex-wrap'>
      {/* Profile Image and Info */}
      <div className='flex flex-col items-center w-full lg:w-1/3 border-r p-10'>
        <div className='p-10 border rounded-full bg-black w-48 h-48 text-white text-center'>Image</div>
        <div className='pt-2'>
          <span>Patient Name: </span>
          <span className='text-2xl italic font-bold tracking-wide'>
            {profileData.firstName} {profileData.lastName}
          </span>
        </div>
        <div className='text-sm pt-1'>
          <p>Date of Birth: {profileData.dob}</p>
          <p>Email: {profileData.email}</p>
          <p>Phone: {profileData.phone}</p>
        </div>
        <button 
          className='mt-4 px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600 flex items-center gap-2'
          onClick={handleEdit}
        >
          {isEditing ? <FaTimes /> : <FaEdit />} {isEditing ? 'Cancel Editing' : 'Edit Profile'}
        </button>
      </div>

      {/* Details Section */}
      <div className='w-full lg:w-2/3 p-6'>
        {isEditing ? (
          <motion.div
            initial={{ x: '100vw' }}
            animate={{ x: 0 }}
            className='p-4 bg-gray-100 rounded-md shadow-md'
          >
            <h3 className='text-lg font-bold mb-4'>Edit Profile Information</h3>
            <div className='grid grid-cols-2 gap-4'>
              <input type='text' placeholder='First Name' className='border p-2' />
              <input type='text' placeholder='Last Name' className='border p-2' />
              <input type='date' placeholder='Date of Birth' className='border p-2' />
              <input type='email' placeholder='Email' className='border p-2' />
              <input type='text' placeholder='Phone' className='border p-2' />
            </div>
            <div className='mt-4'>
              <button
                className='px-4 py-2 bg-lime-500 text-white rounded hover:bg-lime-600 flex items-center gap-2'
                onClick={handleSave}
              >
                <FaSave /> Save Profile
              </button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Patient Vitals */}
            <div className='grid grid-cols-2 gap-4 text-center mt-4'>
              <div className='p-4 border bg-gray-50 rounded-md'>
                <h4 className='text-sm'>Blood Pressure</h4>
                <p className='font-bold'>{profileData.bloodPressure}</p>
              </div>
              <div className='p-4 border bg-gray-50 rounded-md'>
                <h4 className='text-sm'>Heart Rate</h4>
                <p className='font-bold'>{profileData.heartRate}</p>
              </div>
              <div className='p-4 border bg-gray-50 rounded-md'>
                <h4 className='text-sm'>Glucose</h4>
                <p className='font-bold'>{profileData.glucose}</p>
              </div>
              <div className='p-4 border bg-gray-50 rounded-md'>
                <h4 className='text-sm'>Cholesterol</h4>
                <p className='font-bold'>{profileData.cholesterol}</p>
              </div>
            </div>

            {/* Patient History */}
            <div className='mt-6'>
              <h3 className='text-lg font-bold mb-4'>Patient History</h3>
              <table className='w-full table-auto border-collapse'>
                <thead>
                  <tr className='bg-gray-100'>
                    <th className='border p-2'>Date of Visit</th>
                    <th className='border p-2'>Diagnosis</th>
                    <th className='border p-2'>Severity</th>
                    <th className='border p-2'>Total Visits</th>
                    <th className='border p-2'>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {profileData.history.map((item, index) => (
                    <tr key={index} className='text-center'>
                      <td className='border p-2'>{item.date}</td>
                      <td className='border p-2'>{item.diagnosis}</td>
                      <td className='border p-2'>{item.severity}</td>
                      <td className='border p-2'>{item.visits}</td>
                      <td className='border p-2'>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MyProfile;

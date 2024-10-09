import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { format, parseISO, isFuture } from 'date-fns'
import { FiMessageSquare, FiTrash2, FiX, FiCalendar, FiClock, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi'

// Sample appointment data
const sampleAppointments = [
  //   { id: 1, name: 'Dr. John Doe', date: '2023-07-15', time: '10:00 AM', status: 'pending' },
//   { id: 2, name: 'Dr. Jane Smith', date: '2023-07-16', time: '11:00 AM', status: 'completed' },
//   { id: 3, name: 'Dr. Michael Johnson', date: '2023-07-17', time: '12:00 PM', status: 'cancelled' },
//   { id: 4, name: 'Dr. Emily Brown', date: '2023-07-18', time: '2:00 PM', status: 'pending' },
//   { id: 5, name: 'Dr. David Lee', date: '2023-07-19', time: '3:00 PM', status: 'pending' },
//   { id: 6, name: 'Dr. Sarah Wilson', date: '2023-07-20', time: '4:00 PM', status: 'pending' },
//   { id: 7, name: 'Dr. Robert Taylor', date: '2023-07-21', time: '5:00 PM', status: 'pending' },
//   { id: 8, name: 'Dr. Lisa Anderson', date: '2023-07-22', time: '6:00 PM', status: 'pending' },
]

function PatientAppoientment() {
  const [appointments, setAppointments] = useState([]) // Initially no appointments
  const [loading, setLoading] = useState(true)
  const [chatOpen, setChatOpen] = useState(null)
  const [chatMessage, setChatMessage] = useState('')
  const [chatHistory, setChatHistory] = useState({})
  const [currentPage, setCurrentPage] = useState(1)
  const [direction, setDirection] = useState(0)

  const appointmentsPerPage = 3
  const totalPages = appointments.length > 0 ? Math.ceil(appointments.length / appointmentsPerPage) : 0

  useEffect(() => {
    // Simulating an API call
    const fetchAppointments = async () => {
      // Simulate a loading state
      setLoading(true)
      setTimeout(() => {
        setAppointments(sampleAppointments) // Replace with actual API data
        setLoading(false)
      }, 1000)
    }

    fetchAppointments()
  }, [])

  const handleCancelAppointment = (id) => {
    setAppointments(prevAppointments => prevAppointments.map(app =>
      app.id === id ? { ...app, status: 'cancelled' } : app
    ))
  }

  const handleDeleteAppointment = (id) => {
    setAppointments(prevAppointments => prevAppointments.filter(app => app.id !== id))
  }

  const toggleChat = (id) => {
    setChatOpen(chatOpen === id ? null : id)
    setChatMessage('')
  }

  const sendChatMessage = (id) => {
    if (chatMessage.trim()) {
      setChatHistory(prev => ({
        ...prev,
        [id]: [...(prev[id] || []), chatMessage]
      }))
      setChatMessage('')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const changePage = (newPage) => {
    setDirection(newPage > currentPage ? 1 : -1)
    setCurrentPage(newPage)
  }

  if (loading) {
    return <div className='flex items-center justify-center text-3xl font-bold animate-fade-in-down h-[20vh]'>Loading appointments...</div> // Loading state
  }

  if (appointments.length === 0) {
    return (
      <div className=''>
        <div className="relative bg-gradient-to-br from-lime-500 to-green-600 text-white overflow-hidden rounded-tl-[100px] rounded-br-[100px] rounded-tr-[25px] rounded-bl-[15px]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-lime-500 opacity-50 mix-blend-multiply"></div>
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in-down">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                You don't Have Any  <span className="text-lime-900">Appointments</span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-lime-100 animate-fade-in-up">
                book an appointment in the <span className='italic font-semibold'>doctors section</span>
              </p>
            </div>
            <div className="mt-10 flex justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/doctors"
                className="inline-flex btn items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-lime-700 bg-white hover:bg-lime-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
              >
                Book An Appointment
              </Link>
            </div>
          </div>
          <style jsx>{`
            @keyframes fadeInDown {
              from {
                opacity: 0;
                transform: translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-fade-in-down {
              animation: fadeInDown 0.8s ease-out forwards;
            }

            .animate-fade-in-up {
              animation: fadeInUp 0.8s ease-out forwards;
            }
          `}</style>
        </div>
      </div>
    )
  }

  const paginatedAppointments = appointments.slice(
    (currentPage - 1) * appointmentsPerPage,
    currentPage * appointmentsPerPage
  )

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentPage}
          initial={{ x: direction * 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction * -50, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
          <div className="space-y-6">
            {paginatedAppointments.map((appointment) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{appointment.name}</h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-600 flex items-center">
                        <FiCalendar className="mr-2" />
                        {format(parseISO(appointment.date), 'MMMM d, yyyy')}
                      </p>
                      <p className="text-sm text-gray-600 flex items-center">
                        <FiClock className="mr-2" />
                        {appointment.time}
                      </p>
                      <p className={`text-sm font-medium inline-flex items-center px-2.5 py-0.5 rounded-full ${getStatusColor(appointment.status)}`}>
                        <FiUser className="mr-1" />
                        {appointment.status}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleChat(appointment.id)}
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <FiMessageSquare size={20} />
                    </button>
                    {isFuture(parseISO(`${appointment.date}T${appointment.time}`)) && appointment.status === 'pending' ? (
                      <button
                        onClick={() => handleCancelAppointment(appointment.id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      >
                        <FiX size={20} />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleDeleteAppointment(appointment.id)}
                        className="text-red-600 hover:text-red-800 transition-colors duration-200"
                      >
                        <FiTrash2 size={20} />
                      </button>
                    )}
                  </div>
                </div>
                <AnimatePresence>
                  {chatOpen === appointment.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4"
                    >
                      <div className="bg-white rounded-lg p-4">
                        <h4 className="font-semibold">Chat with {appointment.name}</h4>
                        <div className="mt-2 overflow-y-auto max-h-40">
                          {(chatHistory[appointment.id] || []).map((msg, index) => (
                            <p key={index} className="text-sm text-gray-800">{msg}</p>
                          ))}
                        </div>
                        <div className="flex mt-2">
                          <input
                            type="text"
                            className="flex-1 border rounded-lg p-2"
                            value={chatMessage}
                            onChange={(e) => setChatMessage(e.target.value)}
                            placeholder="Type your message..."
                          />
                          <button
                            onClick={() => sendChatMessage(appointment.id)}
                            className="ml-2 px-4 bg-blue-600 text-white rounded-lg"
                          >
                            Send
                          </button>
                        </div>
                        <button
                          onClick={() => toggleChat(appointment.id)}
                          className="mt-4 text-red-600"
                        >
                          Close Chat
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex justify-between">
            <button
              disabled={currentPage === 1}
              onClick={() => changePage(currentPage - 1)}
              className="bg-gray-300 text-gray-600 rounded-lg px-4 py-2 disabled:opacity-50"
            >
              <FiChevronLeft /> Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => changePage(currentPage + 1)}
              className="bg-gray-300 text-gray-600 rounded-lg px-4 py-2 disabled:opacity-50"
            >
              Next <FiChevronRight />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default PatientAppoientment
// import React from 'react'

// function PatientAppoientment() {
//   return (
//     <div>PatientAppoientment</div>
//   )
// }

// export default PatientAppoientment
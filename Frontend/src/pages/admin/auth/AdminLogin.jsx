import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaQuestion, FaSignInAlt, FaLeaf } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const AdminLogin = ({ toggleAdminAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [step, setStep] = useState(1);

  const isDarkMode = false;

  const handleLogin = (e) => {
    e.preventDefault();
    const adminEmail = process.env.REACT_APP_ADMIN_EMAIL;
    const adminPassword = process.env.REACT_APP_ADMIN_PASSWORD;
    
    if (email === adminEmail && password === adminPassword) {
      setStep(2);
    } else {
      alert('Incorrect Email or Password');
    }
  };

  const handleSecurityQuestion = (e) => {
    e.preventDefault();
    const adminAnswer = process.env.REACT_APP_ADMIN_SECURITY_ANSWER;

    if (securityAnswer.toLowerCase() === adminAnswer.toLowerCase()) {
      toggleAdminAuth();
    } else {
      alert('Incorrect answer to the security question');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -50, transition: { duration: 0.5 } }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-100 via-green-200 to-lime-300">
      <Link to="/Authentication">
       <div title='Back to home' className='absolute top-5 left-5 flex items-center gap-2 cursor-pointer hover:bg-lime-600 p-2 text-sm font-black rounded-lg hover:text-white transition duration-200' onClick={() => window.history.back()}>
            <span><FaArrowLeft /></span> <span>back to home</span>
        </div>
      </Link>
     
      <motion.div
        className="bg-white p-8 rounded-3xl shadow-2xl w-96"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="flex items-center justify-center mb-8">
        <img src={`${isDarkMode ? '/images/logos/logo_home_header_dark.png' : '/images/logos/logo_home_header_white.png'}`} alt="header_logo" className="w-56" />
        </div>
        {step === 1 ? (
          <motion.form onSubmit={handleLogin} className="space-y-6">
            <h2 className="text-2xl font-semibold text-lime-700 mb-6 text-center">Admin Login</h2>
            <motion.div variants={inputVariants} className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-lime-500" />
              <input
                type="email"
                placeholder="Enter Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 pl-10 border-b-2 border-lime-300 focus:border-lime-500 focus:outline-none bg-transparent text-lime-800 placeholder-lime-600"
              />
            </motion.div>
            <motion.div variants={inputVariants} className="relative">
              <FaLock className="absolute top-3 left-3 text-lime-500" />
              <input
                type="password"
                placeholder="Enter Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 pl-10 border-b-2 border-lime-300 focus:border-lime-500 focus:outline-none bg-transparent text-lime-800 placeholder-lime-600"
              />
            </motion.div>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-lime-400 to-green-500 text-white p-3 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignInAlt className="mr-2" />
              Login to Rimberio
            </motion.button>
          </motion.form>
        ) : (
          <motion.form onSubmit={handleSecurityQuestion} className="space-y-6">
            <h2 className="text-2xl font-semibold text-lime-700 mb-6 text-center">Security Check</h2>
            <p className="text-lime-600 mb-4 text-center">{process.env.REACT_APP_ADMIN_SECURITY_QUESTION}</p>
            <motion.div variants={inputVariants} className="relative">
              <FaQuestion className="absolute top-3 left-3 text-lime-500" />
              <input
                type="text"
                placeholder="Your Answer"
                value={securityAnswer}
                onChange={(e) => setSecurityAnswer(e.target.value)}
                required
                className="w-full p-3 pl-10 border-b-2 border-lime-300 focus:border-lime-500 focus:outline-none bg-transparent text-lime-800 placeholder-lime-600"
              />
            </motion.div>
            <motion.button
              type="submit"
              className="w-full bg-gradient-to-r from-lime-400 to-green-500 text-white p-3 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-300 flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignInAlt className="mr-2" />
              Verify and Enter
            </motion.button>
          </motion.form>
        )}
      </motion.div>
    </div>
  );
};

export default AdminLogin;
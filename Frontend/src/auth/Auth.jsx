import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiLock, FiCalendar, FiPhone, FiFacebook, FiGithub } from 'react-icons/fi';
import { FaGoogle } from 'react-icons/fa';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import ForgotPassword from './ForgotPassword';
import { FaArrowLeft } from "react-icons/fa6";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhoneChange = (value) => {
    setFormData({ ...formData, phoneNumber: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log('Login:', formData);
      setShowVerification(true);
    } else {
      console.log('Register:', formData);
      setShowVerification(true);
    }
  };

  const handleVerificationSubmit = (e) => {
    e.preventDefault();
    console.log('OTP Verification:', formData.otp);
    setShowVerification(false);
    setIsLogin(true);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setShowVerification(false);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      password: '',
      confirmPassword: '',
      otp: '',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-lime-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">

        <div className='absolute top-5 left-5 flex items-center gap-2 cursor-pointer hover:bg-lime-600 p-2 text-lg font-black rounded-lg border hover:text-white transition duration-200' onClick={() => window.history.back()}>
            <span><FaArrowLeft /></span> <span>back to home</span>
        </div>
      <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-xl shadow-2xl">
        <AnimatePresence mode="wait">
          {!showVerification && !showForgotPassword && (
            <motion.div
              key="auth-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {isLogin ? 'Welcome Back' : 'Join Rimberio'}
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                {isLogin ? 'Sign in to your account' : 'Create your account'}
              </p>
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
                      <input
                        id="first-name"
                        name="firstName"
                        type="text"
                        required
                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
                      <input
                        id="last-name"
                        name="lastName"
                        type="text"
                        required
                        className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                )}
                <div>
                  <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                {!isLogin && (
                  <div>
                    <label htmlFor="phone-number" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <PhoneInput
                      country={'us'}
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                      inputProps={{
                        name: 'phoneNumber',
                        required: true,
                        className: 'mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm',
                      }}
                    />
                  </div>
                )}
                {!isLogin && (
                  <div>
                    <label htmlFor="date-of-birth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                    <input
                      id="date-of-birth"
                      name="dateOfBirth"
                      type="date"
                      required
                      className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
                {!isLogin && (
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      required
                      className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                )}
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-colors duration-300"
                  >
                    {isLogin ? 'Sign In' : 'Create Account'}
                  </button>
                </div>
              </form>
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-300">
                    <FiFacebook className="w-5 h-5 text-blue-600" />
                  </button>
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-300">
                    <FaGoogle className="w-5 h-5 text-blue-400" />
                  </button>
                  <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-colors duration-300">
                    <FiGithub className="w-5 h-5 text-gray-900" />
                  </button>
                </div>
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={toggleAuthMode}
                  className="font-medium text-lime-600 hover:text-lime-500 transition-colors duration-300"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
              {isLogin && (
                <div className="mt-2 text-center">
                  <button
                    onClick={() => setShowForgotPassword(true)}
                    className="font-medium text-lime-600 hover:text-lime-500 transition-colors duration-300"
                  >
                    Forgot your password?
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {showVerification && (
            <motion.div
              key="verification-form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Verify Your Account
              </h2>
              <form className="mt-8 space-y-6" onSubmit={handleVerificationSubmit}>
                <div>
                  <label htmlFor="verification-method" className="block text-sm font-medium text-gray-700">Verification Method</label>
                  <select
                    id="verification-method"
                    name="verificationMethod"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm rounded-md"
                    value={verificationMethod}
                    onChange={(e) => setVerificationMethod(e.target.value)}
                    required
                  >
                    <option value="">Select verification method</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
                    placeholder="Enter 6-digit OTP"
                    value={formData.otp}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-colors duration-300"
                  >
                    Verify
                  </button>
                </div>
              </form>
            </motion.div>
          )}

          {showForgotPassword && (
            <motion.div
              key="forgot-password"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ForgotPassword onBack={() => setShowForgotPassword(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Auth;
import React, { useState } from 'react';
import { FiMail } from 'react-icons/fi';

const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Forgot password for:',

 email);
  };

  return (
    <div>
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Reset Your Password
      </h2>
      <p className="mt-2 text-center text-sm text-gray-600">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-colors duration-300"
          >
            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
              <FiMail className="h-5 w-5 text-lime-500 group-hover:text-lime-400" aria-hidden="true" />
            </span>
            Reset Password
          </button>
        </div>
      </form>
      <div className="mt-6 text-center">
        <button
          onClick={onBack}
          className="font-medium text-lime-600 hover:text-lime-500 transition-colors duration-300"
        >
          Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
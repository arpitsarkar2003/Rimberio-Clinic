import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaSignOutAlt } from 'react-icons/fa';

export default function PatientSettings() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleDelete = () => {
    console.log("Account deleted");
    setShowDeleteModal(false);
  };

  const handleLogout = () => {
    console.log("Logged out");
    setShowLogoutModal(false);
  };

  return (
    <div className="bg h-[50vh] bg-gradient-to-br from-lime-500 to-green-600 text-white flex items-center justify-center px-4 py-10 rounded-tl-[100px] rounded-br-[100px] rounded-tr-[25px] rounded-bl-[15px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-lg"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Account Settings</h1>
        <div className="space-y-4">
          <Button
            icon={<FaSignOutAlt />}
            text="Logout"
            onClick={() => setShowLogoutModal(true)}
            className="bg-indigo-500 hover:bg-indigo-600"
          />
          <Button
            icon={<FaTrash />}
            text="Delete Account"
            onClick={() => setShowDeleteModal(true)}
            className="bg-red-500 hover:bg-red-600"
          />
        </div>

        <ConfirmationModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          title="Delete Account"
          message="Are you sure you want to delete your account? This action cannot be undone."
        />

        <ConfirmationModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
          title="Logout"
          message="Are you sure you want to log out?"
        />
      </motion.div>

      <style>{`
       .bg {
  margin-top: 50px;
  position: relative;
  width: full;
  height: 580px;
  /* background of main div*/
  padding: 20px;
  border-radius: 0px 8px 8px 8px;
  display: grid;
  place-items: center;
}

.bg:before {
  content: "";
  position: absolute;
  top: -40px;
  left: 0;
  height: 40px;
  width: 100px;
  background: transparent;

  /* border-radius of pseudo element */
  border-bottom-left-radius: 50%;

  /* box shadow to give the shadow of the pseudo-element the same color as the background */
  box-shadow: 0 20px 0 0 #84cc16;
}
      `}</style>
    </div>
  );
}

function Button({ icon, text, onClick, className }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`w-full text-white py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 focus:outline-none focus:ring focus:ring-offset-2 focus:ring-indigo-500 ${className}`}
      onClick={onClick}
    >
      {icon && <span>{icon}</span>}
      <span>{text}</span>
    </motion.button>
  );
}

function ConfirmationModal({ isOpen, onClose, onConfirm, title, message }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className=" inset-0 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">{title}</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-all duration-300 focus:outline-none focus:ring focus:ring-gray-300"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-all duration-300 focus:outline-none focus:ring focus:ring-red-300"
                onClick={onConfirm}
              >
                Confirm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

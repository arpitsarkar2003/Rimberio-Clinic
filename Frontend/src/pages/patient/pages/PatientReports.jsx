import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FiFileText, FiDownload, FiEye } from 'react-icons/fi';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Optional for complex table reports

function PatientReports() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // Track search input

  const reports = [
    { id: 1, title: 'Blood Test', date: '2024-10-08', description: 'Detailed blood test results.' },
    { id: 2, title: 'X-Ray', date: '2024-09-21', description: 'Chest X-Ray analysis and report.' },
    { id: 3, title: 'MRI Scan', date: '2024-09-15', description: 'MRI Scan for brain tumor detection.' },
    // Add more reports here
  ];

  // Auto-search logic - filter by both title and date
  const filteredReports = reports.filter((report) => {
    const searchTerm = searchQuery.toLowerCase();
    return (
      report.title.toLowerCase().includes(searchTerm) || report.date.toLowerCase().includes(searchTerm)
    );
  });

  function openModal(report) {
    setSelectedReport(report);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function downloadReport(report) {
    const doc = new jsPDF();
    const logoUrl = '/images/logos/logo_home_header_white.png'; // Path to your logo image

    // Add logo image to the PDF
    const img = new Image();
    img.src = logoUrl;

    img.onload = function () {
      doc.addImage(img, 'PNG', 150, 10, 40, 10); // Logo position and size

      // Add report content
      doc.setFontSize(20);
      doc.text(report.title, 20, 30);
      doc.setFontSize(12);
      doc.text(`Date: ${report.date}`, 20, 40);
      doc.text(report.description, 20, 50);

      // Save the PDF
      doc.save(`${report.title}.pdf`);
    };
  }

  return (
    <div className="md:p-20 p-6 from-lime-50 to-lime-100 bg-gradient-to-br rounded-tl-[100px] rounded-br-[100px] rounded-tr-[25px] rounded-bl-[15px]">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Patient Medical Reports</h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or date"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 w-full rounded-md shadow-md"
        />
      </div>

      {/* Report List */}
      <ul className="divide-y space-y-4 divide-gray-200">
        {filteredReports.length > 0 ? (
          filteredReports.map((report) => (
            <motion.li
              key={report.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between bg-white border-l-4 border-lime-600 p-4 shadow-lg rounded-lg text-gray-900"
            >
              <div>
                <h2 className="text-lg font-semibold flex items-center">
                  <FiFileText className="mr-2 text-lime-600" /> {report.title}
                </h2>
                <p className="text-sm text-gray-500">{report.date}</p>
              </div>
              <div className="flex items-center space-x-4">
                <button 
                  className="hover:text-lime-500 flex items-center"
                  onClick={() => openModal(report)}
                >
                  <FiEye className="mr-2" /> View
                </button>
                <button
                  className="hover:text-lime-500 flex items-center"
                  onClick={() => downloadReport(report)}
                >
                  <FiDownload className="mr-2" /> Download
                </button>
              </div>
            </motion.li>
          ))
        ) : (
          <li className="text-gray-500 text-center">No reports found</li>
        )}
      </ul>

      {/* Modal for Viewing Report */}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="max-w-md w-full transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
                    {selectedReport?.title}
                  </Dialog.Title>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">{selectedReport?.description}</p>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      className="px-4 py-2 bg-lime-600 text-white rounded-md hover:bg-lime-700"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default PatientReports;

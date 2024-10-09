import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiDownload, FiDollarSign, FiCalendar, FiClock, FiUser, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const initialPaymentRecords = [
//   { id: 1, patientName: 'John Doe', amount: 150.00, date: '2023-07-01', time: '10:00 AM', service: 'General Checkup', doctor: 'Dr. Smith', paymentMethod: 'Credit Card' },
//   { id: 2, patientName: 'Jane Smith', amount: 200.00, date: '2023-07-02', time: '11:30 AM', service: 'Dental Cleaning', doctor: 'Dr. Johnson', paymentMethod: 'Cash' },
//   { id: 3, patientName: 'Mike Johnson', amount: 300.00, date: '2023-07-03', time: '2:00 PM', service: 'Specialist Consultation', doctor: 'Dr. Brown', paymentMethod: 'Insurance' },
//   { id: 4, patientName: 'Emily Brown', amount: 100.00, date: '2023-07-04', time: '3:30 PM', service: 'Follow-up Visit', doctor: 'Dr. Davis', paymentMethod: 'Credit Card' },
//   { id: 5, patientName: 'David Lee', amount: 250.00, date: '2023-07-05', time: '9:00 AM', service: 'Lab Tests', doctor: 'Dr. Wilson', paymentMethod: 'Debit Card' },
//   { id: 6, patientName: 'Sarah Johnson', amount: 180.00, date: '2023-07-06', time: '2:30 PM', service: 'Physical Therapy', doctor: 'Dr. Martinez', paymentMethod: 'Insurance' },
//   { id: 7, patientName: 'Tom Wilson', amount: 220.00, date: '2023-07-07', time: '11:00 AM', service: 'X-Ray', doctor: 'Dr. Anderson', paymentMethod: 'Credit Card' },
//   { id: 8, patientName: 'Lisa Garcia', amount: 190.00, date: '2023-07-08', time: '3:00 PM', service: 'Vaccination', doctor: 'Dr. Taylor', paymentMethod: 'Cash' },
];

function PatientPaymentRecords() {
  const [paymentRecords, setPaymentRecords] = useState(initialPaymentRecords);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = paymentRecords.slice(indexOfFirstRecord, indexOfLastRecord);
  const totalPages = Math.ceil(paymentRecords.length / recordsPerPage);

  const generateAllPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Patient Payment Records', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);

    const tableColumn = ["Patient Name", "Amount", "Date", "Time", "Service"];
    const tableRows = paymentRecords.map(record => [
      record.patientName,
      `$${record.amount.toFixed(2)}`,
      record.date,
      record.time,
      record.service
    ]);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [75, 192, 192] },
    });

    doc.save('all_patient_payment_records.pdf');
  };

  const generateSinglePDF = (record) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Transaction Details', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);

    const details = [
      ['Patient Name', record.patientName],
      ['Amount', `$${record.amount.toFixed(2)}`],
      ['Date', record.date],
      ['Time', record.time],
      ['Service', record.service],
      ['Doctor', record.doctor],
      ['Payment Method', record.paymentMethod]
    ];

    doc.autoTable({
      body: details,
      startY: 30,
      styles: { fontSize: 10, cellPadding: 3 },
      theme: 'grid',
    });

    doc.save(`transaction_${record.id}.pdf`);
  };


  if (paymentRecords.length === 0) {
    return (
      <div className=''>
        <div className="relative bg-gradient-to-br from-lime-500 to-green-600 text-white overflow-hidden rounded-tl-[25px] rounded-br-[15px] rounded-tr-[100px] rounded-bl-[175px]">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-lime-500 opacity-50 mix-blend-multiply"></div>
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <div className="text-center animate-fade-in-down">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                You don't Have Any <span className="text-lime-900">Payment Records</span>
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-lime-100 animate-fade-in-up">
                Book an appointment in the <span className='italic font-semibold'>doctors section</span> to start your medical journey
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

  return (
    <div className="overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={generateAllPDF}
            className="flex px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 transition-colors duration-200"
          >
            <FiDownload className="mr-2" />
            Download All Records
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-lime-200">
            <thead className="bg-lime-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-lime-700 uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-lime-700 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-lime-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-lime-700 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-lime-700 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-lime-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-lime-100">
              {currentRecords.map((record) => (
                <tr key={record.id} className="hover:bg-lime-50 transition-colors duration-200 cursor-pointer" onClick={() => setSelectedRecord(record)}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiUser className="mr-2 text-lime-500" />
                      <div className="text-sm font-medium text-gray-900">{record.patientName}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiDollarSign className="mr-2 text-lime-500" />
                      <div className="text-sm text-gray-900">{`$${record.amount.toFixed(2)}`}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiCalendar className="mr-2 text-lime-500" />
                      <div className="text-sm text-gray-900">{record.date}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FiClock className="mr-2 text-lime-500" />
                      <div className="text-sm text-gray-900">{record.time}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={(e) => { e.stopPropagation(); generateSinglePDF(record); }} className="text-lime-500 hover:underline">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 disabled:opacity-50 transition-colors duration-200"
          >
            <FiChevronLeft />
          </button>
          <span className="self-center">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-lime-500 text-white rounded-lg hover:bg-lime-600 disabled:opacity-50 transition-colors duration-200"
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-4 w-96">
            <h2 className="text-xl font-bold mb-2">Transaction Details</h2>
            <div className="mb-4">
              <strong>Patient Name:</strong> {selectedRecord.patientName}
            </div>
            <div className="mb-4">
              <strong>Amount:</strong> ${selectedRecord.amount.toFixed(2)}
            </div>
            <div className="mb-4">
              <strong>Date:</strong> {selectedRecord.date}
            </div>
            <div className="mb-4">
              <strong>Time:</strong> {selectedRecord.time}
            </div>
            <div className="mb-4">
              <strong>Service:</strong> {selectedRecord.service}
            </div>
            <div className="mb-4">
              <strong>Doctor:</strong> {selectedRecord.doctor}
            </div>
            <div className="mb-4">
              <strong>Payment Method:</strong> {selectedRecord.paymentMethod}
            </div>
            <button onClick={() => setSelectedRecord(null)} className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg">Close <FiX className="inline" /></button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientPaymentRecords;

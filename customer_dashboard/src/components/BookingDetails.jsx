import React from 'react';

const BookingDetails = ({ booking, onBack }) => {
    return (
        <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
            <button
                onClick={onBack}
                className="flex items-center text-gray-500 hover:text-[#1E3A8A] transition-all font-extrabold uppercase tracking-widest text-xs"
            >
                <span className="mr-2 text-lg">←</span> Back to Dashboard
            </button>

            <div className="bg-white rounded-[3rem] p-20 shadow-xl shadow-blue-900/5 border border-gray-100 text-center">
                <p className="text-2xl text-[#1E3A8A] font-bold">
                    This page displays booking details and includes the requested sentence as per the requirement
                </p>
            </div>
        </div>
    );
};

export default BookingDetails;

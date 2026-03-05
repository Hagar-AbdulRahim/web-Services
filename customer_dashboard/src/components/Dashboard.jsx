import React, { useState } from 'react';

const Dashboard = ({ onSelectBooking }) => {
    const [filter, setFilter] = useState('All');
    const [entries, setEntries] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const [bookings, setBookings] = useState([
        { id: '1', service: 'Cleaning', bookingDate: '10/2/2026', bookingTime: '10:00', serviceDate: '12/2/2026', serviceTime: '12:00', provider: 'Ahmed', payment: 'Cash', amount: '$200', status: 'PENDING' },
        { id: '2', service: 'Plumbing', bookingDate: '11/2/2026', bookingTime: '09:00', serviceDate: '13/2/2026', serviceTime: '11:00', provider: 'Mohamed', payment: 'Visa', amount: '$350', status: 'DONE' },
        { id: '3', service: 'Electricity', bookingDate: '12/2/2026', bookingTime: '02:00', serviceDate: '14/2/2026', serviceTime: '04:00', provider: 'Ali', payment: 'Cash', amount: '$150', status: 'CANCELED' },
        { id: '4', service: 'Cleaning', bookingDate: '13/2/2026', bookingTime: '11:00', serviceDate: '15/2/2026', serviceTime: '01:00', provider: 'Sara', payment: 'Visa', amount: '$220', status: 'DONE' },
        { id: '5', service: 'Plumbing', bookingDate: '14/2/2026', bookingTime: '08:30', serviceDate: '16/2/2026', serviceTime: '10:30', provider: 'Hassan', payment: 'Cash', amount: '$300', status: 'PENDING' },
        { id: '6', service: 'Painting', bookingDate: '15/2/2026', bookingTime: '10:00', serviceDate: '17/2/2026', serviceTime: '04:00', provider: 'Mona', payment: 'Visa', amount: '$500', status: 'DONE' },
        { id: '7', service: 'Carpentry', bookingDate: '16/2/2026', bookingTime: '12:00', serviceDate: '18/2/2026', serviceTime: '02:00', provider: 'Khaled', payment: 'Cash', amount: '$400', status: 'CANCELED' },
        { id: '8', service: 'AC Repair', bookingDate: '17/2/2026', bookingTime: '09:00', serviceDate: '19/2/2026', serviceTime: '11:00', provider: 'Omar', payment: 'Visa', amount: '$250', status: 'PENDING' },
        { id: '9', service: 'Cleaning', bookingDate: '18/2/2026', bookingTime: '01:00', serviceDate: '20/2/2026', serviceTime: '03:00', provider: 'Ahmed', payment: 'Cash', amount: '$200', status: 'DONE' },
        { id: '10', service: 'Plumbing', bookingDate: '19/2/2026', bookingTime: '03:00', serviceDate: '21/2/2026', serviceTime: '05:00', provider: 'Mohamed', payment: 'Visa', amount: '$350', status: 'PENDING' },
        { id: '11', service: 'Electricity', bookingDate: '20/2/2026', bookingTime: '11:00', serviceDate: '22/2/2026', serviceTime: '01:00', provider: 'Ali', payment: 'Cash', amount: '$150', status: 'DONE' },
        { id: '12', service: 'Painting', bookingDate: '21/2/2026', bookingTime: '08:00', serviceDate: '23/2/2026', serviceTime: '12:00', provider: 'Mona', payment: 'Visa', amount: '$500', status: 'PENDING' },
        { id: '13', service: 'Cleaning', bookingDate: '22/2/2026', bookingTime: '10:30', serviceDate: '24/2/2026', serviceTime: '12:30', provider: 'Ahmed', payment: 'Cash', amount: '$200', status: 'DONE' },
        { id: '14', service: 'Plumbing', bookingDate: '23/2/2026', bookingTime: '09:15', serviceDate: '25/2/2026', serviceTime: '11:15', provider: 'Mohamed', payment: 'Visa', amount: '$350', status: 'CANCELED' },
        { id: '15', service: 'Electricity', bookingDate: '24/2/2026', bookingTime: '02:45', serviceDate: '26/2/2026', serviceTime: '04:45', provider: 'Ali', payment: 'Cash', amount: '$150', status: 'PENDING' },
    ]);

    const handleDelete = (id) => {
        setBookings(prev => prev.filter(b => b.id !== id));
    };

    const filteredBookings = bookings.filter(b => {
        const matchesStatus = filter === 'All' || b.status === filter;
        const matchesSearch = b.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
            b.provider.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const totalPages = Math.ceil(filteredBookings.length / entries);
    const displayedBookings = filteredBookings.slice((currentPage - 1) * entries, currentPage * entries);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'PENDING': return 'bg-[#FEF3C7] text-[#D97706]';
            case 'DONE': return 'bg-[#DCFCE7] text-[#16A34A]';
            case 'CANCELED': return 'bg-[#FEE2E2] text-[#DC2626]';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="space-y-6 font-inter pb-10">
            {/* Page Header matched to screenshot */}
            <div className="flex justify-between items-center bg-white/50 p-2 rounded-2xl">
                <div className="bg-white px-6 py-4 rounded-2xl shadow-sm border border-gray-100 min-w-[280px]">
                    <h2 className="text-xl font-extrabold text-[#1E3A8A] tracking-tight">Booking Management</h2>
                </div>

                <button className="flex items-center space-x-2 bg-[#1E3A8A] text-white px-6 py-4 rounded-2xl font-extrabold text-sm shadow-lg shadow-blue-900/20 hover:bg-[#1a347d] transition-all transform hover:-translate-y-0.5">
                    <span className="text-xl">+</span>
                    <span>ADD NEW BOOKING</span>
                </button>
            </div>

            {/* Table Section */}
            <div className="bg-white rounded-[2rem] shadow-xl shadow-blue-900/5 border border-gray-100 overflow-hidden">
                {/* Search & Main Filter */}
                <div className="p-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-white">
                    <div className="relative w-full md:w-96 group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#1E3A8A] transition-colors">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search recordings..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] transition-all placeholder-gray-400"
                        />
                    </div>

                    <div className="relative w-full md:w-48 group">
                        <select
                            value={filter}
                            onChange={(e) => {
                                setFilter(e.target.value);
                                setCurrentPage(1);
                            }}
                            className="appearance-none block w-full px-6 py-4 bg-gray-50 border border-gray-200 rounded-2xl text-sm font-extrabold text-[#1E3A8A] uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] transition-all cursor-pointer"
                        >
                            <option value="All">ALL STATUS</option>
                            <option value="PENDING">PENDING</option>
                            <option value="DONE">DONE</option>
                            <option value="CANCELED">CANCELED</option>
                        </select>
                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#1E3A8A] opacity-50">
                            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Table Layout matched to blue header screenshot */}
                <div className="overflow-x-auto px-6 pb-6">
                    <table className="w-full text-left">
                        <thead className="sticky top-0 z-10">
                            <tr className="bg-[#1E3A8A] text-white uppercase text-[12px] font-extrabold tracking-widest leading-none rounded-t-2xl">
                                <th className="px-6 py-5 rounded-tl-2xl border-r border-white/10">ID</th>
                                <th className="px-6 py-5 border-r border-white/10">Service Name</th>
                                <th className="px-6 py-5 border-r border-white/10 text-center">Booking Info</th>
                                <th className="px-6 py-5 border-r border-white/10">Provider</th>
                                <th className="px-6 py-5 border-r border-white/10">Amount</th>
                                <th className="px-6 py-5 border-r border-white/10">Status</th>
                                <th className="px-6 py-5 rounded-tr-2xl text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-[13px]">
                            {displayedBookings.length > 0 ? displayedBookings.map((booking, i) => (
                                <tr key={i} className="border-b border-gray-50 hover:bg-[#F8FAFF] transition-all duration-200 cursor-pointer" onClick={() => onSelectBooking(booking)}>
                                    <td className="px-6 py-5 font-bold text-gray-400 group-hover:text-[#1E3A8A]">{booking.id}</td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center space-x-3">
                                            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-[#1E3A8A] font-black text-[10px]">{booking.service.charAt(0)}</div>
                                            <span className="font-extrabold text-gray-800 text-[14px]">{booking.service}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="bg-gray-50 rounded-xl p-2 inline-block min-w-[120px]">
                                            <p className="font-extrabold text-gray-700">{booking.serviceDate}</p>
                                            <p className="text-[11px] text-[#1E3A8A] font-bold mt-0.5 opacity-70">@ {booking.serviceTime}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 font-bold text-gray-600">{booking.provider}</td>
                                    <td className="px-6 py-5">
                                        <span className="font-black text-[15px] text-[#1E3A8A]">{booking.amount}</span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={`px-3 py-1.5 rounded-xl text-[10px] font-black tracking-widest text-center uppercase shadow-sm ${getStatusStyle(booking.status)}`}>
                                            {booking.status}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center justify-center space-x-3" onClick={(e) => e.stopPropagation()}>
                                            <button
                                                onClick={() => onSelectBooking(booking)}
                                                className="text-[#1E3A8A] hover:bg-blue-50 p-2 rounded-xl transition-colors"
                                                title="View Details"
                                            >
                                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                                    <circle cx="12" cy="12" r="3"></circle>
                                                </svg>
                                            </button>
                                            <button
                                                onClick={() => handleDelete(booking.id)}
                                                className="text-red-500 hover:bg-red-50 p-2 rounded-xl transition-colors"
                                                title="Delete Booking"
                                            >
                                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="3 6 5 6 21 6"></polyline>
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan="7" className="px-6 py-20 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                                                <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-300 fill-none stroke-current" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                            </div>
                                            <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">No bookings found</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer Matched to Screenshot Style */}
                <div className="px-8 py-6 flex flex-col md:flex-row justify-between items-center bg-gray-50/50 border-t border-gray-100 gap-4">
                    <div className="flex items-center text-[12px] text-gray-500 font-extrabold uppercase tracking-widest">
                        <span className="mr-3">DISPLAYING</span>
                        <div className="relative">
                            <select
                                value={entries}
                                onChange={(e) => {
                                    setEntries(Number(e.target.value));
                                    setCurrentPage(1);
                                }}
                                className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 text-[#1E3A8A] font-black cursor-pointer shadow-sm"
                            >
                                <option value={5}>5</option>
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                            </select>
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#1E3A8A]">▾</div>
                        </div>
                        <span className="ml-3 italic">ITEMS PER PAGE</span>
                    </div>

                    <div className="flex items-center gap-6">
                        <span className="text-[11px] text-gray-400 font-black uppercase tracking-widest">
                            Showing {(currentPage - 1) * entries + 1} to {Math.min(currentPage * entries, filteredBookings.length)} of {filteredBookings.length}
                        </span>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl text-[#1E3A8A] hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-white transition-all shadow-sm"
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="3"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </button>

                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 rounded-xl text-[12px] font-black transition-all transform hover:scale-105 ${currentPage === i + 1
                                        ? 'bg-[#1E3A8A] text-white shadow-lg shadow-blue-900/30'
                                        : 'bg-white text-gray-400 border border-gray-200 hover:text-[#1E3A8A] hover:border-[#1E3A8A]'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages || totalPages === 0}
                                className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-xl text-[#1E3A8A] hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-white transition-all shadow-sm"
                            >
                                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current" strokeWidth="3"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

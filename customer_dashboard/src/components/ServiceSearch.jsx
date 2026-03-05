import React, { useState } from 'react';

const ServiceSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        category: 'All',
        priceRange: 'All',
        sortBy: 'Default'
    });
    const [selectedService, setSelectedService] = useState(null);
    const [bookingStep, setBookingStep] = useState(0); // 0: Details, 1: Provider/Time, 2: Confirm

    const categories = ['All', 'Cleaning', 'Plumbing', 'Electrical', 'HVAC', 'Pest Control'];

    const services = [
        { id: 1, name: 'AC Maintenance', category: 'HVAC', rating: 4.8, price: '$60 - $150', image: '❄️', providers: 12, description: 'Complete HVAC checkup, gas recharge, and filter cleaning.' },
        { id: 2, name: 'Deep House Cleaning', category: 'Cleaning', rating: 4.9, price: '$85 / hour', image: '🧹', providers: 24, description: 'Professional deep cleaning for every corner of your home.' },
        { id: 3, name: 'Kitchen Sink Repair', category: 'Plumbing', rating: 4.7, price: '$45 Fixed', image: '🚰', providers: 8, description: 'Quick fix for leaks and drainage issues.' },
        { id: 4, name: 'Full Home Rewiring', category: 'Electrical', rating: 4.9, price: 'Custom', image: '⚡', providers: 5, description: 'Safe and certified electrical rewiring for modern homes.' },
    ];

    const handleBookNow = (service) => {
        setSelectedService(service);
        setBookingStep(0);
    };

    const closeBooking = () => {
        setSelectedService(null);
        setBookingStep(0);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Search & Hero Section */}
            <div className="bg-gradient-to-br from-homefix-primary to-blue-700 rounded-[3rem] p-12 text-white shadow-premium relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>

                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-4xl font-bold mb-4">Find reliable services for your home</h2>
                    <p className="text-blue-100 mb-8 font-medium">Over 200+ verified professionals at your fingertips.</p>

                    <div className="bg-white rounded-[2rem] p-2 flex items-center shadow-2xl relative group focus-within:ring-4 ring-blue-400/30 transition-all font-outfit">
                        <span className="ml-6 text-xl grayscale group-focus-within:grayscale-0 transition-all">🔍</span>
                        <input
                            type="text"
                            placeholder="Search for AC repair, Cleaning, Plumber..."
                            className="flex-1 bg-transparent border-none focus:ring-0 text-gray-900 py-4 px-4 font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button className="bg-homefix-primary px-8 py-4 rounded-[1.5rem] font-bold hover:scale-105 transition-transform shadow-lg shadow-blue-200">
                            Search
                        </button>
                    </div>
                </div>
            </div>

            {/* Filters Area */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-premium border border-gray-100 mt-8">
                <div className="flex flex-wrap items-center justify-between gap-6">
                    <div className="flex flex-wrap gap-2">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilters({ ...filters, category: cat })}
                                className={`px-6 py-3 rounded-2xl text-sm font-bold transition-all border ${filters.category === cat
                                        ? 'bg-homefix-primary border-homefix-primary text-white shadow-lg shadow-blue-100'
                                        : 'bg-white border-gray-100 text-gray-500 hover:border-homefix-primary hover:text-homefix-primary'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="flex gap-4">
                        <select className="bg-gray-50 border-gray-100 rounded-2xl py-3 px-6 text-sm font-bold text-gray-600 focus:ring-homefix-primary cursor-pointer">
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Top Rated First</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                    <div key={service.id} className="bg-white rounded-[2rem] overflow-hidden shadow-premium border border-white hover:border-homefix-primary group transition-all cursor-pointer" onClick={() => handleBookNow(service)}>
                        <div className="h-48 bg-gray-50 flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                            {service.image}
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="text-xs font-bold text-homefix-primary uppercase tracking-widest">{service.category}</span>
                                    <h4 className="text-xl font-bold text-gray-900 mt-1">{service.name}</h4>
                                </div>
                                <div className="flex items-center text-amber-500 font-bold bg-amber-50 px-3 py-1 rounded-xl">
                                    <span className="mr-1">★</span> {service.rating}
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-8">
                                <div>
                                    <p className="text-xs text-gray-400 font-bold uppercase">Starting from</p>
                                    <p className="text-lg font-bold text-gray-900">{service.price}</p>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleBookNow(service); }}
                                    className="bg-gray-50 text-homefix-primary px-6 py-3 rounded-xl font-bold hover:bg-homefix-primary hover:text-white transition-all border border-gray-100"
                                >
                                    Book Now
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Booking Modal */}
            {selectedService && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-6 overflow-y-auto">
                    <div className="bg-white rounded-[2.5rem] w-full max-w-2xl shadow-2xl animate-in fade-in zoom-in duration-300 overflow-hidden font-outfit">
                        <div className="h-2 bg-gray-100 w-full">
                            <div className="bg-homefix-primary h-full transition-all duration-500" style={{ width: `${(bookingStep + 1) * 33.33}%` }}></div>
                        </div>

                        <div className="p-10">
                            <div className="flex justify-between items-start mb-8">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">{selectedService.name}</h3>
                                    <p className="text-gray-500">Service Registration & Booking</p>
                                </div>
                                <button onClick={closeBooking} className="text-gray-400 hover:text-gray-600 text-2xl">✕</button>
                            </div>

                            {bookingStep === 0 && (
                                <div className="space-y-6 animate-in slide-in-from-right-4">
                                    <div className="aspect-video bg-gray-100 rounded-3xl flex items-center justify-center text-8xl">
                                        {selectedService.image}
                                    </div>
                                    <p className="text-gray-600 leading-relaxed font-medium">{selectedService.description}</p>
                                    <div className="bg-blue-50 p-6 rounded-2xl flex justify-between items-center">
                                        <div>
                                            <p className="text-xs font-bold text-blue-400 uppercase">Estimated Price</p>
                                            <p className="text-2xl font-bold text-homefix-primary">{selectedService.price}</p>
                                        </div>
                                        <button onClick={() => setBookingStep(1)} className="bg-homefix-primary px-8 py-3 rounded-xl text-white font-bold hover:scale-105 transition-all">
                                            Choose Provider →
                                        </button>
                                    </div>
                                </div>
                            )}

                            {bookingStep === 1 && (
                                <div className="space-y-6 animate-in slide-in-from-right-4">
                                    <h4 className="font-bold text-gray-800">Available Providers</h4>
                                    <div className="space-y-4">
                                        {[
                                            { name: 'Alex Johnson', rating: 4.9, price: '$45/h', status: 'Available' },
                                            { name: 'Sarah Miller', rating: 4.8, price: '$50/h', status: 'Available' },
                                        ].map((p, i) => (
                                            <div key={i} className="p-4 rounded-2xl border border-gray-100 hover:border-homefix-primary cursor-pointer flex justify-between items-center group">
                                                <div className="flex items-center">
                                                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mr-4">👤</div>
                                                    <div>
                                                        <p className="font-bold text-gray-900">{p.name}</p>
                                                        <p className="text-xs text-amber-500">★ {p.rating} (Verified)</p>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-bold text-gray-900">{p.price}</p>
                                                    <button onClick={() => setBookingStep(2)} className="text-xs text-homefix-primary font-bold group-hover:underline">Select Slot</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex space-x-4 pt-4">
                                        <button onClick={() => setBookingStep(0)} className="flex-1 py-4 text-gray-500 font-bold border border-gray-100 rounded-2xl">Back</button>
                                    </div>
                                </div>
                            )}

                            {bookingStep === 2 && (
                                <div className="space-y-8 animate-in slide-in-from-right-4">
                                    <div className="bg-gray-50 p-6 rounded-3xl">
                                        <h4 className="font-bold text-gray-800 mb-4">Select Date & Time</h4>
                                        <div className="grid grid-cols-4 gap-2 mb-6">
                                            {['Mon', 'Tue', 'Wed', 'Thu'].map(d => (
                                                <div key={d} className="p-3 bg-white border border-gray-100 rounded-xl text-center cursor-pointer hover:border-homefix-primary">
                                                    <p className="text-[10px] font-bold text-gray-400 uppercase">{d}</p>
                                                    <p className="font-bold text-gray-800">2{['1', '2', '3', '4'][categories.indexOf(d) % 4]}</p>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {['09:00', '11:00', '14:00', '16:00'].map(t => (
                                                <button key={t} className="px-4 py-2 bg-white border border-gray-100 rounded-xl text-sm font-bold text-gray-600 hover:bg-homefix-primary hover:text-white transition-all font-mono">{t}</button>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            alert('Booking Request Sent Successfully! The provider will be notified.');
                                            closeBooking();
                                        }}
                                        className="w-full py-5 bg-homefix-primary text-white rounded-2xl font-bold shadow-xl shadow-blue-200 hover:scale-[1.02] transition-all"
                                    >
                                        Confirm & Send Request
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceSearch;

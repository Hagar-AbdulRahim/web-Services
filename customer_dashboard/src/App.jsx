import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import BookingDetails from './components/BookingDetails';

const App = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isBookingOpen, setIsBookingOpen] = useState(true);

    const SectionPlaceholder = ({ title }) => (
        <div className="bg-white rounded-lg p-10 shadow-sm border border-gray-100 min-h-[300px] flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-petra-blue mb-2 uppercase">{title}</h2>
            <p className="text-gray-500 max-w-md">Welcome to the {title} section. Here you can manage and view all information related to your account.</p>
        </div>
    );

    const renderContent = () => {
        if (selectedBooking) {
            return <BookingDetails booking={selectedBooking} onBack={() => setSelectedBooking(null)} />;
        }

        switch (activeTab) {
            case 'home':
                return <SectionPlaceholder title="Home Dashboard" />;
            case 'booking-list':
                return <Dashboard onSelectBooking={setSelectedBooking} />;
            case 'points':
                return <SectionPlaceholder title="Loyalty Points" />;
            case 'provider-mgmt':
                return <SectionPlaceholder title="Provider Management" />;
            case 'payout':
                return <SectionPlaceholder title="Payout & Earnings" />;
            case 'customer-mgmt':
                return <SectionPlaceholder title="Customer Management" />;
            case 'system-users':
                return <SectionPlaceholder title="System Users" />;
            case 'points-cashback':
                return <SectionPlaceholder title="Points & Cashback" />;
            default:
                return <Dashboard onSelectBooking={setSelectedBooking} />;
        }
    };

    // Icons matched to Screenshot
    const icons = {
        points: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>,
        home: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>,
        booking: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>,
        providers: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>,
        payout: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line><circle cx="12" cy="14.5" r="2.5"></circle></svg>,
        customers: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>,
        system: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
        cashback: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="8" r="7"></circle><circle cx="12" cy="12" r="7"></circle></svg>,
        logout: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>,
        chevron: <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
    };

    const menu = [
        { id: 'points', label: 'Points', icon: icons.points, badge: '545 LE' },
        { id: 'home', label: 'Home', icon: icons.home },
        {
            id: 'booking-mgmt',
            label: 'Booking Management',
            icon: icons.booking,
            isDropdown: true,
            isOpen: isBookingOpen,
            subItems: [{ id: 'booking-list', label: 'Booking List' }]
        },
        { id: 'provider-mgmt', label: 'Provider Management', icon: icons.providers },
        { id: 'payout', label: 'Payout', icon: icons.payout },
        { id: 'customer-mgmt', label: 'Customer Management', icon: icons.customers },
        { id: 'system-users', label: 'System Users', icon: icons.system },
        { id: 'points-cashback', label: 'Points & Cashback Management', icon: icons.cashback },
    ];

    return (
        <div className="flex min-h-screen bg-petra-bg font-inter text-sm antialiased">
            {/* Sidebar - Light Version like Admin Dashboard */}
            <aside className="w-64 bg-white text-homefix-text flex flex-col fixed h-full border-r border-gray-200 z-20 overflow-y-auto">
                {/* Profile Section */}
                <div className="p-4 flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-2xl bg-petra-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-petra-primary/20 shrink-0">
                        {/* Circle in screenshot but this looks more premium */}
                        <div className="w-10 h-10 rounded-full border-2 border-white/20 flex items-center justify-center">U</div>
                    </div>
                    <div className="min-w-0">
                        <p className="font-extrabold truncate text-[14px] text-petra-primary tracking-tight">abdallah@gmail.com</p>
                        <p className="text-[10px] text-gray-400 font-bold font-inter uppercase tracking-widest">Customer</p>
                    </div>
                </div>

                <div className="px-4 mb-4">
                    <div className="border-b border-gray-100 w-full"></div>
                </div>

                <nav className="flex-1 px-3 space-y-1">
                    {menu.map((item) => {
                        const isActive = activeTab === item.id || (item.isDropdown && item.subItems.some(s => s.id === activeTab));
                        return (
                            <div key={item.id}>
                                <button
                                    onClick={() => {
                                        if (item.isDropdown) {
                                            setIsBookingOpen(!isBookingOpen);
                                        } else {
                                            setActiveTab(item.id);
                                            setSelectedBooking(null);
                                        }
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-300 group ${isActive
                                            ? 'bg-[#EEF2FF] text-petra-primary shadow-sm border-l-4 border-petra-primary'
                                            : 'text-gray-500 hover:bg-gray-50 hover:text-petra-primary'
                                        }`}
                                >
                                    <div className="flex items-center">
                                        <span className={`w-8 shrink-0 transition-colors ${isActive ? 'text-petra-primary' : 'text-gray-400 group-hover:text-petra-primary'}`}>
                                            {item.icon}
                                        </span>
                                        <span className={`font-bold text-[13px] font-inter tracking-tight transition-colors ${isActive ? 'text-petra-primary' : 'group-hover:text-petra-primary'}`}>
                                            {item.label}
                                        </span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {item.badge && (
                                            <span className="bg-petra-accent text-white text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm">
                                                {item.badge}
                                            </span>
                                        )}
                                        {item.isDropdown && (
                                            <span className={`transition-transform duration-300 ${item.isOpen ? 'rotate-180' : ''} ${isActive ? 'text-petra-primary' : 'text-gray-400'}`}>
                                                {icons.chevron}
                                            </span>
                                        )}
                                    </div>
                                </button>

                                {item.isDropdown && item.isOpen && item.subItems && (
                                    <div className="ml-4 mt-1 space-y-1 pb-2 border-l border-gray-100 ml-8">
                                        {item.subItems.map((sub) => {
                                            const isSubActive = activeTab === sub.id;
                                            return (
                                                <button
                                                    key={sub.id}
                                                    onClick={() => {
                                                        setActiveTab(sub.id);
                                                        setSelectedBooking(null);
                                                    }}
                                                    className={`w-full flex items-center px-4 py-2.5 rounded-r-xl font-bold text-[12px] transition-all duration-200 font-inter ${isSubActive
                                                            ? 'text-petra-primary bg-[#F5F8FF] border-l-2 border-petra-primary'
                                                            : 'text-gray-400 hover:text-petra-primary hover:bg-gray-50'
                                                        }`}
                                                >
                                                    <span className={`mr-2 transition-transform duration-200 ${isSubActive ? 'scale-150 text-petra-primary' : 'text-gray-300'}`}>•</span>
                                                    {sub.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <div className="p-4 mt-auto">
                    <button className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-petra-primary text-white font-extrabold text-[13px] rounded-xl shadow-lg shadow-petra-primary/30 hover:bg-[#1a347d] transition-all transform hover:-translate-y-0.5 uppercase tracking-wider group">
                        <span className="w-5 shrink-0 group-hover:rotate-12 transition-transform">{icons.logout}</span>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="ml-64 flex-1 flex flex-col min-w-0 bg-petra-bg min-h-screen">
                <div className="p-8">
                    <div className="max-w-7xl mx-auto">
                        {renderContent()}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default App;

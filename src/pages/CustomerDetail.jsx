import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import customersData from "../data/Customer.json";
import { 
  RiArrowLeftLine, RiUserHeartLine, RiMailSendLine, 
  RiPhoneLine, RiVipCrown2Line, RiHistoryLine,
  RiMapPinLine, RiCalendarLine
} from "react-icons/ri";

export default function CustomerDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [customer, setCustomer] = useState(null);

    useEffect(() => {
        const foundCustomer = customersData.find(c => c.id === id);
        setCustomer(foundCustomer);
    }, [id]);

    if (!customer) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF5F7]">
            <p className="text-rose-400 font-black animate-pulse">Customer tidak ditemukan...</p>
        </div>
    );

    const getLoyaltyStyles = (loyalty) => {
        switch (loyalty) {
            case "Gold":
                return "from-amber-400 to-yellow-600 shadow-amber-200 text-amber-600 bg-amber-50";
            case "Silver":
                return "from-slate-300 to-slate-500 shadow-slate-200 text-slate-500 bg-slate-50";
            case "Bronze":
                return "from-rose-400 to-pink-600 shadow-rose-200 text-rose-500 bg-rose-50";
            default:
                return "from-gray-400 to-gray-600 text-gray-500 bg-gray-50";
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF5F7] p-6 lg:p-10 animate-fadeIn">
            <PageHeader
                title="Profile Details"
                breadcrumb={[
                    { name: "Dashboard", path: "/" },
                    { name: "Customers", path: "/customers" },
                    { name: customer.name }
                ]}
            />

            <div className="mt-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/customers")}
                    className="group flex items-center gap-2 text-rose-400 hover:text-rose-600 mb-8 font-black text-xs uppercase tracking-widest transition-all"
                >
                    <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform" size={18} />
                    Back to Directory
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    
                    {/* Left: Identity Card */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-10 rounded-[3.5rem] shadow-xl shadow-rose-500/5 relative overflow-hidden border border-white">
                            {/* Decorative Background Element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-bl-[5rem] -z-0" />
                            
                            <div className="relative z-10 flex flex-col items-center">
                                <div className={`w-32 h-32 bg-gradient-to-br ${getLoyaltyStyles(customer.loyalty).split(' ').slice(0,2).join(' ')} rounded-[2.5rem] flex items-center justify-center shadow-2xl mb-6 transform -rotate-3`}>
                                    <RiUserHeartLine className="text-5xl text-white" />
                                </div>
                                
                                <h1 className="text-2xl font-black text-slate-800 text-center leading-tight">
                                    {customer.name}
                                </h1>
                                <p className="text-[10px] font-bold text-rose-300 uppercase tracking-[0.2em] mt-2 mb-8">
                                    Customer ID: {customer.id}
                                </p>

                                <div className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-[1.5rem] border-2 border-dashed ${getLoyaltyStyles(customer.loyalty).split(' ').slice(3).join(' ')}`}>
                                    <RiVipCrown2Line size={20} />
                                    <span className="font-black text-sm uppercase tracking-wider">{customer.loyalty} Rank</span>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats Mini Card */}
                        <div className="bg-gradient-to-r from-rose-500 to-pink-500 p-8 rounded-[2.5rem] text-white shadow-lg shadow-rose-200">
                            <p className="text-rose-100 text-[10px] font-black uppercase tracking-widest mb-1">Total Spending</p>
                            <h4 className="text-2xl font-black italic">Rp 4.250.000</h4>
                        </div>
                    </div>

                    {/* Right: Detailed Info */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white/70 backdrop-blur-md p-10 rounded-[3.5rem] shadow-xl shadow-rose-500/5 border border-white">
                            <h2 className="text-xl font-black text-slate-800 mb-10 flex items-center gap-3">
                                <span className="w-8 h-1 bg-rose-500 rounded-full" />
                                Contact Information
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Email Item */}
                                <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-rose-50 hover:border-rose-200 transition-colors">
                                    <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500 shrink-0">
                                        <RiMailSendLine size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-rose-300 uppercase tracking-widest mb-0.5">Official Email</p>
                                        <p className="text-sm font-bold text-slate-700">{customer.email}</p>
                                    </div>
                                </div>

                                {/* Phone Item */}
                                <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-rose-50 hover:border-rose-200 transition-colors">
                                    <div className="w-14 h-14 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500 shrink-0">
                                        <RiPhoneLine size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-rose-300 uppercase tracking-widest mb-0.5">Phone Number</p>
                                        <p className="text-sm font-bold text-slate-700">{customer.phone}</p>
                                    </div>
                                </div>

                                {/* Location (Static Placeholder) */}
                                <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-rose-50 hover:border-rose-200 transition-colors">
                                    <div className="w-14 h-14 bg-fuchsia-50 rounded-2xl flex items-center justify-center text-fuchsia-500 shrink-0">
                                        <RiMapPinLine size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-rose-300 uppercase tracking-widest mb-0.5">Location</p>
                                        <p className="text-sm font-bold text-slate-700">Jakarta, Indonesia</p>
                                    </div>
                                </div>

                                {/* Membership Since */}
                                <div className="flex items-center gap-5 p-6 bg-white rounded-3xl border border-rose-50 hover:border-rose-200 transition-colors">
                                    <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 shrink-0">
                                        <RiCalendarLine size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-rose-300 uppercase tracking-widest mb-0.5">Member Since</p>
                                        <p className="text-sm font-bold text-slate-700">Januari 2024</p>
                                    </div>
                                </div>
                            </div>

                            {/* Loyalty Perks Section */}
                            <div className="mt-12 p-8 bg-rose-50/50 rounded-[2.5rem] border border-rose-100/50">
                                <div className="flex items-center gap-3 mb-4">
                                    <RiVipCrown2Line className="text-rose-500" />
                                    <h4 className="text-sm font-black text-rose-500 uppercase tracking-widest">Active Benefits</h4>
                                </div>
                                <p className="text-sm text-slate-600 font-medium leading-relaxed">
                                    Sebagai member <span className="font-black text-rose-500">{customer.loyalty}</span>, 
                                    {customer.name} berhak mendapatkan prioritas layanan pelanggan dan diskon khusus 
                                    {customer.loyalty === "Gold" ? " 20% " : customer.loyalty === "Silver" ? " 10% " : " 5% "} 
                                    untuk setiap transaksi di atas Rp 500.000.
                                </p>
                            </div>

                            {/* Transaction History Placeholder */}
                            <div className="mt-10 pt-10 border-t border-rose-100">
                                <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-3">
                                    <RiHistoryLine size={22} className="text-rose-400" />
                                    Transaction History
                                </h3>
                                <div className="bg-white/40 border-2 border-dashed border-rose-100 py-12 rounded-[2rem] text-center">
                                    <p className="text-rose-300 text-xs font-bold uppercase tracking-widest">No recent transactions found</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
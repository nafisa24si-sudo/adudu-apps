import { FaShoppingCart, FaTruck, FaBan, FaDollarSign, FaArrowUp, FaArrowDown } from "react-icons/fa";
import PageHeader from "../components/PageHeader";
import { useState, useEffect } from "react";

// Komponen Reusable untuk Stat Card
const StatCard = ({ title, value, icon: Icon, color, delay, trend, isCurrency }) => {
    const colors = {
        green: "from-emerald-400 to-teal-600 shadow-emerald-200",
        blue: "from-blue-400 to-indigo-600 shadow-blue-200",
        red: "from-rose-400 to-red-600 shadow-red-200",
        yellow: "from-amber-400 to-orange-500 shadow-amber-200",
    };

    return (
        <div className={`group relative bg-white border border-gray-100 rounded-3xl shadow-sm p-6 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 animate-slideInUp ${delay}`}>
            {/* Dekorasi Background */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${colors[color]} opacity-5 rounded-full blur-2xl group-hover:opacity-20 transition-opacity duration-500`}></div>
            
            <div className="flex items-start justify-between">
                <div className="space-y-4">
                    <div className={`w-14 h-14 flex items-center justify-center bg-gradient-to-br ${colors[color]} rounded-2xl shadow-lg transform transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110`}>
                        <Icon className="text-2xl text-white" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
                        <h3 className="text-3xl font-extrabold text-gray-800 mt-1 italic tracking-tight">
                            {isCurrency && "Rp "}
                            {value.toLocaleString('id-ID')}
                        </h3>
                    </div>
                </div>
                
                {/* Indikator Tren */}
                <div className={`flex items-center space-x-1 text-xs font-bold px-2 py-1 rounded-full ${trend > 0 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {trend > 0 ? <FaArrowUp /> : <FaArrowDown />}
                    <span>{Math.abs(trend)}%</span>
                </div>
            </div>

            {/* Progress Bar Mini */}
            <div className="mt-6 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div 
                    className={`h-full bg-gradient-to-r ${colors[color]} transition-all duration-1000 ease-out`}
                    style={{ width: '70%' }}
                ></div>
            </div>
        </div>
    );
};

export default function Dashboard() {
    const [counts, setCounts] = useState({ orders: 0, delivered: 0, canceled: 0, revenue: 0 });

    useEffect(() => {
        const targets = { orders: 75, delivered: 175, canceled: 40, revenue: 128000000 };
        
        const animate = (key, target) => {
            let start = 0;
            const duration = 1500;
            const step = (target / duration) * 20;

            const timer = setInterval(() => {
                start += step;
                if (start >= target) {
                    setCounts(prev => ({ ...prev, [key]: target }));
                    clearInterval(timer);
                } else {
                    setCounts(prev => ({ ...prev, [key]: Math.floor(start) }));
                }
            }, 20);
        };

        Object.keys(targets).forEach(key => animate(key, targets[key]));
    }, []);

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 animate-fadeIn">
            <PageHeader
                title="Business Overview"
                breadcrumb={[{ name: "Dashboard", path: "/" }]}
            />

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <StatCard 
                    title="Total Orders" 
                    value={counts.orders} 
                    icon={FaShoppingCart} 
                    color="green" 
                    trend={12.5}
                />
                <StatCard 
                    title="Delivered" 
                    value={counts.delivered} 
                    icon={FaTruck} 
                    color="blue" 
                    delay="animation-delay-100" 
                    trend={8.2}
                />
                <StatCard 
                    title="Canceled" 
                    value={counts.canceled} 
                    icon={FaBan} 
                    color="red" 
                    delay="animation-delay-200" 
                    trend={-2.4}
                />
                <StatCard 
                    title="Total Revenue" 
                    value={counts.revenue} 
                    icon={FaDollarSign} 
                    color="yellow" 
                    delay="animation-delay-300" 
                    isCurrency 
                    trend={14.1}
                />
            </div>

            {/* Placeholder untuk Chart atau Tabel (Opsional) */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400 italic">
                    [ Grafik Penjualan Mingguan ]
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-64 flex items-center justify-center text-gray-400 italic">
                    [ Aktivitas Terbaru ]
                </div>
            </div>
        </div>
    );
}
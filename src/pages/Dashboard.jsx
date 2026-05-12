import { useState, useEffect } from "react";
import { 
  RiShoppingBag3Line, RiTruckLine, RiCloseCircleLine, 
  RiHeartPulseLine, RiBox3Line, RiArrowRightUpLine, 
  RiArrowRightDownLine, RiMore2Fill, RiAddLine, RiSearchLine 
} from "react-icons/ri";
import productsData from "../data/Product.json";
import PageHeader from "../components/PageHeader";

// StatCard dengan sentuhan Soft Pink & Glassmorphism
const StatCard = ({ title, value, icon: Icon, color, trend, isCurrency, delay }) => {
  // Mapping warna pink yang berbeda untuk tiap card agar tidak membosankan
  const colorMap = {
    rose: "text-rose-500 bg-rose-50 border-rose-100 shadow-rose-100/50",
    pink: "text-pink-500 bg-pink-50 border-pink-100 shadow-pink-100/50",
    fuchsia: "text-fuchsia-500 bg-fuchsia-50 border-fuchsia-100 shadow-fuchsia-100/50",
    hotpink: "text-[#FF69B4] bg-pink-50 border-pink-100 shadow-pink-100/50",
  };

  return (
    <div className={`group relative p-7 rounded-[2.5rem] bg-white border border-rose-50 shadow-xl shadow-rose-500/5 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-500/10 ${delay}`}>
      {/* Decorative Glow */}
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-rose-200/20 blur-3xl rounded-full group-hover:bg-rose-400/20 transition-colors" />

      <div className="flex justify-between items-start">
        <div className={`p-4 rounded-2xl ${colorMap[color]} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
          <Icon size={24} />
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold ${trend > 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
          {trend > 0 ? <RiArrowRightUpLine /> : <RiArrowRightDownLine />}
          {Math.abs(trend)}%
        </div>
      </div>

      <div className="mt-8">
        <p className="text-xs font-bold text-rose-300 uppercase tracking-[0.15em]">{title}</p>
        <div className="flex items-baseline gap-1 mt-1">
          {isCurrency && <span className="text-lg font-semibold text-rose-200">Rp</span>}
          <h3 className="text-3xl font-black text-slate-800 tracking-tight">
            {value.toLocaleString('id-ID')}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [counts, setCounts] = useState({ orders: 0, delivered: 0, canceled: 0, revenue: 0, products: 0 });

  useEffect(() => {
    const targets = { orders: 75, delivered: 175, canceled: 40, revenue: 128000000, products: productsData.length };
    Object.keys(targets).forEach(key => {
      let start = 0;
      const duration = 2000;
      const increment = targets[key] / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= targets[key]) {
          setCounts(prev => ({ ...prev, [key]: targets[key] }));
          clearInterval(timer);
        } else {
          setCounts(prev => ({ ...prev, [key]: Math.floor(start) }));
        }
      }, 16);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF5F7] p-6 lg:p-10 text-slate-800 selection:bg-rose-200">
      {/* Header Section */}
      <nav className="flex flex-wrap items-center justify-between gap-6 mb-12">
        <div className="space-y-1">
          <h1 className="text-3xl font-black bg-gradient-to-r from-rose-500 to-fuchsia-600 bg-clip-text text-transparent italic">
            Pinklytics.
          </h1>
          <p className="text-xs font-bold text-rose-300 uppercase tracking-widest">Premium Business Insight</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300" />
            <input 
              type="text" 
              placeholder="Search reports..." 
              className="pl-11 pr-6 py-3 bg-white/60 backdrop-blur-sm border border-rose-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-rose-500/10 transition-all w-64 placeholder:text-rose-200"
            />
          </div>
          <button className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white px-7 py-3.5 rounded-[1.2rem] font-bold transition-all shadow-lg shadow-rose-200 active:scale-95 text-sm">
            <RiAddLine size={20} />
            <span>Create Campaign</span>
          </button>
        </div>
      </nav>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-12">
        <StatCard title="Total Orders" value={counts.orders} icon={RiShoppingBag3Line} color="rose" trend={12.5} />
        <StatCard title="Completed" value={counts.delivered} icon={RiTruckLine} color="pink" trend={8.2} delay="delay-75" />
        <StatCard title="Lost Sales" value={counts.canceled} icon={RiCloseCircleLine} color="fuchsia" trend={-2.4} delay="delay-150" />
        <StatCard title="Revenue" value={counts.revenue} icon={RiHeartPulseLine} color="hotpink" trend={14.1} isCurrency delay="delay-200" />
        <StatCard title="Products" value={counts.products} icon={RiBox3Line} color="rose" trend={5.3} delay="delay-300" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Sales Chart Section */}
        <div className="xl:col-span-2 bg-white p-10 rounded-[3.5rem] shadow-xl shadow-rose-500/5 relative overflow-hidden group">
          <div className="flex justify-between items-center mb-10">
            <div>
              <h3 className="text-2xl font-black tracking-tight text-slate-800">Growth Analysis</h3>
              <p className="text-sm font-medium text-rose-300 mt-1">Real-time performance metrics</p>
            </div>
            <div className="flex gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 animate-pulse" />
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-widest">Live Data</span>
            </div>
          </div>
          
          <div className="h-72 flex items-end justify-between gap-4">
            {[45, 65, 55, 85, 100, 75, 90, 60].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar cursor-pointer">
                <div className="relative w-full">
                    <div 
                    className="w-full bg-rose-50 rounded-2xl h-[240px] transition-all duration-500 group-hover/bar:bg-rose-100"
                    >
                    <div 
                        className="absolute bottom-0 w-full bg-gradient-to-t from-rose-500 to-pink-400 rounded-2xl shadow-lg shadow-rose-200 transition-all duration-1000 ease-out group-hover/bar:brightness-110"
                        style={{ height: `${val}%` }}
                    />
                    </div>
                </div>
                <span className="text-[10px] font-extrabold text-rose-200 group-hover/bar:text-rose-500 transition-colors tracking-tighter">OCT {10 + i}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Product Section */}
        <div className="bg-gradient-to-b from-white to-rose-50/30 p-10 rounded-[3.5rem] border border-white shadow-xl shadow-rose-500/5">
          <h3 className="text-2xl font-black mb-8 tracking-tight">Best Sellers</h3>
          
          <div className="space-y-5">
            {productsData.slice(0, 4).map((p) => (
              <div key={p.id} className="flex items-center gap-5 p-2 group cursor-pointer transition-all">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-50 to-pink-50 rounded-[1.5rem] flex items-center justify-center text-rose-500 font-black text-xl group-hover:scale-110 transition-transform shadow-inner">
                  {p.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="text-sm font-black text-slate-800 leading-tight group-hover:text-rose-500 transition-colors">{p.name}</h4>
                  <p className="text-[10px] font-bold text-rose-300 mt-1 uppercase tracking-widest">{p.category}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-slate-900">Rp {p.price.toLocaleString('id-ID')}</p>
                  <span className="text-[9px] font-black text-emerald-500 uppercase">+12%</span>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-10 py-5 rounded-[2rem] bg-rose-50 text-rose-500 font-black text-xs uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all shadow-inner">
            Explore Collection
          </button>
        </div>
      </div>
    </div>
  );
}
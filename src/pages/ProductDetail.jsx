import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import productsData from "../data/Product.json";
import { 
  RiArrowLeftLine, RiPriceTag3Line, RiShoppingBag3Fill, 
  RiStackLine, RiInformationLine, RiHeartFill, RiShareLine
} from "react-icons/ri";

export default function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const foundProduct = productsData.find(p => p.id === id);
        setProduct(foundProduct);
    }, [id]);

    if (!product) return (
        <div className="min-h-screen flex items-center justify-center bg-[#FFF5F7]">
            <p className="text-rose-400 font-black animate-pulse uppercase tracking-widest">Searching Product...</p>
        </div>
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case "Available":
                return "bg-emerald-50 text-emerald-600 border-emerald-100";
            case "Low Stock":
                return "bg-amber-50 text-amber-600 border-amber-100";
            case "Out of Stock":
                return "bg-rose-50 text-rose-600 border-rose-100";
            default:
                return "bg-slate-50 text-slate-500 border-slate-100";
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF5F7] p-6 lg:p-10 animate-fadeIn">
            <PageHeader
                title="Product Insight"
                breadcrumb={[
                    { name: "Dashboard", path: "/" },
                    { name: "Products", path: "/products" },
                    { name: product.name }
                ]}
            />

            <div className="mt-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/products")}
                    className="group flex items-center gap-2 text-rose-400 hover:text-rose-600 mb-8 font-black text-xs uppercase tracking-widest transition-all"
                >
                    <RiArrowLeftLine className="group-hover:-translate-x-1 transition-transform" size={18} />
                    Back to Inventory
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    
                    {/* Left: Product Showcase */}
                    <div className="space-y-6">
                        <div className="bg-white p-4 rounded-[3.5rem] shadow-2xl shadow-rose-500/5 relative overflow-hidden group border border-white">
                            <div className="absolute top-8 right-8 flex flex-col gap-3 z-10">
                                <button className="p-3 bg-white/80 backdrop-blur-md rounded-2xl text-rose-500 shadow-sm hover:bg-rose-500 hover:text-white transition-all">
                                    <RiHeartFill size={20} />
                                </button>
                                <button className="p-3 bg-white/80 backdrop-blur-md rounded-2xl text-slate-400 shadow-sm hover:bg-slate-800 hover:text-white transition-all">
                                    <RiShareLine size={20} />
                                </button>
                            </div>
                            
                            <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-rose-50">
                                <img
                                    src={product.image || "https://via.placeholder.com/600"}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right: Detailed Analysis */}
                    <div className="bg-white/60 backdrop-blur-xl p-10 lg:p-14 rounded-[3.5rem] shadow-xl shadow-rose-500/5 border border-white relative overflow-hidden">
                        {/* Status Badge Top */}
                        <div className="mb-8">
                            <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border ${getStatusStyle(product.status)}`}>
                                ● {product.status}
                            </span>
                        </div>

                        <div className="mb-10">
                            <h1 className="text-4xl lg:text-5xl font-black text-slate-800 leading-tight mb-4 tracking-tighter">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-4 text-rose-300">
                                <span className="text-xs font-bold uppercase tracking-widest bg-rose-50 px-3 py-1 rounded-lg">
                                    {product.category}
                                </span>
                                <span className="text-xs font-medium">SKU: {product.id}</span>
                            </div>
                        </div>

                        <div className="mb-10">
                            <p className="text-slate-500 leading-relaxed font-medium italic">
                                "{product.description || "No description available for this premium product selection."}"
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-12">
                            <div className="p-6 bg-white rounded-3xl border border-rose-50 shadow-sm">
                                <p className="text-[10px] font-black text-rose-300 uppercase tracking-widest mb-2">Retail Price</p>
                                <h3 className="text-2xl font-black text-rose-500">
                                    Rp {product.price.toLocaleString("id-ID")}
                                </h3>
                            </div>
                            <div className="p-6 bg-white rounded-3xl border border-rose-50 shadow-sm">
                                <p className="text-[10px] font-black text-rose-300 uppercase tracking-widest mb-2">In Stock</p>
                                <h3 className="text-2xl font-black text-slate-800">
                                    {product.stock} <span className="text-sm text-slate-400 font-bold uppercase">Units</span>
                                </h3>
                            </div>
                        </div>

                        {/* Inventory Specs */}
                        <div className="space-y-4 mb-12">
                            <div className="flex items-center justify-between py-4 border-b border-rose-50">
                                <span className="flex items-center gap-2 text-xs font-black text-rose-300 uppercase tracking-widest">
                                    <RiPriceTag3Line size={16} /> Base Category
                                </span>
                                <span className="text-sm font-bold text-slate-700">{product.category}</span>
                            </div>
                            <div className="flex items-center justify-between py-4 border-b border-rose-50">
                                <span className="flex items-center gap-2 text-xs font-black text-rose-300 uppercase tracking-widest">
                                    <RiStackLine size={16} /> Inventory Status
                                </span>
                                <span className="text-sm font-bold text-slate-700">{product.stock > 0 ? 'Verified In-Store' : 'Sold Out'}</span>
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-rose-200 font-bold mt-4 italic">
                                <RiInformationLine /> Terakhir diperbarui pada hari ini pukul 09:00 WIB
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-rose-200 hover:brightness-110 active:scale-[0.98] transition-all">
                                <RiShoppingBag3Fill size={18} />
                                Add to Order
                            </button>
                            <button className="px-8 py-5 rounded-[2rem] border-2 border-rose-100 text-rose-500 font-black text-xs uppercase tracking-[0.2em] hover:bg-rose-50 transition-all">
                                Edit Info
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
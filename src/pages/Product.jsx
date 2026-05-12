import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  RiBox3Line, RiAddLine, RiSearch2Line, 
  RiPriceTag3Line, RiStackLine, RiArrowRightSLine 
} from "react-icons/ri";
import PageHeader from "../components/PageHeader";
import productsData from "../data/Product.json";

export default function Products() {
  const [products] = useState(productsData);

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
      {/* Header dengan Button Pink Gradasi */}
      <PageHeader
        title="Inventory"
        breadcrumb={[{ name: "Dashboard", path: "/" }, { name: "Products" }]}
      >
        <button className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-rose-200 transition-all active:scale-95 shadow-md text-sm">
          <RiAddLine size={20} />
          <span>New Product</span>
        </button>
      </PageHeader>

      {/* Stats Mini - Memberikan konteks cepat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-8">
        <div className="bg-white p-6 rounded-[2rem] border border-rose-50 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
            <RiStackLine size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-rose-300 uppercase tracking-widest">Total Items</p>
            <h4 className="text-xl font-black text-slate-800">{products.length}</h4>
          </div>
        </div>
        <div className="bg-white p-6 rounded-[2rem] border border-rose-50 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
            <RiBox3Line size={24} />
          </div>
          <div>
            <p className="text-[10px] font-black text-rose-300 uppercase tracking-widest">Low Stock</p>
            <h4 className="text-xl font-black text-slate-800">12 Items</h4>
          </div>
        </div>
        <div className="relative overflow-hidden bg-gradient-to-br from-rose-500 to-pink-600 p-6 rounded-[2rem] text-white shadow-lg shadow-rose-100">
           <div className="relative z-10">
              <p className="text-rose-100 text-[10px] font-black uppercase tracking-widest">Store Value</p>
              <h4 className="text-xl font-black italic">Rp 248.500.000</h4>
           </div>
           <RiPriceTag3Line className="absolute -right-2 -bottom-2 text-white/10 rotate-12" size={80} />
        </div>
      </div>

      {/* Modern Table Container */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-rose-500/5 border border-rose-50 overflow-hidden">
        <div className="p-8 border-b border-rose-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-lg font-black text-slate-800">Product Catalog</h3>
            <div className="relative w-full md:w-72">
                <RiSearch2Line className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300" />
                <input 
                    type="text" 
                    placeholder="Search catalog..." 
                    className="w-full pl-11 pr-5 py-3 bg-rose-50/50 border border-transparent rounded-xl focus:bg-white focus:border-rose-100 focus:outline-none text-sm transition-all"
                />
            </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-rose-400 uppercase text-[10px] font-black tracking-[0.2em]">
                <th className="px-8 py-6">Product Information</th>
                <th className="px-8 py-6">Category</th>
                <th className="px-8 py-6">Pricing</th>
                <th className="px-8 py-6">Stock Level</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-50">
              {products.map((product) => (
                <tr key={product.id} className="group hover:bg-rose-50/30 transition-all">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-400 font-bold group-hover:scale-110 transition-transform shadow-inner border border-rose-100/50">
                        {product.name.charAt(0)}
                      </div>
                      <div>
                        <Link to={`/products/${product.id}`} className="text-sm font-black text-slate-800 hover:text-rose-500 transition-colors block">
                          {product.name}
                        </Link>
                        <span className="text-[10px] font-bold text-rose-200 tracking-wider uppercase">SKU: {product.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                        {product.category}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="text-sm font-black text-slate-800">
                      Rp {product.price.toLocaleString("id-ID")}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-2 w-32">
                        <div className="flex justify-between text-[10px] font-black uppercase text-rose-300">
                            <span>Qty</span>
                            <span>{product.stock}</span>
                        </div>
                        <div className="h-1.5 w-full bg-rose-50 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full transition-all duration-1000 ${product.stock < 10 ? 'bg-rose-500' : 'bg-rose-300'}`}
                                style={{ width: `${Math.min((product.stock / 50) * 100, 100)}%` }}
                            />
                        </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${getStatusStyle(product.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusStyle(product.status).split(' ')[0].replace('bg-', 'bg-current')}`} />
                      {product.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <button className="p-2 hover:bg-white rounded-xl text-rose-300 hover:text-rose-500 transition-all">
                        <RiArrowRightSLine size={24} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Simple Pagination Placeholder */}
        <div className="p-8 bg-rose-50/20 flex justify-center border-t border-rose-50">
            <div className="flex gap-2">
                {[1, 2, 3].map(n => (
                    <button key={n} className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${n === 1 ? 'bg-rose-500 text-white shadow-md' : 'bg-white text-rose-300 hover:bg-rose-100'}`}>
                        {n}
                    </button>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
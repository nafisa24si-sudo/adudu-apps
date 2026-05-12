import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  RiUserAddLine, RiMailLine, RiPhoneLine, RiVipCrownLine, 
  RiSearchLine, RiCloseLine, RiFilter3Line 
} from "react-icons/ri";
import PageHeader from "../components/PageHeader";
import customersData from "../data/Customer.json";

export default function Customers() {
  const [customers] = useState(customersData);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loyalty: "Bronze",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Customer ${formData.name} added successfully!`);
    setShowForm(false);
    setFormData({ name: "", email: "", phone: "", loyalty: "Bronze" });
  };

  const getLoyaltyBadge = (loyalty) => {
    switch (loyalty) {
      case "Gold":
        return "bg-amber-100 text-amber-600 border-amber-200";
      case "Silver":
        return "bg-slate-100 text-slate-500 border-slate-200";
      case "Bronze":
        return "bg-rose-100 text-rose-500 border-rose-200";
      default:
        return "bg-gray-100 text-gray-500 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] p-6 lg:p-10 animate-fadeIn">
      {/* Header dengan Style Pink */}
      <div className="mb-10">
        <PageHeader
          title="Customer Base"
          breadcrumb={[{ name: "Dashboard", path: "/" }, { name: "Customers" }]}
        >
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-rose-200 transition-all active:scale-95 shadow-md text-sm"
          >
            <RiUserAddLine size={18} />
            Add New Customer
          </button>
        </PageHeader>
      </div>

      {/* Toolbar: Search & Filter */}
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <RiSearchLine className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-300" />
          <input 
            type="text" 
            placeholder="Search by name or email..." 
            className="w-full pl-11 pr-6 py-3 bg-white/80 border border-rose-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-rose-500/10 transition-all placeholder:text-rose-200 text-sm"
          />
        </div>
        <button className="flex items-center justify-center gap-2 bg-white border border-rose-100 text-rose-400 px-5 py-3 rounded-2xl hover:bg-rose-50 transition-all text-sm font-bold">
          <RiFilter3Line /> Filter
        </button>
      </div>

      {/* Customer Table - Modern Style */}
      <div className="bg-white rounded-[2.5rem] shadow-xl shadow-rose-500/5 overflow-hidden border border-rose-50">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-rose-50/50 text-rose-400 uppercase text-[11px] font-black tracking-[0.15em]">
                <th className="p-6 text-left">Customer</th>
                <th className="p-6 text-left">Contact Info</th>
                <th className="p-6 text-left">Status</th>
                <th className="p-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-50">
              {customers.map((customer) => (
                <tr key={customer.id} className="group hover:bg-rose-50/30 transition-all">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-50 flex items-center justify-center text-rose-500 font-bold group-hover:scale-110 transition-transform">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <Link to={`/customers/${customer.id}`} className="text-sm font-black text-slate-800 hover:text-rose-500 transition-colors">
                          {customer.name}
                        </Link>
                        <p className="text-[10px] font-bold text-rose-300 uppercase mt-0.5 tracking-tighter">ID: {customer.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <RiMailLine className="text-rose-300" /> {customer.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <RiPhoneLine className="text-rose-300" /> {customer.phone}
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`flex items-center gap-1.5 w-fit px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${getLoyaltyBadge(customer.loyalty)}`}>
                      <RiVipCrownLine size={12} />
                      {customer.loyalty}
                    </span>
                  </td>
                  <td className="p-6 text-center">
                    <button className="text-rose-300 hover:text-rose-500 font-black text-[10px] uppercase tracking-widest p-2 hover:bg-white rounded-xl transition-all">
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal - Glassmorphism Pink */}
      {showForm && (
        <div className="fixed inset-0 bg-rose-900/20 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl relative animate-slideInUp">
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-6 right-6 p-2 text-rose-200 hover:text-rose-500 transition-colors"
            >
              <RiCloseLine size={24} />
            </button>

            <div className="mb-8">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">New Customer</h2>
              <p className="text-sm font-medium text-rose-300">Add user to loyalty program</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] font-black text-rose-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-rose-50 border border-transparent rounded-[1.2rem] focus:bg-white focus:border-rose-200 focus:outline-none focus:ring-4 focus:ring-rose-500/5 transition-all text-sm font-medium"
                  placeholder="e.g. Jane Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-rose-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-5 py-4 bg-rose-50 border border-transparent rounded-[1.2rem] focus:bg-white focus:border-rose-200 focus:outline-none focus:ring-4 focus:ring-rose-500/5 transition-all text-sm font-medium"
                  placeholder="jane@example.com"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-black text-rose-400 uppercase tracking-widest mb-2 ml-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-rose-50 border border-transparent rounded-[1.2rem] focus:bg-white focus:border-rose-200 focus:outline-none focus:ring-4 focus:ring-rose-500/5 transition-all text-sm font-medium"
                    placeholder="0812..."
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black text-rose-400 uppercase tracking-widest mb-2 ml-1">Loyalty</label>
                  <select
                    name="loyalty"
                    value={formData.loyalty}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-rose-50 border border-transparent rounded-[1.2rem] focus:bg-white focus:border-rose-200 focus:outline-none focus:ring-4 focus:ring-rose-500/5 transition-all text-sm font-bold text-rose-500"
                  >
                    <option value="Bronze">Bronze</option>
                    <option value="Silver">Silver</option>
                    <option value="Gold">Gold</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-5 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-rose-200 hover:brightness-110 active:scale-[0.98] transition-all"
                >
                  Save Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
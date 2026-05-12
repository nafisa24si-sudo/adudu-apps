import { useState } from "react";
import { RiAddLine, RiTimeLine, RiCheckboxCircleLine, RiCloseCircleLine, RiFileList3Line } from "react-icons/ri";
import PageHeader from "../components/PageHeader";
import ordersData from "../data/Order.json";

export default function Orders() {
  const [orders] = useState(ordersData);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    status: "Pending",
    total: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order for ${formData.customerName} added successfully!`);
    setShowForm(false);
    setFormData({ customerName: "", status: "Pending", total: "" });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "Completed":
        return {
          color: "text-emerald-600 bg-emerald-50 border-emerald-100",
          icon: <RiCheckboxCircleLine />
        };
      case "Pending":
        return {
          color: "text-amber-600 bg-amber-50 border-amber-100",
          icon: <RiTimeLine />
        };
      case "Cancelled":
        return {
          color: "text-rose-600 bg-rose-50 border-rose-100",
          icon: <RiCloseCircleLine />
        };
      default:
        return {
          color: "text-slate-500 bg-slate-50 border-slate-100",
          icon: <RiFileList3Line />
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F7] p-6 lg:p-10 animate-fadeIn">
      {/* Header */}
      <PageHeader
        title="Transaction Orders"
        breadcrumb={[{ name: "Dashboard", path: "/" }, { name: "Orders" }]}
      >
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-rose-200 transition-all active:scale-95 shadow-md text-sm"
        >
          <RiAddLine size={20} />
          Add New Order
        </button>
      </PageHeader>

      {/* Table Section */}
      <div className="mt-10 bg-white rounded-[2.5rem] shadow-xl shadow-rose-500/5 border border-rose-50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-rose-400 uppercase text-[10px] font-black tracking-[0.2em] border-b border-rose-50">
                <th className="px-8 py-6">Order ID</th>
                <th className="px-8 py-6">Customer</th>
                <th className="px-8 py-6">Status</th>
                <th className="px-8 py-6">Total Amount</th>
                <th className="px-8 py-6">Date</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-rose-50">
              {orders.map((order) => {
                const style = getStatusStyle(order.status);
                return (
                  <tr key={order.id} className="group hover:bg-rose-50/30 transition-all">
                    <td className="px-8 py-6">
                      <span className="font-mono text-xs font-bold text-rose-300">#{order.id}</span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-800">{order.customerName}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${style.color}`}>
                        {style.icon}
                        {order.status}
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-rose-500">
                        {formatPrice(order.total)}
                      </p>
                    </td>
                    <td className="px-8 py-6">
                      <span className="text-xs font-bold text-slate-400">{order.date}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modern Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-rose-900/20 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white rounded-[3rem] p-10 w-full max-w-md shadow-2xl border border-white relative overflow-hidden">
            {/* Decorative circle */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-rose-50 rounded-full -z-0" />
            
            <div className="relative z-10">
              <h2 className="text-2xl font-black text-slate-800 mb-2">New Transaction</h2>
              <p className="text-xs font-bold text-rose-300 uppercase tracking-widest mb-8">Record a new sales entry</p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2 ml-1">
                    Customer Full Name
                  </label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-rose-50/50 border border-transparent rounded-2xl focus:bg-white focus:border-rose-200 focus:outline-none text-sm font-bold text-slate-700 transition-all"
                    placeholder="Enter name..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2 ml-1">
                    Order Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-rose-50/50 border border-transparent rounded-2xl focus:bg-white focus:border-rose-200 focus:outline-none text-sm font-bold text-slate-700 appearance-none transition-all"
                  >
                    <option value="Pending">🕒 Pending</option>
                    <option value="Completed">✅ Completed</option>
                    <option value="Cancelled">❌ Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-rose-400 uppercase tracking-widest mb-2 ml-1">
                    Total Amount (IDR)
                  </label>
                  <input
                    type="number"
                    name="total"
                    value={formData.total}
                    onChange={handleInputChange}
                    className="w-full px-5 py-4 bg-rose-50/50 border border-transparent rounded-2xl focus:bg-white focus:border-rose-200 focus:outline-none text-sm font-bold text-slate-700 transition-all"
                    placeholder="e.g. 500000"
                    required
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 px-4 py-4 border-2 border-rose-50 text-rose-300 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-50 transition-all"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] px-4 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-rose-100 hover:brightness-110 active:scale-95 transition-all"
                  >
                    Save Order
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
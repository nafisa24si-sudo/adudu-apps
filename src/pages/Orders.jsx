import { useState } from "react";
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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Order for ${formData.customerName} added successfully!`);

    setShowForm(false);

    setFormData({
      customerName: "",
      status: "Pending",
      total: "",
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";

      case "Pending":
        return "bg-yellow-100 text-yellow-800";

      case "Cancelled":
        return "bg-red-100 text-red-800";

      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="animate-fadeIn">
      {/* Header */}
      <PageHeader
        title="Orders"
        breadcrumb={[{ name: "Dashboard", path: "/" }, { name: "Orders" }]}
      >
        <button
          onClick={() => setShowForm(true)}
          className="bg-hijau text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
        >
          Add Order
        </button>
      </PageHeader>

      {/* Table */}
      <div className="p-5 bg-white rounded-xl shadow-lg overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-4 rounded-tl-lg">Order ID</th>
              <th className="p-4">Customer Name</th>
              <th className="p-4">Status</th>
              <th className="p-4">Total Price</th>
              <th className="p-4 rounded-tr-lg">Order Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.id}
                className={`
                border-b hover:bg-gray-50
 transition ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                                `}>
                <td className="p-4 font-mono text-sm">{order.id}</td>
                <td className="p-4 font-medium">{order.customerName}</td>
                <td className="p-4">
                  <span
                    className={`
px-3 py-1
                                            rounded-full
                                            text-sm
                                            font-medium
                                            ${getStatusColor(order.status)}
                                        `}
                  >
                    {order.status}
                  </span>
                </td>

                <td className="p-4 font-medium text-hijau">
                  {formatPrice(order.total)}
                </td>

                <td className="p-4">{order.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-4">Add New Order</h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Customer Name
                </label>

                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hijau"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Status</label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hijau"
                >
                  <option value="Pending">Pending</option>

                  <option value="Completed">Completed</option>

                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Total Price</label>

                <input
                  type="number"
                  name="total"
                  value={formData.total}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hijau"
                  required
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-hijau text-white rounded-lg hover:bg-green-700 transition"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

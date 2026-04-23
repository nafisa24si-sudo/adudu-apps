import { useState } from "react";
import PageHeader from "../components/PageHeader";

// Generate 30 mock customer data
const generateCustomers = () => {
    const names = [
        "Ahmad Fauzi", "Budi Santoso", "Citra Dewi", "Diana Putri", "Eko Prasetyo",
        "Fitri Handayani", "Gunawan Wibowo", "Hendra Kusuma", "Indah Permata", "Joko Widodo",
        "Kartika Sari", "Lestari Nur", "Muhammad Rizki", "Nina Ayu", "Oka Mahendra",
        "Putri Andini", "Qonita Rahma", "Rizky Maulana", "Siti Halima", "Teguh Wibowo",
        "Umi Kalsum", "Vira Anggraini", "Wawan Sutanto", "Yuni Astuti", "Zaki Firdaus",
        "Dewi Sartika", "Bambang Pamungkas", "Cindy Laudya", "Andhika Pratama", "Rania Putri"
    ];

    const domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "mail.com"];
    const loyaltyLevels = ["Bronze", "Silver", "Gold"];

    return names.map((name, index) => {
        const firstName = name.split(" ")[0].toLowerCase();
        const lastName = name.split(" ")[1]?.toLowerCase() || "";
        const email = `${firstName}.${lastName}@${domains[index % domains.length]}`.replace(" ", "");

        return {
            id: `CUST-${String(index + 1).padStart(3, '0')}`,
            name: name,
            email: email,
            phone: `+62-${Math.floor(Math.random() * 9000000000) + 1000000000}`.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
            loyalty: loyaltyLevels[Math.floor(Math.random() * loyaltyLevels.length)]
        };
    });
};

export default function Customers() {
    const [customers] = useState(generateCustomers());
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        loyalty: "Bronze"
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert(`Customer ${formData.name} added successfully!`);
        setShowForm(false);
        setFormData({
            name: "",
            email: "",
            phone: "",
            loyalty: "Bronze"
        });
    };

    const getLoyaltyColor = (loyalty) => {
        switch (loyalty) {
            case "Gold": return "bg-yellow-100 text-yellow-800";
            case "Silver": return "bg-gray-100 text-gray-800";
            case "Bronze": return "bg-orange-100 text-orange-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="animate-fadeIn">
            <PageHeader
                title="Customers"
                breadcrumb={[{ name: "Dashboard", path: "/" }, { name: "Customers" }]}
            >
                <button
                    onClick={() => setShowForm(true)}
                    className="bg-hijau text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                    Add Customer
                </button>
            </PageHeader>

            {/* Customer Table */}
            <div className="p-5 bg-white rounded-xl shadow-lg overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-100 text-left">
                            <th className="p-4 rounded-tl-lg">Customer ID</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4 rounded-tr-lg">Loyalty</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer, index) => (
                            <tr
                                key={customer.id}
                                className={`border-b hover:bg-gray-50 transition ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                            >
                                <td className="p-4 font-mono text-sm">{customer.id}</td>
                                <td className="p-4 font-medium">{customer.name}</td>
                                <td className="p-4">{customer.email}</td>
                                <td className="p-4">{customer.phone}</td>
                                <td className="p-4">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLoyaltyColor(customer.loyalty)}`}>
                                        {customer.loyalty}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Add Customer Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">
                        <h2 className="text-2xl font-bold mb-4">Add New Customer</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Nama</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hijau"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hijau"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 mb-2">Phone</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hijau"
                                    required
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 mb-2">Loyalty</label>
                                <select
                                    name="loyalty"
                                    value={formData.loyalty}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-hijau"
                                >
                                    <option value="Bronze">Bronze</option>
                                    <option value="Silver">Silver</option>
                                    <option value="Gold">Gold</option>
                                </select>
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

import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import PageHeader from "../components/PageHeader"
import customersData from "../data/Customer.json"
import { FaArrowLeft, FaUser, FaEnvelope, FaPhone, FaTrophy } from "react-icons/fa"

export default function CustomerDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [customer, setCustomer] = useState(null)

    useEffect(() => {
        const foundCustomer = customersData.find(c => c.id === id)
        setCustomer(foundCustomer)
    }, [id])

    if (!customer) return <div className="p-4 text-center">Customer tidak ditemukan</div>

    const getLoyaltyColor = (loyalty) => {
        switch (loyalty) {
            case "Gold":
                return "bg-yellow-100 text-yellow-800 border-yellow-300"
            case "Silver":
                return "bg-gray-100 text-gray-800 border-gray-300"
            case "Bronze":
                return "bg-orange-100 text-orange-800 border-orange-300"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getLoyaltyBadge = (loyalty) => {
        const badges = {
            Gold: "👑",
            Silver: "⭐",
            Bronze: "🏅"
        }
        return badges[loyalty] || "💎"
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 animate-fadeIn">
            <PageHeader
                title="Customer Details"
                breadcrumb={[
                    { name: "Dashboard", path: "/" },
                    { name: "Customers", path: "/customers" },
                    { name: customer.name }
                ]}
            />

            <div className="mt-8">
                <button
                    onClick={() => navigate("/customers")}
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-500 mb-6 font-semibold"
                >
                    <FaArrowLeft /> Kembali ke Customers
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <div className="flex justify-center mb-6">
                                <div className="w-24 h-24 bg-linear-to-br from-emerald-400 to-teal-600 rounded-full flex items-center justify-center">
                                    <FaUser className="text-4xl text-white" />
                                </div>
                            </div>
                            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
                                {customer.name}
                            </h1>
                            <p className="text-center text-gray-500 mb-6">{customer.id}</p>
                            <div className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-bold text-center border-2 ${getLoyaltyColor(customer.loyalty)}`}>
                                <span className="text-2xl">{getLoyaltyBadge(customer.loyalty)}</span>
                                <span>{customer.loyalty} Member</span>
                            </div>
                        </div>
                    </div>

                    {/* Details Card */}
                    <div className="lg:col-span-2">
                        <div className="bg-white p-8 rounded-2xl shadow-lg">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Informasi Kontak</h2>

                            <div className="space-y-4">
                                <div className="flex items-start gap-4 pb-4 border-b">
                                    <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center shrink-0">
                                        <FaEnvelope className="text-emerald-600 text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Email</p>
                                        <p className="text-gray-800 font-semibold">{customer.email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 pb-4 border-b">
                                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                                        <FaPhone className="text-blue-600 text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Telepon</p>
                                        <p className="text-gray-800 font-semibold">{customer.phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4 pb-4">
                                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center shrink-0">
                                        <FaTrophy className="text-yellow-600 text-lg" />
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-sm">Status Loyalitas</p>
                                        <p className="text-gray-800 font-semibold">{customer.loyalty} Member</p>
                                        <p className="text-gray-500 text-xs mt-1">
                                            {customer.loyalty === "Gold" && "Dapatkan diskon hingga 20%"}
                                            {customer.loyalty === "Silver" && "Dapatkan diskon hingga 10%"}
                                            {customer.loyalty === "Bronze" && "Dapatkan diskon hingga 5%"}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Riwayat Transaksi</h3>
                                <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-500">
                                    Tidak ada transaksi tersedia
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

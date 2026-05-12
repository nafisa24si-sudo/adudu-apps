import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import PageHeader from "../components/PageHeader"
import productsData from "../data/Product.json"
import { FaArrowLeft, FaBox, FaTag, FaDollarSign } from "react-icons/fa"

export default function ProductDetail() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)

    useEffect(() => {
        const foundProduct = productsData.find(p => p.id === id)
        setProduct(foundProduct)
    }, [id])

    if (!product) return <div className="p-4 text-center">Produk tidak ditemukan</div>

    const getStatusColor = (status) => {
        switch (status) {
            case "Available":
                return "bg-green-100 text-green-800"
            case "Low Stock":
                return "bg-yellow-100 text-yellow-800"
            case "Out of Stock":
                return "bg-red-100 text-red-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 md:p-8 animate-fadeIn">
            <PageHeader
                title="Product Details"
                breadcrumb={[
                    { name: "Dashboard", path: "/" },
                    { name: "Products", path: "/products" },
                    { name: product.name }
                ]}
            />

            <div className="mt-8">
                <button
                    onClick={() => navigate("/products")}
                    className="flex items-center gap-2 text-emerald-400 hover:text-emerald-500 mb-6 font-semibold"
                >
                    <FaArrowLeft /> Kembali ke Products
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Gambar Produk */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg">
                        <img
                            src={product.image}
                            alt={product.name}
                            className="rounded-xl w-full h-96 object-cover"
                        />
                    </div>

                    {/* Detail Produk */}
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <div className="mb-6">
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">{product.name}</h1>
                            <p className="text-gray-500">{product.description}</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            <div className="flex items-center justify-between pb-4 border-b">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <FaTag /> ID Produk
                                </span>
                                <span className="font-semibold text-gray-800">{product.id}</span>
                            </div>

                            <div className="flex items-center justify-between pb-4 border-b">
                                <span className="text-gray-600">Kategori</span>
                                <span className="font-semibold text-gray-800">{product.category}</span>
                            </div>

                            <div className="flex items-center justify-between pb-4 border-b">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <FaDollarSign /> Harga
                                </span>
                                <span className="font-semibold text-2xl text-emerald-500">
                                    Rp {product.price.toLocaleString("id-ID")}
                                </span>
                            </div>

                            <div className="flex items-center justify-between pb-4 border-b">
                                <span className="text-gray-600 flex items-center gap-2">
                                    <FaBox /> Stok Tersedia
                                </span>
                                <span className="font-semibold text-gray-800">{product.stock} unit</span>
                            </div>

                            <div className="flex items-center justify-between pb-4">
                                <span className="text-gray-600">Status</span>
                                <span className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(product.status)}`}>
                                    {product.status}
                                </span>
                            </div>
                        </div>

                        <button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition">
                            Tambah ke Keranjang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
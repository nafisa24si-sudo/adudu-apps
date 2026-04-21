import { Link } from 'react-router-dom'; // Pastikan import ini benar

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        
        {/* Status Code */}
        <h1 className="text-7xl font-extrabold text-indigo-600">404</h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-bold text-gray-800">
          Halaman tidak ditemukan
        </h2>

        {/* Description */}
        <p className="mt-2 max-w-md text-gray-500 mx-auto">
          Maaf, kami tidak dapat menemukan halaman yang Anda cari.
          Halaman tersebut mungkin telah dipindahkan atau dihapus.
        </p>

        {/* Actions */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <Link
            to="/"  /* Ganti href jadi to */
            className="rounded-lg bg-indigo-600 px-5 py-2 text-white shadow hover:bg-indigo-500 transition"
          >
            Kembali ke Beranda
          </Link>

          <Link
            to="/help" /* Ganti href jadi to */
            className="text-gray-600 hover:text-indigo-600 font-medium"
          >
            Hubungi Bantuan →
          </Link>
        </div>

      </div>
    </div>
  );
}
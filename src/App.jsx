import "./assets/tailwind.css";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Orders from "./pages/Orders";
import { Route, Routes } from "react-router-dom";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      <Routes>
        {/* Opsi 1: Rute yang menggunakan Layout (Sidebar + Header) */}
        <Route
          path="*"
          element={
            <div id="layout-wrapper" className="flex flex-row flex-1">
              <Sidebar />
              <div id="main-content" className="flex-1 p-4">
                <Header />
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/customers" element={<Customers />} />
                  
                  {/* Halaman 404 di dalam layout (Sidebar tetap muncul) */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </div>
          }
        />
        
        {/* Opsi 2: Jika ingin halaman 404 Full Screen (tanpa Sidebar), 
            pindahkan rute NotFound ke luar pembungkus layout di atas. */}
      </Routes>
    </div>
  );
}

export default App;
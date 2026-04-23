import './assets/tailwind.css'
import Sidebar from './layouts/Sidebar'
import Header from './layouts/Header'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import Customers from './pages/Customers'
import { Route, Routes } from 'react-router-dom'
import NotFound from './pages/NotFound'
import BadRequest from './pages/BadRequest'
import Unauthorized from './pages/Unauthorized'
import Forbidden from './pages/Forbidden'

function App() {

  return (
    <div id="app-container" className="bg-gray-100 min-h-screen flex">
      <div id="layout-wrapper" className="flex flex-row flex-1">
        <Sidebar />
        <div id="main-content" className="flex-1 p-4">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/400" element={<BadRequest />} />
            <Route path="/401" element={<Unauthorized />} />
            <Route path="/403" element={<Forbidden />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
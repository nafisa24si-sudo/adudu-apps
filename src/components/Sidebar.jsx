import { FaHome, FaShoppingCart, FaUsers, FaExclamationCircle, FaPlus } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
export default function Sidebar() {

    const menuClass = ({ isActive }) =>
        `flex cursor-pointer items-center rounded-xl p-4  space-x-2
            ${
              isActive
                ? "text-hijau bg-green-200 font-extrabold"
                : "text-gray-600 hover:text-hijau hover:bg-green-200 hover:font-extrabold"
            }`;

    return (
        <div
            id="sidebar"
            className={"flex min-h-screen w-90 flex-col bg-white p-10 shadow-lg"}
        >
            {/* Logo */}
            <div id="sidebar-logo" className="flex flex-col mb-10">
                <span
                    id="logo-title"
                    className="font-poppins text-[48px] text-gray-900"
                >
                    Sedap{" "}
                    <b id="logo-dot" className="text-hijau">
                        .
                    </b>
                </span>
                <span id="logo-subtitle" className="font-semibold text-gray-400">
                    Modern Admin Dashboard
                </span>
            </div>

            {/* List Menu */}
            <div id="sidebar-menu" className="mb-10">
                <ul id="menu-list" className="space-y-3">
                    <li id="menu-1">
                        <NavLink
                            to="/"
                            className={menuClass}
                        >
                            <FaHome className="mr-4 text-xl" />
                            <span>Dashboard</span>
                        </NavLink>
                    </li>
                    <li id="menu-2">
                        <NavLink
                            to="/orders"
                            className={menuClass}
                        >
                            <FaShoppingCart className="mr-4 text-xl" />
                            <span>Orders</span>
                        </NavLink>
                    </li>
                    <li id="menu-3">
                        <NavLink
                            to="/customers"
                            className={menuClass}
                        >
                            <FaUsers className="mr-4 text-xl" />
                            <span>Customers</span>
                        </NavLink>
                    </li>
                    <li id="menu-4">
                        <NavLink
                            to="/400"
                            className={menuClass}
                        >
                            <FaExclamationCircle className="mr-4 text-xl" />
                            <span>Error 400</span>
                        </NavLink>
                    </li>
                    <li id="menu-5">
                        <NavLink
                            to="/401"
                            className={menuClass}
                        >
                            <FaExclamationCircle className="mr-4 text-xl" />
                            <span>Error 401</span>
                        </NavLink>
                    </li>
                    <li id="menu-6">
                        <NavLink
                            to="/403"
                            className={menuClass}
                        >
                            <FaExclamationCircle className="mr-4 text-xl" />
                            <span>Error 403</span>
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* Footer */}
            <div id="sidebar-footer" className="mt-auto">
                <div
                    id="footer-card"
                    className="bg-hijau px-4 py-2 rounded-md shadow-lg mb-10 flex items-center gap-4"
                >
                    <div id="footer-text" className="text-white text-sm">
                        <span>Please organize your menus through button below!</span>
                        <div
                            id="add-menu-button"
                            className="flex justify-center items-center p-2 mt-3 bg-white rounded-md space-x-2"
                        >
                            <FaPlus className="text-gray-600" />
                            <span className="text-gray-600">Add Menus</span>
                        </div>
                    </div>
                    <img
                        id="footer-avatar"
                        className="w-20 rounded-full object-cover"
                        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%2300B074'/%3E%3Ccircle cx='50' cy='35' r='20' fill='white'/%3E%3Cpath d='M30 90 Q30 70 50 70 Q70 70 70 90' fill='white'/%3E%3C/svg%3E"
                        alt="Avatar"
                    />
                </div>
                <span id="footer-brand" className="font-bold text-gray-400">
                    Sedap Restaurant Admin Dashboard
                </span>
                <p id="footer-copyright" className="font-light text-gray-400">
                    &copy; 2025 All Right Reserved
                </p>
            </div>
        </div>
    );
}
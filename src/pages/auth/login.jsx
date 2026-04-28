import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });


  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({
      ...dataForm,
      [name]: value,
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email, 
        password: dataForm.password,
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/"); 
        }
      })
      .catch((err) => {

        if (err.response) {
          setError(err.response.data.message || "Login gagal");
        } else {
          setError("Terjadi kesalahan jaringan");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  
  const errorInfo = error ? (
    <div className="bg-red-100 mb-5 p-4 text-sm text-red-700 rounded flex items-center">
      <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
      {error}
    </div>
  ) : null;

  
  const loadingInfo = loading ? (
    <div className="bg-blue-50 mb-5 p-4 text-sm text-blue-700 rounded flex items-center">
      <ImSpinner2 className="me-2 animate-spin" />
      Mohon Tunggu...
    </div>
  ) : null;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
        Welcome Back 👋
      </h2>

    
      {errorInfo}
      {loadingInfo}

      <form onSubmit={handleSubmit}>
        <div className="mb-5">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address / Username
          </label>
          <input
            type="text"
            name="email" 
            value={dataForm.email}
            onChange={handleChange} 
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="kminchelle"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={dataForm.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
            placeholder="********"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full font-semibold py-2 px-4 rounded-lg transition duration-300 ${
            loading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {loading ? "Processing..." : "Login"}
        </button>
      </form>
    </div>
  );
}
import "./assets/tailwind.css";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import React from "react";
import Loading from "./components/Loading";

function App() {
  const Dashboard = React.lazy(() => import("./pages/Dashboard"));
  const Orders = React.lazy(() => import("./pages/Orders"));
  const Customers = React.lazy(() => import("./pages/Customers"));
  const NotFound = React.lazy(() => import("./pages/NotFound"));
  const BadRequest = React.lazy(() => import("./pages/BadRequest"));
  const Unauthorized = React.lazy(() => import("./pages/Unauthorized"));
  const Forbidden = React.lazy(() => import("./pages/Forbidden"));
  const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
  const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
  const Login = React.lazy(() => import("./pages/auth/Login"));
  const Register = React.lazy(() => import("./pages/auth/Register"));
  const Forgot = React.lazy(() => import("./pages/auth/Forgot"));
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="400" element={<BadRequest />} />
          <Route path="401" element={<Unauthorized />} />
          <Route path="403" element={<Forbidden />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;

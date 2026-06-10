import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import DetectDamage from "./pages/DetectDamage";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

// Admin imports
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAccessories from "./pages/AdminAccessories";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import AdminScans from "./pages/AdminScans";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/detect"
        element={
          <ProtectedRoute>
            <DetectDamage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product"
        element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* Admin Panel Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="accessories" element={<AdminAccessories />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="scans" element={<AdminScans />} />
      </Route>
    </Routes>
  );
}

export default App;
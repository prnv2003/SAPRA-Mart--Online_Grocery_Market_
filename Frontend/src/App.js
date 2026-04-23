import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Products from "./pages/Products";
import Shop from "./pages/Shop";
import CategoryPage from "./pages/categories/CategoryPage";

function App() {
  const PrivateRoute = ({ children, roleRequired }) => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {
      return <Navigate to="/" />;
    }

    if (roleRequired && role !== roleRequired) {
      return <Navigate to="/" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute roleRequired="ADMIN">
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/products"
          element={
            <PrivateRoute roleRequired="ADMIN">
              <Products />
            </PrivateRoute>
          }
        />

        <Route path="/shop" element={<Shop />} />

        <Route path="/category/:name" element={<CategoryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

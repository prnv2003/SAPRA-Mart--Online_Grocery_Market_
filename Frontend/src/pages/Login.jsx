import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/sapra-logo.jpeg";
import { loginUser } from "../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [popup, setPopup] = useState({
    show: false,
    message: "",
    success: false,
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({ email, password });

      if (response.success) {
        setPopup({
          show: true,
          message: "Login Successful 🎉",
          success: true,
        });

        // ⏳ Redirect after 1.5 sec
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      } else {
        setPopup({
          show: true,
          message: "Invalid email or password ❌",
          success: false,
        });
      }
    } catch (error) {
      setPopup({
        show: true,
        message: "Server error. Please try again.",
        success: false,
      });
    }
  };

  const closePopup = () => {
    setPopup({ show: false, message: "", success: false });
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* LEFT */}
        <div className="login-left">
          <img src={logo} alt="SAPRA Mart Logo" className="logo" />
          <h2>SAPRA Mart</h2>
          <p>Fresh Groceries, Fast Delivery</p>
        </div>

        {/* RIGHT */}
        <div className="login-right">
          <h3>Welcome Back 👋</h3>
          <p className="subtitle">Login to your account</p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            {/* PASSWORD WITH SHOW BUTTON */}
            <div className="password-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>

            <button type="submit">Login</button>
          </form>

          <p className="signup-link">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>

      {/* POPUP */}
      {popup.show && (
        <div className="popup-overlay">
          <div className={`popup-box ${popup.success ? "success" : "error"}`}>
            <span className="close-btn" onClick={closePopup}>
              &times;
            </span>
            <h3>{popup.message}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;

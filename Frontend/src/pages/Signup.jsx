import { signupUser } from "../services/api";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/sapra-logo.jpeg";
import "./Signup.css";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState(""); // "success" | "error"

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    // ❌ Password mismatch → error only
    if (formData.password !== formData.confirmPassword) {
      setPopupType("error");
      setPopupMessage("Passwords do not match");
      return;
    }

    try {
      const response = await signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // ✅ Success
      setPopupType("success");
      setPopupMessage(response.message);

      // Redirect only on success
      setTimeout(() => {
        navigate("/");
      }, 1500);
    
    } catch (error) {
      setPopupType("error");
      setPopupMessage(error.message || "Signup failed. Please try again.");
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-card">
        
          {/* LEFT */}
          <div className="signup-left">
            <img src={logo} alt="SAPRA Mart Logo" className="logo" />
            <h2>SAPRA Mart</h2>
            <p>Create your account and start shopping</p>
          </div>

          {/* RIGHT */}
          <div className="signup-right">
            <h3>Create Account ✨</h3>
            <p className="subtitle">Join SAPRA Mart</p>

            <form onSubmit={handleSignup}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
              />

              {/* PASSWORD */}
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="password-field">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <span
                  className="eye-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </span>
              </div>

              <button type="submit">Sign Up</button>
            </form>

            <p className="login-link">
              Already have an account? <Link to="/">Login</Link>
            </p>
          </div>
        </div>
      </div>

      {/* POPUP */}
      {popupMessage && (
        <div className="popup-overlay">
          <div className={`popup-box ${popupType}`}>
            <h3>{popupType === "success" ? "✅ Success" : "❌ Error"}</h3>
            <p>{popupMessage}</p>

            {popupType === "success" && (
              <p className="redirect-text">Redirecting to login...</p>
            )}

            {popupType === "error" && (
              <button className="popup-btn" onClick={() => setPopupMessage("")}>
                OK
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;

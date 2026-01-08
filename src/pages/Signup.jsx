import { signupUser } from "../services/api";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/sapra-logo.jpeg";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // ✅ ONLY ONE handleSignup
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signup clicked", formData);

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await signupUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert(response);
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
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

          {/* ✅ FORM WIRED CORRECTLY */}
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

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit">Sign Up</button>
          </form>

          <p className="login-link">
            Already have an account? <Link to="/">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;

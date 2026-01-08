import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/sapra-logo.jpeg";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
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

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>

          <p className="signup-link">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

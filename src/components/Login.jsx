import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Navbar from "./Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  // Handle login
  const handleLogin = async () => {
    setLoading(true);
    setError(""); // Clear previous errors

    // Simple email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Password is required.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store token in localStorage
      localStorage.setItem("token", data.token);

      // Redirect to Home Page after successful login
      navigate("/home");  
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div
        className="h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('https://source.unsplash.com/1600x900/?login,security')",
        }}
      >
        <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">User Login</h2>

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            onClick={handleLogin}
            disabled={loading}
            className={`w-full bg-pink-600 text-white py-3 rounded-lg font-bold transition ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-pink-700"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-gray-600 mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-pink-500 font-bold">
              Sign up
            </a>
          </p>

          <p className="text-sm text-gray-600 mt-4">
            Login as{" "}
            <button 
              onClick={() => navigate("/admin-login")} 
              className="text-pink-500 font-bold"
            >
              Admin?
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

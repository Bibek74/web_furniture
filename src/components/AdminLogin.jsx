import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Predefined admin credentials (You can change these values)
  const adminEmail = "admin1@gmail.com";
  const adminPassword = "admin123";

  // Store admin credentials in localStorage (only once)
  if (!localStorage.getItem("adminEmail")) {
    localStorage.setItem("adminEmail", adminEmail);
    localStorage.setItem("adminPassword", adminPassword);
  }

  const handleLogin = () => {
    const storedEmail = localStorage.getItem("adminEmail");
    const storedPassword = localStorage.getItem("adminPassword");

    if (email === storedEmail && password === storedPassword) {
      localStorage.setItem("isAdminLoggedIn", "true");
      navigate("/dashboard"); // Redirect to admin dashboard
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div
      className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?technology,office')" }}
    >
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Login</h2>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-bold hover:bg-purple-700 transition"
        >
          Login
        </button>
        <p className="text-sm text-gray-600 mt-4">
          Login as <a href="/login" className="text-pink-500 font-bold">User?</a>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;

// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (password === "mySecret123") {
      localStorage.setItem("admin-auth", "true");
      navigate("/admin");
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 shadow-md rounded max-w-sm w-full">
        <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}

// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../authContext"
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const { loggedIn, setLoggedIn } = useAuth();
  
  
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  


  const handleLogin = () => {
    if (password === "mySecret123") {
      setLoggedIn(true)
      toast.success("Logged In")
      
      
    } else {
      toast.warn("Incorrect password");
    }
  };

  useEffect(()=>{
    if(loggedIn){
      navigate('/admin')
    }
  }, [loggedIn])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-xl shadow backdrop-blur-sm p-6 bg-white/5 border border-white/10  text-white/80 max-w-sm w-full">
        <h1 className="text-xl font-bold mb-4 text-center">Admin Login</h1>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-white/30 p-2 mb-4 rounded"
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

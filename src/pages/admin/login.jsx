// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { useAuth } from "../../authContext"
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { client } from "../../lib/sanity";
import { FaArrowLeft } from "react-icons/fa6";

export default function Login() {
  const { loggedIn, setLoggedIn } = useAuth();

  const validateAdminPassword = async (inputPassword) => {
  const query = `*[_type == "adminSettings"][0]{ password }`;
  const result = await client.fetch(query);
  
  return result?.password === inputPassword;
};
  
  
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  


  const handleLogin = async () => {
    const isValid = await validateAdminPassword(password);
    if (isValid) {
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
      <div onClick={()=>navigate('/')} className="absolute left-4 top-4 w-[50px] h-[50px] flex justify-center items-center text-white/80 hover:text-white cursor-pointer">
        <FaArrowLeft />
      </div>
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

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import ReactGA from "react-ga4";
import Home from './pages/home';
import ClassPage from './pages/classPage';
import Footer from './components/footer';
import Login from "./pages/admin/login";
import Admin from "./pages/admin/admin";
import AdminClassView from "./pages/admin/adminClassView";

function App() {
  useEffect(() => {
  ReactGA.initialize("G-CL9BD7CD9J");
  ReactGA.send("pageview");
}, []);
  return (
    <Router>
      <div className="relative bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white h-[100vh] flex flex-col">
        <div className=" flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/class/:classId" element={<ClassPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/view/:classId" element={<AdminClassView />} />
          </Routes>
        </div>
        
          <Footer />
        
        
      </div>
    </Router>
  );
}

export default App;

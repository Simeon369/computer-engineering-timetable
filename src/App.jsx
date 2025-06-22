import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import ReactGA from "react-ga4";
import Home from './pages/home';
import ClassPage from './pages/classPage';
import Footer from './components/footer';

function App() {
  useEffect(() => {
  ReactGA.initialize("G-CL9BD7CD9J");
  ReactGA.send("pageview");
}, []);
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/class/:classId" element={<ClassPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

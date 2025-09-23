import { HashRouter, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from './Components/AuthContext';
import Feedback from "./pages/Feedback";



function App() {
  return (
    <AuthProvider>
      <HashRouter>
        {/* <Router> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
          </Routes>
        {/* </Router> */}
      </HashRouter>
    </AuthProvider>

  );
}

export default App;

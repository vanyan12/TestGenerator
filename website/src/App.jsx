import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Tests from "./pages/Tests";
import Subscription from "./pages/Subscription";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from './Components/AuthContext';



function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/about" element={<About />} />
          <Route path="/tests" element={<Tests />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
        </Routes>
      </Router>
    </AuthProvider>

  );
}

export default App;

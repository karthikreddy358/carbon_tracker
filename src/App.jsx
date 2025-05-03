import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./register";
import Home from "./Home"; // Import your home page component
import TrackerPage from './tracker';
import Loginn from  "./Loginn";
import Register from "./register";
import Result from "./result"
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/tracker" element={<TrackerPage />} />
        <Route path ="/Loginn" element={<Loginn />} />
        <Route path ="/Result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;

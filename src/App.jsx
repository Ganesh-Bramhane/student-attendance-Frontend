import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";


import Register from "./pages/Register";
import Attendance from "./pages/Attendance";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-3xl font-bold">Smart Attendance System 🎓</h1>

      <a
        href="/register"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg"
      >
        Student Register
      </a>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Register page */}
        <Route path="/register" element={<Register />} />

        {/* Attendance page */}
        <Route path="/attendance" element={<Attendance />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

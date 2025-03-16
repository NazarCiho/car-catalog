import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "C:/Users/1/Desktop/Programming/Коберник/car-catalog/src/pages/HomePage.tsx";
import CarsPage from "C:/Users/1/Desktop/Programming/Коберник/car-catalog/src/pages/CarsPage.tsx";
import DecodeVinPage from "C:/Users/1/Desktop/Programming/Коберник/car-catalog/src/pages/DecodeVinPage.tsx";
import Register from "./components/Register.tsx";
import Login from "./components/Login.tsx"

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/decode-VIN" element={<DecodeVinPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
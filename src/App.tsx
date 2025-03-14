import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "C:/Users/1/Desktop/Programming/Коберник/car-catalog/src/pages/HomePage.tsx";
import CarsPage from "C:/Users/1/Desktop/Programming/Коберник/car-catalog/src/pages/CarsPage.tsx";
import DecodeVinPage from "C:/Users/1/Desktop/Programming/Коберник/car-catalog/src/pages/DecodeVinPage.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/decode-VIN" element={<DecodeVinPage />} />
      </Routes>
    </Router>
  );
};

export default App;
import React from "react";
import Header from "C:/Users/1/Desktop/Programming/Коберник/car-catalog/src/components/Header.tsx";
import Footer from "C:/Users/1/Desktop/Programming/Коберник/car-catalog/src/components/Footer.tsx";
import MainContent from "C:/Users/1/Desktop/Programming/Коберник/car-catalog/src/components/MainContent.tsx";

const HomePage: React.FC = () => {
  return (
    <div>
      <div className="centred-content">
        <Header />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage; 
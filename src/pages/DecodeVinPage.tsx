import React from "react";
import VinDecoder from "C:/Users/1/Desktop/Programming/Коберник/car-catalog/src/components/VinDecoder.tsx"; 
import Header from "C:/Users/1/Desktop/Programming/Коберник/car-catalog/src/components/Header.tsx";
import Footer from "C:/Users/1/Desktop/Programming/Коберник/car-catalog/src/components/Footer.tsx";

const DecodeVinPage: React.FC = () => {
  return (
    <div>
      <div className="centred-content">
        <Header />
        <VinDecoder /> 
      </div>
      <Footer />
    </div>
  );
};

export default DecodeVinPage;
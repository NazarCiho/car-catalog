import React, { useEffect, useState } from "react";
import { getAllMakes } from "../services/api.ts";
import CarsList from "../components/CarsList.tsx";
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";

interface CarMake {
  Make_ID: number;
  MakeName: string;
}

interface CarMakesData {
  makes: CarMake[];
  total: number;
  currentPage: number;
  totalPages: number;
}

const CarsPage: React.FC = () => {
  const [carMakesData, setCarMakesData] = useState<CarMakesData>({
    makes: [],
    total: 0,
    currentPage: 1,
    totalPages: 1
  });
  const [loading, setLoading] = useState<boolean>(true);

  const fetchCarMakes = async (page: number = 1) => {
    try {
      const response = await getAllMakes(page);
      setCarMakesData(response);
    } catch (error) {
      console.error("Error fetching car makes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarMakes(1);
  }, []);

  const handlePageChange = (page: number) => {
    setLoading(true);
    fetchCarMakes(page);
  };

  return (
    <div>
      <div className="centred-content">
        <Header />
        {loading ? (
          <><div className="loading-spinner"></div><p>Завантаження каталогу...</p></>
        ) : (
          <CarsList carMakes={carMakesData} onPageChange={handlePageChange} />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CarsPage;
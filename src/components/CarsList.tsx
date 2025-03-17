import React, { useState, useEffect } from "react";
import { getModelsForMake, getMakeDetails, getMakesByVehicleType, getModelDetails } from '../services/api.ts';
import './CarList.css';

interface CarMake {
  Make_ID: number;
  MakeName: string;
}

interface CarModel {
  Model_ID: number;
  Model_Name: string;
}

interface MakeDetails {
  Mfr_Name: string;
  Country: string;
  VehicleTypes: string[];
}

interface CarsListProps {
  carMakes: {
    makes: CarMake[];
    total: number;
    currentPage: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
}

const ALL_VEHICLE_TYPES = [
  "Passenger Car",
  "Truck",
  "Multipurpose Passenger Vehicle (MPV)",
  "Motorcycle",
  "LSV",
  "Bus",
  "Trailer",
  "Incomplete Vehicle"
];

const years = Array.from({ length: 2024 - 1995 + 1 }, (_, i) => 2024 - i);
const vehicleTypes = ["Всі", "Passenger Car", "Truck", "Multipurpose Passenger Vehicle", "Motorcycle", "LSV"];

const CarsList: React.FC<CarsListProps> = ({ carMakes, onPageChange }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMakes, setFilteredMakes] = useState<CarMake[]>([]);
  const [selectedMake, setSelectedMake] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedType, setSelectedType] = useState<string>("Всі");
  const [models, setModels] = useState<CarModel[]>([]);
  const [makeDetails, setMakeDetails] = useState<MakeDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedModelDetails, setSelectedModelDetails] = useState<any | null>(null);

  console.log("■■■■carMakes:", carMakes);
  // пошук
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (carMakes.makes && carMakes.makes.length > 0) {
        const filtered = carMakes.makes.filter(make => 
          make?.MakeName?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredMakes(filtered);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, carMakes.makes]);

  // фільтр за типом 
  useEffect(() => {
    const filterMakesByType = async () => {
      if (selectedType === "Всі") {
        setFilteredMakes(carMakes.makes);
        return;
      }

      setIsLoading(true);
      try {
        const response = await getMakesByVehicleType(selectedType, 1); 
        setFilteredMakes(response.makes || []);
      } catch (error) {
        console.error("Error fetching makes by type:", error);
        setFilteredMakes([]);
      } finally {
        setIsLoading(false);
      }
    };

    filterMakesByType();
  }, [selectedType, carMakes.makes]);

  const handleYearChange = async (year: number) => {
    console.log('Year changed to:', year, selectedMake, showDetails);
    setSelectedYear(year);
    
    if (selectedMake && showDetails) {
      setIsLoading(true);
      try {
        const modelsData = await getModelsForMake(selectedMake, year);
        console.log('Models for new year:', modelsData);
        setModels(modelsData);
      } catch (error) {
        console.error("Error fetching models for new year:", error);
        setModels([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleMakeSelect = async (MakeName: string) => {
    if (!MakeName) return;
    
    setIsLoading(true);
    setSelectedMake(MakeName);
    setShowDetails(true);
    
    try {
      const [modelsData, detailsData] = await Promise.all([
        getModelsForMake(MakeName, selectedYear),
        getMakeDetails(MakeName)
      ]);
      
      setModels(modelsData);
      setMakeDetails(detailsData);
    } catch (error) {
      console.error("Error fetching make details:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleModelDetails = async (make: string, model: string) => {
    setIsLoading(true);
    try {
      const modelDetails = await getModelDetails(make, model);

      setSelectedModelDetails(modelDetails); 
    } catch (error) {
      console.error("Помилка отримання деталей моделі:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const [allMakes, setAllMakes] = useState<CarMake[]>([]); 
const [isFetchingAll, setIsFetchingAll] = useState(false);

// zавантажуємо всі марки
useEffect(() => {
  const fetchAllMakes = async () => {
    setIsFetchingAll(true);
    try {
      const response = await getMakesByVehicleType("car", 1, 1000); 
      setAllMakes(response.makes);
    } catch (error) {
      console.error("Помилка завантаження всіх брендів:", error);
    } finally {
      setIsFetchingAll(false);
    }
  };

  fetchAllMakes();
}, []);

useEffect(() => {
  const delayDebounce = setTimeout(() => {
    if (searchTerm.trim()) {
      const filtered = allMakes.filter(make => 
        make?.MakeName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMakes(filtered);
    } else {
      setFilteredMakes(carMakes.makes);
    }
  }, 300);

  return () => clearTimeout(delayDebounce);
}, [searchTerm, allMakes, carMakes.makes]);
  
  const handleTypeFilter = (type: string) => {
    setSelectedType(type);
    setSearchTerm("");
    onPageChange(1); 
  };
  
  const renderBrandCard = (make: CarMake, isPopular: boolean = false) => {

    if (!make?.MakeName) return null;
    
    return (
      <div 
        key={make.Make_ID} 
        className={`brand-card ${isPopular ? 'popular' : ''}`}
        onClick={() => handleMakeSelect(make.MakeName)}
      >
        <div className="brand-logo">
          {make.MakeName?.charAt(0) ?? "?"} 
        </div>
        <h3 className="brand-name">{make.MakeName}</h3>
        <button className="view-models-btn">
          Переглянути моделі
        </button>
      </div>
    );
  };

  const renderPagination = () => {
    if (carMakes.totalPages <= 1) return null;

    return (
      <div className="pagination">
        <button 
          onClick={() => onPageChange(carMakes.currentPage - 1)}
          disabled={carMakes.currentPage === 1}
          className="pagination-btn"
        >
          Попередня
        </button>
        <span className="page-info">
          Сторінка {carMakes.currentPage} з {carMakes.totalPages} (Всього: {carMakes.total})
        </span>
        <button 
          onClick={() => onPageChange(carMakes.currentPage + 1)}
          disabled={carMakes.currentPage === carMakes.totalPages}
          className="pagination-btn"
        >
          Наступна
        </button>
      </div>
    );
  };

  const renderVehicleTypes = (makeTypes: string[]) => {
    return (
      <div className="vehicle-types-grid">
        {ALL_VEHICLE_TYPES.map((type) => (
          <div key={type} className="vehicle-type-item">
            <span className="type-name ALL_VEHICLE_TYPES">{type}</span>
            <span className={`type-indicator ${makeTypes.includes(type) ? 'available' : 'not-available'}`}>
              {makeTypes.includes(type) ? '✓' : '×'}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1 className="catalog-title">Каталог автомобільних брендів</h1>
        <p className="catalog-subtitle">
          Знайдіть свій ідеальний автомобіль серед {carMakes.total} брендів
        </p>
      </div>

      <div className="search-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Пошук бренду..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>
        
        <div className="filters-section">
          <div className="filter-group">
            <select 
              value={selectedYear} 
              onChange={(e) => handleYearChange(Number(e.target.value))}
              className="filter-select"
            >
              <option value="">Оберіть рік</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>

            <select 
              value={selectedType} 
              onChange={(e) => handleTypeFilter(e.target.value)}
              className="filter-select"
            >
              {vehicleTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="loading-spinner">
        </div>
      ) : (
        <>
          {showDetails && selectedMake && makeDetails ? (
            <div className="make-details">
              <button className="back-button" onClick={() => setShowDetails(false)}>
                ← Назад до каталогу
              </button>
              
              <div className="make-info">
                <div className="make-header">
                  <div className="make-logo">
                    {selectedMake?.charAt(0)}
                  </div>
                  <h2>{selectedMake}</h2>
                </div>
                
                <div className="make-stats">
                  <div className="stat">
                    <span className="stat-label">Країна виробника</span>
                    <span className="stat-value">{makeDetails.Country}</span>
                  </div>
                  <div className="stat vehicle-types-stat">
                    <span className="stat-label">Типи транспорту</span>
                    {renderVehicleTypes(makeDetails.VehicleTypes)}
                  </div>
                  <div className="stat">
                    <span className="stat-label">Кількість моделей</span>
                    <span className="stat-value">{models.length}</span>
                  </div>
                </div>

                <div className="models-section">
                  <h3>Моделі {selectedYear} року</h3>
                  <div className="models-grid">
                    {models.map((model) => (
                      <div key={model.Model_ID} className="model-card">
                        <h4>{model.Model_Name}</h4>
                        <button className="details-btn" onClick={() => handleModelDetails(model.Make_Name, model.Model_Name)}></button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="all-brands">
                <h2 className="section-title">
                  {searchTerm ? 'Результати пошуку' : 'Всі бренди'}
                </h2>
                <div className="brands-grid">
                  {searchTerm ? filteredMakes.map((make) => renderBrandCard(make)) : 
                   carMakes.makes.map((make) => renderBrandCard(make))}
                </div>
                {!searchTerm && selectedType === "Всі" && renderPagination()}
              </div>
            </>
          )}

          {((searchTerm && filteredMakes.length === 0) || (!searchTerm && carMakes.makes.length === 0)) && !isLoading && (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>Бренди не знайдено</h3>
              <p>Спробуйте змінити параметри пошуку</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CarsList;
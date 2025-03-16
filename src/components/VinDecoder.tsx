import React, { useState } from "react";
import "./VinDecoder.css";

const VinDecoder: React.FC = () => {
  const [vin, setVin] = useState("");
  const [vehicleData, setVehicleData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const decodeVin = async () => {
    if (vin.length < 11) {
      setError("VIN повинен містити щонайменше 11 символів.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`
      );
      const data = await response.json();
      if (data.Results && data.Results.length > 0) {
        setVehicleData(data.Results);
      } else {
        setError("Дані за цим VIN не знайдені.");
      }
    } catch (err) {
      setError("Помилка при отриманні даних.");
    } finally {
      setLoading(false);
    }
  };
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Копійовано в буфер обміну!');
    }).catch((error) => {
      console.error('Помилка при копіюванні:', error);
    });
  };

  const vinSections = [
    { number: 1, title: "WMI", description: "World Manufacturer Identifier" },
    { number: 2, title: "VDS", description: "Vehicle Description Section" },
    { number: 3, title: "VIS", description: "Vehicle Identifier Section" }
  ];

  const vinInfo = {
    description: `VIN-код складається з 17 символів і містить важливу інформацію про автомобіль:
    • Країну виробництва
    • Виробника
    • Тип транспортного засобу
    • Модель, двигун, трансмісію
    • Рік випуску
    • Завод складання
    • Серійний номер`,
    examples: [
      { vin: "5UXWX7C5*BA", description: "BMW X5" },
      { vin: "JH4DA9350MS000938", description: "Honda Integra" },
      { vin: "4S3BJ6332P6953766", description: "Subaru Legacy" }
    ]
  };

  return (
    <div className="VinDecoder">
      <div className="decoder-card">
        <h1 className="title">🚗 Розшифрування VIN-коду</h1>
        <input
          type="text"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          placeholder="Введіть VIN код"
          className="vin-input"
        />
        <button onClick={decodeVin} className="decode-button" disabled={loading}>
          {loading ? "Завантаження..." : "Розшифрувати"}
        </button>
        {error && <p className="error-alert">{error}</p>}
        
        {vehicleData && (
          <div className="results">
            <h2>Дані про автомобіль:</h2>
            <ul>
              {vehicleData
                .sort((a: any, b: any) => (a.Value ? -1 : 1))
                .map((item: any) => (
                  <li key={item.VariableId} style={{ color: item.Value ? "black" : "#999999" }} className={item.Value ? "data-item" : "data-item empty"}>
                    {item.Variable}: {item.Value || "Немає даних"}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
      
      <div className="vin-decoder-info">
        <h2>Що таке VIN-код?</h2>
        <p>{vinInfo.description}</p>

        <div className="vin-structure">
          <h3>Структура VIN-коду:</h3>
          {vinSections.map((section) => (
            <div key={section.number} className="vin-section">
              <span className="section-number">{section.number}</span>
              <div>
                <strong>{section.title}</strong>
                <p>{section.description}</p>
              </div>
            </div>
          ))}
        </div>

        <h3>Приклади VIN-кодів:</h3>
        <div className="examples">
          {vinInfo.examples.map((example) => (
            <div key={example.vin} className="example-item">
              <div className="tooltip">
                <p>{example.vin}</p>
                <span className="tooltiptext">{example.description}</span>
              </div>
              <button 
                className="copy-btn" 
                onClick={() => copyToClipboard(example.vin)}
              >
                Копіювати
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VinDecoder;

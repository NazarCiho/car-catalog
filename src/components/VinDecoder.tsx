import React, { useState } from "react";
import "./VinDecoder.css"
const VinDecoder: React.FC = () => {
  const [vin, setVin] = useState("");
  const [vehicleData, setVehicleData] = useState<any>(null);
  const [error, setError] = useState("");

  const decodeVin = async () => {
    try {
      const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`);
      const data = await response.json();
      if (data.Results && data.Results.length > 0) {
        setVehicleData(data.Results);
        setError("");
      } else {
        setError("No data found for this VIN.");
      }
    } catch (err) {
      setError("Error fetching data.");
    }
  };

  return (
    <div className="VinDecoder">
      <h1>Розшифрування VIN коду</h1>
      <input
        type="text"
        value={vin}
        onChange={(e) => setVin(e.target.value)}
        placeholder="Введіть VIN код"
      />
      <button onClick={decodeVin}>Розшифрувати</button>
      {error && <p>{error}</p>}
      {vehicleData && (
        <div>
          <h2>Дані про автомобіль:</h2>
          <ul>
            {vehicleData
              .sort((a: any, b: any) => (a.Value ? -1 : 1))
              .map((item: any) => (
                <li key={item.VariableId} style={{ color: item.Value ? "black" : "#999999" }}>
                  {item.Variable}: {item.Value || "Немає даних"}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VinDecoder;
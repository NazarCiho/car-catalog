import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "C:/Users/1/Desktop/Programming/Коберник/car-catalog/src/App.tsx"; // Шлях до файлу App.tsx

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


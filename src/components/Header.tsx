import React from "react";
import { Link } from "react-router-dom";
import './Header.css'; // Імпортуємо CSS файл для стилізації

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img className="logo-img" src="https://i.ibb.co/NdZmBQLm/6.png" alt="Logo" />
        </Link>
      </div>
      <nav className="nav">
        <Link to="/cars">Каталог автомобілей</Link>
        <Link to="/decode-VIN">Розшифрувати VIN</Link>
      </nav>
      <div className="auth">
        <Link to="/login" className="login-button">Увійти</Link>
        <Link to="/register" className="register-button">Зареєструватися</Link>
      </div>
    </header>
  );
};

export default Header;

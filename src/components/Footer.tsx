import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faTelegram, faTwitter, faYoutube, faFacebook, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <span className="logo"><img className="logo-img-ft" src="https://i.ibb.co/C5gZPxJB/favicon.png" alt="Logo"/></span>
          <p><strong>Car Catalog </strong>- це твоя комфортна платформа автомобілістів для пошуку, аналізу, перегляду інформації про авотмобілів.</p>
          <div className="social-items">
            <p><FontAwesomeIcon icon={faFacebook} /> </p>
            <p><FontAwesomeIcon icon={faInstagram} /> </p>
            <p><FontAwesomeIcon icon={faTelegram} /></p>
            <p><FontAwesomeIcon icon={faTwitter} /></p>
            <p><FontAwesomeIcon icon={faYoutube} /></p>
          </div>
        </div>
        <div className="footer-links">
          <h4>Сервіси</h4>
          <ul>
            <li>Продаж авто</li>
            <li>Для бізнесу</li>
          </ul>
        </div>
        <div className="footer-about">
          <h4>Про компанію</h4>
          <ul>
            <li>Вакансії</li>
          </ul>
        </div>
        <div className="footer-support">
          <h4>Тех. підтримка</h4>
          <ul>
            <li>
              <FontAwesomeIcon icon={faEnvelope} /> help.centr@carcatalog.com.ua
            </li>
            <li>
              <FontAwesomeIcon icon={faTelegram} /> Telegram: @carcatalog_ua
            </li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© Car Catalog - Усі права захищені. 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
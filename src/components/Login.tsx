import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Login.css';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Імітація завантаження
    setTimeout(() => {
      setIsLoading(false);
      if (!formData.email || !formData.password) {
        setError('Будь ласка, заповніть всі поля');
        return;
      }
      console.log('Login attempt:', formData);
      setError('');
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modern-auth-container">
      <div className="auth-background">
        <div className="auth-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <motion.div 
        className="modern-auth-form-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form className="modern-auth-form" onSubmit={handleSubmit}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="auth-title">Вітаємо знову!</h2>
            <p className="auth-subtitle">Раді бачити вас у Car Catalog</p>
          </motion.div>

          {error && (
            <motion.div 
              className="modern-error-message"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              {error}
            </motion.div>
          )}

          <motion.div 
            className="modern-form-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="input-icon-wrapper">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Ваш email"
                className="modern-input"
              />
            </div>
          </motion.div>

          <motion.div 
            className="modern-form-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="input-icon-wrapper">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Ваш пароль"
                className="modern-input"
              />
            </div>
          </motion.div>

          <motion.div 
            className="form-options"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <label className="remember-me">
              <input type="checkbox" />
              <span>Запам'ятати мене</span>
            </label>
            <a href="#" className="forgot-password">Забули пароль?</a>
          </motion.div>

          <motion.button
            type="submit"
            className={`modern-submit-button ${isLoading ? 'loading' : ''}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loader"></div>
            ) : (
              'Увійти'
            )}
          </motion.button>

          <motion.div 
            className="social-login"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p>Або увійдіть через</p>
            <div className="social-buttons">
              <button className="social-button google">
                <i className="fab fa-google"></i>
              </button>
              <button className="social-button facebook">
                <i className="fab fa-facebook-f"></i>
              </button>
              <button className="social-button apple">
                <i className="fab fa-apple"></i>
              </button>
            </div>
          </motion.div>

          <motion.p 
            className="auth-redirect"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Немає акаунту? <Link to="/register">Зареєструватися</Link>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
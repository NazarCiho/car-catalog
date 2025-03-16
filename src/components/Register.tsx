import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Register.css';

const Register: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreement: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const validateStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.email) {
        setError('Будь ласка, заповніть всі поля');
        return false;
      }
    } else if (step === 2) {
      if (!formData.password || !formData.confirmPassword) {
        setError('Будь ласка, заповніть всі поля');
        return false;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Паролі не співпадають');
        return false;
      }
    }
    setError('');
    return true;
  };

  const nextStep = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;
    
    setIsLoading(true);
    // Імітація реєстрації
    setTimeout(() => {
      setIsLoading(false);
      console.log('Registration data:', formData);
    }, 1500);
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
            <h2 className="auth-title">Створити акаунт</h2>
            <p className="auth-subtitle">Приєднуйтесь до Car Catalog</p>
          </motion.div>

          <div className="steps-indicator">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`step ${s === step ? 'active' : ''} ${s < step ? 'completed' : ''}`}
              >
                {s < step ? '✓' : s}
              </div>
            ))}
          </div>

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
            className="form-step"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <>
                <div className="modern-form-group">
                  <div className="input-icon-wrapper">
                    <i className="fas fa-user"></i>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Ваше ім'я"
                      className="modern-input"
                    />
                  </div>
                </div>

                <div className="modern-form-group">
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
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="modern-form-group">
                  <div className="input-icon-wrapper">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Створіть пароль"
                      className="modern-input"
                    />
                  </div>
                </div>

                <div className="modern-form-group">
                  <div className="input-icon-wrapper">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Підтвердіть пароль"
                      className="modern-input"
                    />
                  </div>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <div className="modern-form-group">
                  <div className="input-icon-wrapper">
                    <i className="fas fa-phone"></i>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Номер телефону"
                      className="modern-input"
                    />
                  </div>
                </div>

                <div className="agreement-checkbox">
                  <input
                    type="checkbox"
                    name="agreement"
                    checked={formData.agreement}
                    onChange={handleChange}
                    id="agreement"
                  />
                  <label htmlFor="agreement">
                    Я погоджуюсь з умовами використання та політикою конфіденційності
                  </label>
                </div>
              </>
            )}
          </motion.div>

          <div className="form-navigation">
            {step > 1 && (
              <motion.button
                type="button"
                className="nav-button prev"
                onClick={prevStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Назад
              </motion.button>
            )}

            {step < 3 ? (
              <motion.button
                type="button"
                className="nav-button next"
                onClick={nextStep}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Далі
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                className={`modern-submit-button ${isLoading ? 'loading' : ''}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="loader"></div>
                ) : (
                  'Зареєструватися'
                )}
              </motion.button>
            )}
          </div>

          <motion.p 
            className="auth-redirect"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Вже маєте акаунт? <Link to="/login">Увійти</Link>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
};

export default Register;
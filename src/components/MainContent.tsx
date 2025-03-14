import React, { useEffect } from "react";
import './MainContent.css';
import { Link } from "react-router-dom";

const MainContent: React.FC = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    });

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="main-content">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title hidden">
            <span className="gradient-text">Car</span> 
            <span className="gradient-text">Catalog</span>
          </h1>
          <p className="hero-subtitle hidden">Знайдіть автомобіль своєї мрії</p>
          <div className="hero-buttons hidden">
            <button className="primary-button">
              <Link to="/cars">Переглянути каталог</Link>
            </button>
            <button className="secondary-button">Зв'язатися з нами</button>
          </div>
          <div className="hero-stats hidden">
            <div className="stat-item">
              <span className="stat-number">1000+</span>
              <span className="stat-label">Автомобілів</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Клієнтів</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Брендів</span>
            </div>
          </div>
        </div>
        <div className="hero-background">
          <div className="animated-bg"></div>
        </div>
      </section>
     
      <section className="popular-cars">
        <h2 className="section-title">Популярні автомобілі</h2>
        <div className="car-list">
          <div className="car-item">
            <img src="https://i.ibb.co/xqKbxZLr/a-cinematic-shot-of-a-tesla-model-3-car-E0-RMEVt-NSn-GBv5t1ag-J9-HA-i-Cj-YWr-Be-Sp6kdr9-Wu-SXRog.jpg" alt="Tesla Model 3" className="car-image" />
            <h3>Tesla Model 3</h3>
            <p>Електромобіль з великим запасом ходу та сучасними технологіями.</p>
          </div>
          <div className="car-item">
            <img src="https://i.ibb.co/gbJ7nKcK/a-photo-of-a-bmw-3-series-parked-on-a-st-FHLPEz-Y0-RBm-Io8-Og9-QUX7g-40-D9-KC4k-Qo-GWZ3avd-R2-X1g.jpg" alt="BMW 3 Series" className="car-image" />
            <h3>BMW 3 Series</h3>
            <p>Класичний седан з відмінною динамікою та комфортом.</p>
          </div>
          <div className="car-item">
            <img src="https://i.ibb.co/r2MY6wtM/a-photo-of-a-cool-ford-mustang-with-a-ma-TSt30lz8-Tg-Sf-Bgq-J7-FPZo-Q-NTxq-GGk-STj-Gm-SE7o-B10sr-Q.jpg" alt="Ford Mustang" className="car-image" />
            <h3>Ford Mustang</h3>
            <p>Іконічний спортивний автомобіль з потужним двигуном.</p>
          </div>
          <div className="car-item">
            <img src="https://i.ibb.co/4nn6Z3B6/a-sleek-cool-audi-a4-parked-on-a-street-Bml-MBXWk-S9-Chu-Ur-Kgwvzwg-Qmyj-CSQt-SD-Po-VRk-Jemw-Yg.jpg" alt="Audi A4" className="car-image" />
            <h3>Audi A4</h3>
            <p>Елегантний седан з передовими технологіями безпеки.</p>
          </div>
          <div className="car-item">
            <img src="https://i.ibb.co/RpHvXG01/a-moderate-shot-of-a-cool-black-mercedes-q2ax-ZSFc-Ti2-Kwjl-ZHPa-Dyw-x-1-JG2v3-QK6g-U3i-RQak-MZw.jpg" alt="Mercedes-Benz C-Class" className="car-image" />
            <h3>Mercedes-Benz C-Class</h3>
            <p>Розкішний автомобіль з комфортом та стилем.</p>
          </div>
        </div>
      </section>

      <p className="call-to-action">Не зволікайте! Зв'яжіться з нами сьогодні, щоб дізнатися більше про наші автомобілі та отримати безкоштовну консультацію!</p>

    

      <section className="testimonials">
        <h2 className="testimonials-title">ВІДГУКИ НАШИХ КЛІЄНТІВ</h2>
        <p className="testimonials-subtitle">
          Думка кожного клієнта важлива для нас. Ось що говорять люди, які вже придбали автомобілі в нашому автосалоні.
        </p>
        
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <img src="https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZmFjZXN8ZW58MHx8MHx8fDA%3D" alt="Олександр Петренко" className="testimonial-image" />
            <h3 className="testimonial-name">Олександр Петренко</h3>
            <p className="testimonial-company">IT Project Manager</p>
            <div className="quote-icon">
              <span>"</span>
            </div>
            <p className="testimonial-text">
              Купував Tesla Model 3 через Car Catalog - неймовірно задоволений як процесом вибору, так і самим автомобілем. Консультанти детально пояснили всі особливості експлуатації електрокара та допомогли з оформленням документів. Дуже вдячний за професійний підхід!
            </p>
            <div className="testimonial-stars">★★★★★</div>
          </div>

          <div className="testimonial-card">
            <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGZhY2VzfGVufDB8fDB8fHww" alt="Марія Ковальчук" className="testimonial-image" />
            <h3 className="testimonial-name">Марія Ковальчук</h3>
            <p className="testimonial-company">Власниця салону краси</p>
            <div className="quote-icon">
              <span>"</span>
            </div>
            <p className="testimonial-text">
              Довго шукала ідеальний автомобіль для себе і зупинилась на Mercedes-Benz C-Class. Команда Car Catalog допомогла підібрати саме ту комплектацію, яка відповідала всім моїм побажанням. Особлива подяка за швидке оформлення та приємний бонус у вигляді додаткового обслуговування!
            </p>
            <div className="testimonial-stars">★★★★★</div>
          </div>

          <div className="testimonial-card">
            <img src="https://images.unsplash.com/photo-1594819047050-99defca82545?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2VzfGVufDB8fDB8fHww" alt="Віталій Коваленко" className="testimonial-image" />
            <h3 className="testimonial-name">Віталій Коваленко</h3>
            <p className="testimonial-company">Підприємець</p>
            <div className="quote-icon">
              <span>"</span>
            </div>
            <p className="testimonial-text">
              Придбав BMW 3 Series через Car Catalog і не пошкодував! Вражений рівнем сервісу та уважністю до деталей. Менеджери запропонували кілька варіантів фінансування та допомогли вибрати найвигідніший. Рекомендую всім, хто шукає надійного партнера у виборі автомобіля.
            </p>
            <div className="testimonial-stars">★★★★★</div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent;

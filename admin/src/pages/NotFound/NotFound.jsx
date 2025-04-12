// src/components/NotFound/NotFound.jsx
import React, { useEffect } from 'react';
import './NotFound.css';

const NotFound = () => {
  useEffect(() => {
    // Parallax effect for the glitch elements
    const handleMouseMove = (e) => {
      const glitchElements = document.querySelectorAll('.glitch-element');
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      
      glitchElements.forEach((el, index) => {
        const speed = index * 0.5 + 1;
        el.style.transform = `translate(${x * 20 * speed}px, ${y * 20 * speed}px)`;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="notfound-wrapper">
      <div className="notfound-container">
        <div className="glitch-container">
          <div className="glitch-element" data-text="404">404</div>
          <div className="glitch-element shadow-element" data-text="404">404</div>
          <div className="glitch-element shadow-element-2" data-text="404">404</div>
        </div>
        
        <div className="content-container">
          <div className="brand-name">WINDSPEED</div>
          <h1>Page Not Found</h1>
          <p>The page you're looking for has drifted away or never existed.</p>
          <div className="action-buttons">
            <a href="/" className="primary-button">
              <span className="button-icon">←</span>
              Return Home
            </a>
            <button className="secondary-button" onClick={() => window.history.back()}>
              Go Back
            </button>
          </div>
        </div>

        <div className="decorative-elements">
          <div className="circle circle-1"></div>
          <div className="circle circle-2"></div>
          <div className="circle circle-3"></div>
          <div className="line line-1"></div>
          <div className="line line-2"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
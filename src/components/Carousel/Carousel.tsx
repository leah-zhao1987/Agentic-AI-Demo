import './Carousel.css';

import React, { useEffect, useState } from 'react';

import { Card as CardType }from '../../types';

interface CarouselProps {
  items: CardType[];
  autoPlayInterval?: number;
  title: string;
}

const Carousel: React.FC<CarouselProps> = ({ items, autoPlayInterval = 5000, title }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // 自动播放逻辑
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isAutoPlaying && items.length > 1) {
      interval = setInterval(() => {
        setActiveIndex((current) => (current + 1) % items.length);
      }, autoPlayInterval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, items.length, autoPlayInterval]);

  // 暂停和恢复自动播放
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // 手动导航
  const goToSlide = (index: number) => setActiveIndex(index);
  const goToNextSlide = () => setActiveIndex((current) => (current + 1) % items.length);
  const goToPrevSlide = () => setActiveIndex((current) => (current - 1 + items.length) % items.length);

  if (!items || items.length === 0) {
    return <div className="carousel-empty">No items to display</div>;
  }

  return (
    <div className="carousel-container">
      <h2 className="carousel-title">{title}</h2>
      
      <div 
        className="carousel-wrapper" 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="carousel-arrow prev" onClick={goToPrevSlide}>
          &#10094;
        </button>
        
        <div className="carousel-content-wrapper">
          {items.map((item, index) => (
            <div 
              key={index}
              className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
              style={{ transform: `translateX(${(index - activeIndex) * 100}%)` }}
            >
              <div className="carousel-image-container">
                <img 
                  src={item.thumbnail || item.defaultImag} 
                  alt={item.title}
                  className="carousel-image"
                />
                <div className="carousel-overlay">
                  <span className="carousel-provider">{item.provider || 'Unknown Provider'}</span>
                  <h3 className="carousel-item-title">{item.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="carousel-arrow next" onClick={goToNextSlide}>
          &#10095;
        </button>
        
        {items.length > 1 && (
          <div className="carousel-indicators">
            {items.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${index === activeIndex ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Carousel;
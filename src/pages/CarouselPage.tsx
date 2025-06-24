import './CarouselPage.css';

import React, { useEffect, useState } from 'react';

import { Card as CardType } from '../types';
import Carousel from '../components/Carousel/Carousel';
import { DEFAULT_CATEGORIES } from '../mock/defaultData';
import Loading from '../components/Loading';
import axios from 'axios';
import config from '../config';

const CarouselPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryData, setCategoryData] = useState<{ [key: string]: CardType[] }>({});
  const cacheData = localStorage.getItem('CATEGORY_DATA') || '{}';

  useEffect(() => {
    setCategoryData(JSON.parse(cacheData || '{}'));
  }, [cacheData]);

  return (
    <div className="carousel-page">
      {/* <h1 className="page-title">Carouse</h1> */}
      
      {/* 显示非空分类的轮播图 */}
      {Object.entries(categoryData).map(([category, items]) => (
        items.length > 0 && (
          <div key={category} className="category-section">
            <Carousel 
              items={items} 
              title={category}
              autoPlayInterval={6000}
            />
          </div>
        )
      ))}
    </div>
  );
};

export default CarouselPage;
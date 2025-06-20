import CardList from './CardList';
import { Card as CardType } from '../types';
import { DEFAULT_IMAGE } from '../mock/defaultData';
import React from 'react';

interface CategoryPageProps {
    categories: { [category: string]: CardType[] };
    onHandleData: (id: any, status: number) => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ categories, onHandleData }) => {

  // 处理卡片操作
  const handleCard = (id: string, status: number) => {
    console.log('Card handled:', id, status);
    // 这里可以添加卡片操作的逻辑
    onHandleData(id, status);
  };

    // show categories for the current page
  const showCategoriesForCategory = () => {
    console.log('categories', categories);
    const currentPageCategories = Object.keys(categories);

    return currentPageCategories.map((category, index) => {
      const cards = categories[category] || [];
      const displayCards = cards.slice(0, 4);
      const placeholdersNeeded = Math.max(0, 4 - displayCards.length);
      const placeholders = Array.from({ length: placeholdersNeeded }, (_, i) => ({
        id: -1 * (index + 1) * 1000 - i, // negative number to avoid collision with real ids
        title: "",
        description: "",
        majorCategory: category,
        defaultImag: DEFAULT_IMAGE[category as keyof typeof DEFAULT_IMAGE] || '',
        abstract: "",
        imageUrl: "",
        thumbnail: "",
        image: "",
        category: category,
        isPlaceholder: true
      } as CardType));

      const finalCards = [...displayCards, ...placeholders];
      // const finalCards = [...cards]

      return (
          <div key={`${category}-${index}`} className="topic-box container mx-auto bg-blue-100 rounded-lg mb-6 overflow-hidden">
            <CardList cards={finalCards} topic={category} onHandleData={handleCard}></CardList>
          </div>
      );
    });
  };


  return showCategoriesForCategory();
};

export default CategoryPage;
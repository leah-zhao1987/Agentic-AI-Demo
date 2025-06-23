import { DEFAULT_CATEGORIES, DEFAULT_IMAGE } from '../mock/defaultData';
import React, { useEffect, useState } from 'react';

import CardList from './CardList';
import { Card as CardType } from '../types';
import Loading from '../components/Loading';
import { useFetch } from '../hooks/useFetch';

const Home: React.FC = () => {
  const getNewsList = () => {
    const getNewsListPath = '/api/pre_rendering_en-us_20250617170000.json';
    return useFetch(getNewsListPath);
  }
  const { data, loading, error, refresh} = getNewsList();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categoryData, setCategoryData] = useState<{ [key: string]: CardType[] }>({});
  const [lastRefreshTime, setLastRefreshTime] = useState<Date>(new Date());
  const categoriesList: { [key in typeof DEFAULT_CATEGORIES[number]]: CardType[] } = {
    'sports': [],
    'travel': [],
    'business': [],
    'politics': [],
    'health': []
  }

  useEffect(() => {
    if (data && data.length > 0) {
      DEFAULT_CATEGORIES.forEach(category => {
        categoriesList[category] = [];
      });
      
      data.forEach((card: CardType) => {
        if (card.majorCategory && categoriesList[card.majorCategory]) {
          card.defaultImag = DEFAULT_IMAGE[card.majorCategory as keyof typeof DEFAULT_IMAGE];
          categoriesList[card.majorCategory].push(card);
        }
      });
      console.log('categoriesList=========', categoriesList);
      
      setCategoryData({...categoriesList});
      setIsRefreshing(false);
    }

    setLastRefreshTime(new Date());
    if (isRefreshing) {
      setIsRefreshing(false);
    }
  }, [data, isRefreshing]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refresh();
    } catch (error) {
      console.error('refresh error:', error);
      setIsRefreshing(false);
    }
  };

  // 格式化刷新时间显示
  const formatRefreshTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleList = (id: string, status: number) => {
    console.log('id', id, 'status', status);
  }

  if (loading) return <Loading />;
  if (error) return <div>Error loading cards: {error}</div>;
  
  const showAllCategories: any = () => {
    return (
        <div className="home-page container mx-auto p-4">
          <div className="topic-box bg-blue-100 rounded-lg mb-8 pb-8">
              <CardList cards={data} onHandleData={handleList}></CardList>
          </div>
      </div>
    );
  }
  const showRefreshButton = () => {
    return (
      <div className="fixed top-4 right-4 z-50 flex items-center">
        <div className="mr-3 bg-white bg-opacity-90 px-3 py-1 rounded-full shadow text-sm text-gray-600 flex items-center">
          <svg className="w-4 h-4 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Last updated: {formatRefreshTime(lastRefreshTime)}</span>
        </div>
        
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className={`flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all ${isRefreshing ? 'opacity-75' : 'opacity-100'}`}
        >
          <svg 
            className={`w-5 h-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
    )
  }

  const showCategoriesForCategory = () => {
    return Object.entries(categoryData).map(([category, cards]) => {
      const displayCards = cards.slice(0, 4);
      const placeholdersNeeded = Math.max(0, 4 - displayCards.length);
      const placeholders = Array.from({ length: placeholdersNeeded }, (_, i) => ({
        id: -(i + 1), // Use negative numbers for placeholder ids to avoid conflicts
        title: "",
        description: "",
        majorCategory: category,
        defaultImag: '',
        abstract: "",
        imageUrl: "",
        thumbnail: "",
        image:"",
        category: category,
        isPlaceholder: true // 标记为占位卡片
      } as CardType));

      const finalCards = [...displayCards, ...placeholders];

      return (
        <div className="home-page container mx-auto p-4">
            <div className="topic-box bg-blue-100 rounded-lg">
              <h2 className="py-4 px-6 text-2xl font-bold capitalize text-left border-l-4 border-blue-500 ml-4 flex items-center bg-white bg-opacity-50 shadow-sm w-fit">
                  <span className="text-black-700">{category}</span>
                  <span className="ml-2 text-sm text-blue-500 font-normal">({cards.length})</span>
              </h2>
              <CardList cards={finalCards} onHandleData={handleList}></CardList>
            </div>
        </div>
      )
    });
  }

  return <>
    { showRefreshButton() }
    { showCategoriesForCategory() }
  </>
};

export default Home;
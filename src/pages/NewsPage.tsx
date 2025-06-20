import { DEFAULT_CATEGORIES, DEFAULT_IMAGE } from '../mock/defaultData';
import React, { useEffect, useState } from 'react';

import Card from '../components/Card';
import { Card as CardType } from '../types';
import Loading from '../components/Loading';
import { useFetch } from '../hooks/useFetch';

const NewsPage: React.FC = () => {
  // 分页状态
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 10;

  // 数据获取
  const LOCAL_JSON_NEWS_URL_TEST = '/api/azure/output/pre_rendering_en-us_20250617170000.json';
  const { data, loading, error } = useFetch(LOCAL_JSON_NEWS_URL_TEST);
  const [newsItems, setNewsItems] = useState<CardType[]>([]);
  const [categoriesList, setCategoriesList] = useState<string[]>([]);

  // 当数据加载后处理
  useEffect(() => {
    if (data && data.length > 0) {            
      // 确保每个项目都有必要的属性
      const processedItems = data.map((item: CardType) => {
        return {
          ...item,
          defaultImag: item.majorCategory 
            ? DEFAULT_IMAGE[item.majorCategory as keyof typeof DEFAULT_IMAGE] : ''
        };
      });
      
      setNewsItems(processedItems);
    }
  }, [data, currentPage]);

  // 处理页面变更
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 处理卡片交互
  const handleCardAction = (id: string, status: number) => {
    console.log(`Card ${id} action: ${status}`);
    // 这里可以添加更多的处理逻辑
  };

  // 渲染分页控制
  const renderPagination = () => {
    const pageNumbers: number[] = [];
    
    // 确定要显示哪些页码
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    // 确保总是显示5个页码按钮(如果总页数足够)
    if (endPage - startPage + 1 < 5 && totalPages >= 5) {
      if (startPage === 1) {
        endPage = Math.min(startPage + 4, totalPages);
      } else if (endPage === totalPages) {
        startPage = Math.max(endPage - 4, 1);
      }
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    
    return (
      <div className="pagination-container flex justify-center items-center p-4 bg-white sticky top-0 z-40 shadow-md">
        <div className="pagination flex items-center space-x-2">
          {/* 首页按钮 */}
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
            aria-label="First page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
          
          {/* 上一页按钮 */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
            aria-label="Previous page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* 页码显示 */}
          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="px-3 py-1 rounded-md text-blue-600 hover:bg-blue-50"
              >
                1
              </button>
              {startPage > 2 && <span className="px-1">...</span>}
            </>
          )}
          
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={`px-3 py-1 rounded-md ${
                currentPage === number
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 hover:bg-blue-50'
              }`}
            >
              {number}
            </button>
          ))}
          
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-1">...</span>}
              <button
                onClick={() => handlePageChange(totalPages)}
                className="px-3 py-1 rounded-md text-blue-600 hover:bg-blue-50"
              >
                {totalPages}
              </button>
            </>
          )}
          
          {/* 下一页按钮 */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
            aria-label="Next page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* 末页按钮 */}
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-blue-600 hover:bg-blue-50'
            }`}
            aria-label="Last page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* 页码指示器 */}
        <div className="ml-4 text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </div>
      </div>
    );
  };

  // 加载状态展示
  if (loading) return <Loading />;
  
  // 错误状态展示
  if (error) return (
    <div className="container mx-auto p-8 text-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>Error loading news: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="news-page min-h-screen bg-gray-100">
      {/* 头部分页 */}
      {renderPagination()}
      
      {/* 主内容区域 */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Latest News</h1>
        {/* 卡片网格 - 响应式布局 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {newsItems.map((item) => (
            <div key={item.id || `news-${Math.random()}`} className="card-container h-full">
              <Card 
                card={item} 
                onApprove={(id) => handleCardAction(id.toString(), 1)} 
                onReject={(id) => handleCardAction(id.toString(), 0)}
              />
            </div>
          ))}
          
          {/* 如果当前页卡片数量不足，添加空白占位符 */}
          {newsItems.length < 12 && Array.from({ length: 12 - newsItems.length }, (_, i) => (
            <div key={`placeholder-${i}`} className="card-placeholder h-64 bg-gray-50 rounded-lg shadow-sm border border-dashed border-gray-300"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
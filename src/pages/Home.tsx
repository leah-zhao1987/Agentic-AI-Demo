import { DEFAULT_CATEGORIES, DEFAULT_IMAGE } from '../mock/defaultData';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Card as CardType } from '../types';
import CarouselPage from './CarouselPage';
import CategoryPage from './CategoryPage';
import Loading from '../components/Loading';
import axios from 'axios';
import config from '../config';

const MSN = '20250618_msnDataTest';
const NoNMSN = '20250618_NonMsnDataTest';
const MSN01 ='20250619_msnDataTest'

// const baseUrl = 'https://jolly-sea-0d3061c1e.6.azurestaticapps.net/output';
const baseUrl = config.apiUrl;
const path = {
  directoryName: '20250621',
  fileName: 'pre_rendering_en-us_metaInfo.json',
};
const report = `${baseUrl}/${path.directoryName}/analysis_report.html`;
let fileNameList: string[];
console.log('baseUrl===========', baseUrl);

const Home: React.FC = () => {
  // let url = '/api/pre_rendering_en-us_20250617170000.json';
  const [isShowCard, setIsShowCard] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [categoryData, setCategoryData] = useState<{ [key: string]: CardType[] }>({});
  const [lastRefreshTime, setLastRefreshTime] = useState<Date>(new Date());
  const getCurrentDateString = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };
  const getNewsList = () => {
      // path.directoryName = getCurrentDateString();
      console.log('path.directoryName', path.directoryName);
      let url = `/api/${path.directoryName}/${fileNameList[currentPage-1]}`;
      // url = `/api/20250619_msnDataTest/${fileNameList[currentPage-1]}`;
      url = `${baseUrl}/${path.directoryName}/${fileNameList[currentPage-1]}`;
      setLoading(true);
      axios.get(`${url}`).then(response => {
        const newsData = response?.data?.news || response?.data;
        const processedData = processNewsData(newsData);
        setCategoryData(processedData);
        setLastRefreshTime(new Date());
        console.log('processedData', processedData);
        localStorage.setItem('CARD_LIST', JSON.stringify(newsData));
        localStorage.setItem('CATEGORY_DATA', JSON.stringify(processedData));
      }).catch(error => {
        console.error('Error fetching news data:', error);
      }).finally(() => {
        setIsRefreshing(false);
        setLoading(false);
        console.log('getNewsList completed');
      })
  }
  const getMetaInfo = () => {
    // let  url = `/api/${path.directoryName}/${path.fileName}`;
    let url = 'api/20250621/pre_rendering_en-us_metaInfo.json';
    url = `${baseUrl}/${path.directoryName}/${path.fileName}`;
    return axios.get(url).then(response => {
      fileNameList = response.data.split('\n').filter((fileName: string) => !!fileName);
      console.log('fileNameList', fileNameList);
      getNewsList();
    })
  }

  useEffect(() => {
    getMetaInfo();
  }, [currentPage])

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await getMetaInfo();
      setIsRefreshing(false);
    } catch (error) {
      console.error('refresh error:', error);
      setIsRefreshing(false);
    }
  };

  // process news data into categories
  const processNewsData = useCallback((data: CardType[]) => {
    const categoriesList: { [key: string]: CardType[] } = {};
    
    // initialize categories with empty arrays
    DEFAULT_CATEGORIES.forEach(category => {
      categoriesList[category] = [];
    });

    // process each card
    data.forEach((card: CardType) => {
      if (!card.majorCategory && card.topic) {
        card.majorCategory = card.topic;
      }
      
      if (card.majorCategory && categoriesList[card.majorCategory]) {
        card.defaultImag = DEFAULT_IMAGE[card.majorCategory as keyof typeof DEFAULT_IMAGE];
        categoriesList[card.majorCategory].push(card);
      }
    });

    return categoriesList;
  }, []);

  // format refresh time for display
  const formatRefreshTime = (date: Date): string => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleList = (id: string, status: number) => {
    console.log('id', id, 'status', status);
  }

  // scroll to top when page changes
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollToTop = () => {
      if (containerRef.current) {
          containerRef.current.scrollTo({
              top: 0,
              behavior: 'smooth'
          });
      }
  };

  // navigate to the selected page
  const handlePageChange = (pageNum: number) => {
    setCurrentPage(pageNum);
    scrollToTop();
  };

  // if (loading && !isRefreshing) return <Loading />;
  if (error) return <div className="text-red-500 text-center p-4">Error loading cards: {error}</div>;

  // Render pagination controls
  const renderPagination = () => {
    const pageNumbers: number[] = [];

    const startPage = 1;
    const totalPages = fileNameList?.length;
    for (let i = startPage; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    return (
      <>
        <div className="flex items-center justify-start">
          <div className="mr-3 bg-white bg-opacity-90 px-3 py-1 rounded-full shadow text-sm text-gray-600 flex items-center">
            {pageNumbers.map(number => (
              <button
                key={number}
                onClick={() => handlePageChange(number)}
                className={`px-3 py-1 rounded-md ${currentPage === number
                    ? 'bg-blue-600 text-white'
                    : 'text-blue-600 hover:bg-blue-50'
                  }`}
              >
                {number}
              </button>
            ))}
          </div>
          <div className="ml-4 text-sm text-white pl-4 w-[120px]">
            Page {currentPage} of {totalPages}
          </div>

          {/* 视图切换按钮 */}
          <button
            onClick={() => setIsShowCard(!isShowCard)}
            className="ml-4 px-4 py-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all flex items-center justify-center"
            style={{ width: '160px', margin: '0 auto' }}
          >
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              {isShowCard ? (
                // 轮播图图标
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              ) : (
                // 卡片图标
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              )}
            </svg>
            {!isShowCard ? 'Carousel View' : 'Card View'}
          </button>
          {/* <div className="mx-4 text-sm text-white flex items-center">
            <svg className="w-4 h-4 mr-1 text-withe-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Last updated: {formatRefreshTime(lastRefreshTime)}</span>
          </div> */}
          <a
            href= {report}            
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 px-4 py-2 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-all flex items-center"
            style={{ width: '210px'}}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            View Analysis Report
          </a>
        </div>
      </>
    );
  };

  const showRefreshButton = () => {
    return (
      <>
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
      </>
    )
  }

  const display = () => (
      <div className="home-page container mx-auto p-4 h-full overflow-y-auto scrollbar-hide">
        <div className="fixed top-4 right-4 z-50 flex items-center justify-start">
          {renderPagination()}
          {/* {showRefreshButton()} */}
        </div>
        {isRefreshing && (
          <div className="fixed top-20 inset-x-0 flex justify-center z-40">
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-full shadow-lg">
              Refreshing content...
            </div>
          </div>
        )}
        <div ref={containerRef} className="mx-auto px-4 py-8 h-full overflow-y-auto scrollbar-hide">
            {
              isShowCard ? (<CategoryPage
              categories={categoryData}
              onHandleData={handleList}/>) :
              <CarouselPage></CarouselPage>
            }              
        </div>
      </div>
  )
    
  return display();
};

export default Home;
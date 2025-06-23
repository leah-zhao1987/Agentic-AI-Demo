import { Card } from '../types';
import { mockCardList } from '../mock/mockData';

const API_URL = 'https://api.example.com/cards'; // Replace with your actual API URL
const LOCAL_JSON_URL = 'data/cardList.json';
const LOCAL_JSON_NEWS_URL = 'data/news.json';
const LOCAL_JSON_NEWS_URL_2 = 'data/news2.json';
const LOCAL_JSON_NEWS_URL_3 = 'data/news3.json';
const LOCAL_JSON_NEWS_URL_EN = 'data/newsEn.json';
const LOCAL_JSON_NEWS_URL_JA = 'data/newsJa.json';
const LOCAL_JSON_NEWS_URL_DE = 'data/newsDe.json';
const LOCAL_JSON_NEWS_URL_EN01 = 'data/newsEn01.json';
const LOCAL_JSON_NEWS_URL_TEST = 'data/FineTuningTest1/pre_rendering_en-us-9.json';
export const LOCAL_JSON_NEWS_URL_TEST_ID = 'data/FineTuningTest1/pre_rendering_en-us-';
const LOCAL_JSON_NEWS_URL_CRAWLER = 'data/newsCrawler.json';

const pre_rendering_en_us_json = '/api/pre_rendering_en-us_20250617170000.json';

const getFileName = [
    'pre_rendering_en-us_20250618225520.json',
    'pre_rendering_en-us_20250618225651.json',
    'pre_rendering_en-us_20250618225754.json',
    'pre_rendering_en-us_20250618225908.json',
    'pre_rendering_en-us_20250618230023.json',
    'pre_rendering_en-us_20250618230150.json',
    'pre_rendering_en-us_20250618230302.json',
    'pre_rendering_en-us_20250618230424.json',
    'pre_rendering_en-us_20250618230533.json',
    'pre_rendering_en-us_20250618230726.json'
]


export const fetchCards = async (url:string): Promise<Card[]> => {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error('Failed to fetch cards');
    }
    return response.json();
};

export const fetchLocalJsonCards = async (): Promise<any[]> => {
    try {
        const response = await fetch(LOCAL_JSON_URL);
        console.log(response,'fetchLocalJsonCards');
        console.log(response.json(),'fetchLocalJsonCards');
        if (!response.ok) {
            throw new Error('Failed to fetch local JSON data');
        }
        return response.json() || [];
    } catch (error) {
        console.error('Error fetching local JSON:', error);
        return mockCardList;
    }
};

export const fetchLocalJsonNews = async (): Promise<any> => {
    try {
        const response = await fetch(LOCAL_JSON_NEWS_URL_EN01);
        let data = response.json();
        if (!response.ok) {
            throw new Error('Failed to fetch local JSON data');
        }
         return data || [];
    } catch (error) {
        throw new Error('Error fetching local JSON:', error as any);
    }
};

export const fetchLocalJsonNewsTest = async (url: string): Promise<any> => {
    try {
        const response = await fetch(url);
        let data = response.json();
        if (!response.ok) {
            throw new Error('Failed to fetch local JSON data');
        }
         return data|| [];
    } catch (error) {
        throw new Error('Error fetching local JSON:', error as any);
    }
};

export const fetchLocalJsonNewsTestId = async (id: string): Promise<any> => {
    try {
        const response = await fetch(`${LOCAL_JSON_NEWS_URL_TEST_ID}${id}.json`);
        let data = response.json();
        if (!response.ok) {
            throw new Error('Failed to fetch local JSON data');
        }
         return data|| [];
    } catch (error) {
        throw new Error('Error fetching local JSON:', error as any);
    }
};
// Mock implementation for initial rendering
export const fetchMockCards = async (): Promise<any[]> => {
    return mockCardList;
};
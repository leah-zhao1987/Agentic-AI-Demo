import { useCallback, useEffect, useState } from 'react';

import { fetchLocalJsonNewsTest } from '../services/api';

export const useFetch = (url: string) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshFlag, setRefreshFlag] = useState<number>(0);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // const response = await fetch(url);
      // const response = await fetch(url);
      // const response = await fetchLocalJsonNewsTest()
      
      // if (!response.ok) {
      //   throw new Error(`HTTP error ${response.status}`);
      // }
      
      // const jsonData = await response.json();
      // const result = jsonData.news || jsonData;
      const response = await fetchLocalJsonNewsTest(url);
      const result = response;
      setData(result.news || result);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    console.log('refreshFlag----', refreshFlag);
    fetchData();
  }, [fetchData, refreshFlag]);

  const refresh = useCallback(() => {
    setRefreshFlag(prev => prev + 1);
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), 100);
    });
  }, []);

  return { data, loading, error, refresh};
};

export default useFetch;
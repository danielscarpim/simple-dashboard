import { useEffect, useState } from 'react';
import { fetchMetrics } from 'api/Api';

const useDashboard = () => {
  const [metrics, setMetrics] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMetrics();
      setMetrics(data as any);
    };
    fetchData();
  }, []);

  return {
    metrics,
  };
};

export default useDashboard;

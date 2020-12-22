import { useEffect, useState } from 'react';
import { fetchMetrics, MetricsType } from 'api/Api';

const useDashboard = () => {
  const [metrics, setMetrics] = useState<MetricsType>();
  const [filteredMetrics, setFilteredMetrics] = useState<MetricsType>();
  const [filters, setFilters] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMetrics();
      console.log('data: ', data);
      setMetrics(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // console.log('filters: ', filters);
  }, [filters]);

  return {
    metrics,
    filters,
    filteredMetrics,
  };
};

export default useDashboard;

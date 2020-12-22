import { useEffect, useState } from 'react';
import { fetchMetrics, Metrics, fetchFilters, Filters } from 'api/Api';

const useDashboard = () => {
  const [metrics, setMetrics] = useState<Metrics>();
  const [filteredMetrics, setFilteredMetrics] = useState<Metrics>();
  const [filters, setFilters] = useState<Filters>();

  useEffect(() => {
    const fetchData = async () => {
      const metricsData = await fetchMetrics();
      const filtersData = await fetchFilters();
      console.log('filtersData: ', filtersData);
      setMetrics(metricsData);
      setFilters(filtersData);
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

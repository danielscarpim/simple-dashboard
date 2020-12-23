import { useEffect, useState, ChangeEvent } from 'react';
import { fetchMetrics, Metrics, fetchFilters, Filters, ActiveFilters } from 'api/Api';

const useDashboard = () => {
  const [metrics, setMetrics] = useState<Metrics>();
  const [filters, setFilters] = useState<Filters>();
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>();
  const [campaignFilter, setCampaignFilter] = useState<string | null>(null);
  const handleFilterChange = (event: ChangeEvent<Record<string, unknown>>, value: string | null) => {
    console.log('value: ', value);
    setCampaignFilter(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const metricsData = await fetchMetrics();
      const filtersData = await fetchFilters();
      setMetrics(metricsData);
      setFilters(filtersData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchFilteredMetrics = async () => {
      const metricsData = await fetchMetrics(activeFilters);
      setMetrics(metricsData);
    };
    fetchFilteredMetrics();
  }, [activeFilters]);

  return {
    metrics,
    filters,
    handleFilterChange,
    campaignFilter,
  };
};

export default useDashboard;

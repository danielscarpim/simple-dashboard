import { useEffect, useState } from 'react';
import { fetchMetrics, Metrics, Filters, ActiveFilters } from 'api/Api';

const useDashboard = () => {
  const [metrics, setMetrics] = useState<Metrics>();
  const [filters, setFilters] = useState<Filters>();
  const [campaignFilter, setCampaignFilter] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const metricsData = await fetchMetrics();
      setMetrics(metricsData.metrics);
      setFilters(metricsData.filters);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchFilteredMetrics = async () => {
      const activeFilters: ActiveFilters = [];
      if (campaignFilter) activeFilters.push({ Campaign: campaignFilter });
      if (sourceFilter) activeFilters.push({ Datasource: sourceFilter });
      const metricsData = await fetchMetrics(activeFilters);
      setMetrics(metricsData.metrics);
      setFilters(metricsData.filters);
    };
    fetchFilteredMetrics();
  }, [campaignFilter, sourceFilter]);

  return {
    metrics,
    filters,
    campaignFilter,
    setCampaignFilter,
    sourceFilter,
    setSourceFilter,
  };
};

export default useDashboard;

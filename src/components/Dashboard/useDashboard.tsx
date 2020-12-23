import { useEffect, useState, ChangeEvent } from 'react';
import { fetchMetrics, Metrics, fetchFilters, Filters, ActiveFilters } from 'api/Api';
import { OnChangeProps } from 'components/Filter/filter';

const useDashboard = () => {
  const [metrics, setMetrics] = useState<Metrics>();
  const [filters, setFilters] = useState<Filters>();
  const [campaignFilter, setCampaignFilter] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);

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
      const activeFilters = {
        Campaign: campaignFilter,
        Datasource: sourceFilter,
      };
      const metricsData = await fetchMetrics(activeFilters);
      setMetrics(metricsData);
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

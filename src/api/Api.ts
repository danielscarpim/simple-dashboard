/* eslint-disable import/prefer-default-export */
import Papa from 'papaparse';
import _ from 'lodash';

const mergeDates = (metrics: Record<string, MetricsData[]>) => {
  const mergedDates: Record<string, MetricsData> = {};
  _.forEach(metrics, (values, key) => {
    const reducedArray = _.reduce(values, (result, value) => {
      const date = {
        Clicks: result.Clicks + value.Clicks,
        Impressions: result.Impressions + value.Impressions,
      };
      return date;
    }) as MetricsData;
    mergedDates[key] = reducedArray;
  });
  return mergedDates;
};

const filterMetrics = (metrics: MetricsData[], activeFilters: ActiveFilters, nextFilter?: number) => {
  let currentFilter = nextFilter || 0;
  let filteredMetrics = _.filter(metrics, activeFilters[currentFilter]) as MetricsData[];
  if (currentFilter < activeFilters.length - 1) {
    filteredMetrics = filterMetrics(filteredMetrics, activeFilters, (currentFilter = +1));
  }
  return filteredMetrics;
};

const getFilters = (metrics: MetricsData[]) => {
  const campaigns = Array.from(Object.keys(_.groupBy(metrics, 'Campaign')));
  const dataSources = Array.from(Object.keys(_.groupBy(metrics, 'Datasource')));
  return { campaigns, dataSources };
};

export const fetchMetrics = async (activeFilters?: ActiveFilters): Promise<MetricsResponse> => {
  return new Promise((resolve, reject) => {
    try {
      Papa.parse('api/data.csv', {
        download: true,
        header: true,
        delimiter: ',',
        dynamicTyping: true,
        fastMode: true,
        complete: (results) => {
          const rawMetrics = results.data as MetricsData[];
          const filteredMetrics: MetricsData[] = activeFilters?.length
            ? filterMetrics(rawMetrics, activeFilters)
            : (results.data as MetricsData[]);
          const filters = getFilters(filteredMetrics);
          const byDate = _.groupBy(filteredMetrics, 'Date') as Record<string, MetricsData[]>;
          const metrics = mergeDates(byDate);
          resolve({ metrics, filters });
        },
      });
    } catch (error) {
      reject(new Error(error));
    }
  });
};

export type Filters = {
  dataSources: string[];
  campaigns: string[];
};

export type ActiveFilters = Record<string, string | null>[];

export type MetricsData = {
  Date?: string;
  DataSource?: string;
  Campaign?: string;
  Clicks: number;
  Impressions: number;
};
export type Metrics = Record<string, MetricsData>;

export type MetricsResponse = {
  metrics: Metrics;
  filters: Filters;
};

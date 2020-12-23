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

export const fetchFilters = async (): Promise<Filters> => {
  return new Promise((resolve, reject) => {
    try {
      Papa.parse('api/data.csv', {
        download: true,
        header: true,
        delimiter: ',',
        dynamicTyping: true,
        fastMode: true,
        complete: (results) => {
          const campaigns = Array.from(Object.keys(_.groupBy(results.data, 'Campaign')));
          const dataSources = Array.from(Object.keys(_.groupBy(results.data, 'Datasource')));
          resolve({ campaigns, dataSources });
        },
      });
    } catch (error) {
      reject(new Error(error));
    }
  });
};

const filterMetrics = (metrics: MetricsData[], filter: ActiveFilters) => {
  console.log('filter: ', filter);
  const filteredMetrics = _.filter(metrics, filter);
  console.log('filteredMetrics: ', filteredMetrics);
};

export const fetchMetrics = async (filter?: ActiveFilters): Promise<Metrics> => {
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
          if (filter) filterMetrics(rawMetrics, filter);
          const metrics = filter ? _.filter(results.data, filter) : results.data;
          const byDate = _.groupBy(metrics, 'Date') as Record<string, MetricsData[]>;
          const mergedMetrics = mergeDates(byDate);
          resolve(mergedMetrics);
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

export type ActiveFilters = {
  Campaign: string | null;
  Datasource: string | null;
};

export type MetricsData = {
  Date?: string;
  DataSource?: string;
  Campaign?: string;
  Clicks: number;
  Impressions: number;
};
export type Metrics = Record<string, MetricsData>;

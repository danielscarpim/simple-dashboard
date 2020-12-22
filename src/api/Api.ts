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

export const fetchMetrics = async (): Promise<Metrics> => {
  return new Promise((resolve, reject) => {
    try {
      Papa.parse('api/data.csv', {
        download: true,
        header: true,
        delimiter: ',',
        dynamicTyping: true,
        complete: (results) => {
          const byDate = _.groupBy(results.data, 'Date') as Record<string, MetricsData[]>;
          const metrics = mergeDates(byDate);
          resolve(metrics);
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

export type MetricsData = {
  Date?: string;
  DataSource?: string;
  Campaign?: string;
  Clicks: number;
  Impressions: number;
};
export type Metrics = Record<string, MetricsData>;

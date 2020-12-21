/* eslint-disable import/prefer-default-export */
import Papa from 'papaparse';
import _ from 'lodash';

export const fetchMetrics = async (): Promise<MetricsType> => {
  return new Promise((resolve, reject) => {
    try {
      Papa.parse('api/data.csv', {
        download: true,
        header: true,
        delimiter: ',',
        dynamicTyping: true,
        complete: (results) => {
          const byDate = _.groupBy(results.data, 'Date');
          resolve(byDate);
        },
      });
    } catch (error) {
      reject(new Error(error));
    }
  });
};

export type MetricsType = Record<string, any[]> | undefined;

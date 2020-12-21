/* eslint-disable import/prefer-default-export */
import Papa from 'papaparse';

export const fetchMetrics = async () => {
  try {
    let response = null;
    Papa.parse('api/data.csv', {
      download: true,
      header: true,
      delimiter: ',',
      complete: (results) => {
        response = results.data;
        console.log('response: ', response);
      },
    });
    const metrics = response;
    return metrics;
  } catch (error) {
    throw new Error(error);
  }
};

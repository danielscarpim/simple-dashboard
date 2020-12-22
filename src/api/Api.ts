/* eslint-disable import/prefer-default-export */
import Papa from 'papaparse';
import _ from 'lodash';

// export const fetchMetrics = async (): Promise<MetricsType> => {
//   return new Promise((resolve, reject) => {
//     try {
//       Papa.parse('api/data.csv', {
//         download: true,
//         header: true,
//         delimiter: ',',
//         dynamicTyping: true,
//         preview: 10,
//         complete: (results) => {
//           const byDate = _.groupBy(results.data, 'Date');
//           resolve(byDate);
//         },
//       });
//     } catch (error) {
//       reject(new Error(error));
//     }
//   });
// };

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

export const fetchMetrics = async (): Promise<MetricsType> => {
  return new Promise((resolve, reject) => {
    try {
      Papa.parse('api/data.csv', {
        download: true,
        header: true,
        delimiter: ',',
        dynamicTyping: true,
        preview: 500,
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

// export const filterMetrics = async (): Promise<MetricsType> => {
//   return new Promise((resolve, reject) => {
//     try {
//       Papa.parse('api/data.csv', {
//         download: true,
//         header: true,
//         delimiter: ',',
//         dynamicTyping: true,
//         preview: 500,
//         complete: (results) => {
//           const byDate = _.groupBy(results.data, 'Date');
//           console.log('results.data: ', results.data);
//           console.log('byDate: ', byDate);
//           const byCampaign = _.filter(results.data, {
//             Campaign: 'GDN Prospecting - App - Prio 1 Offer',
//           }) as MetricsData[];
//           console.log('byCampaign: ', byCampaign);
//           const resultArray: MetricsData[] = [];
//           const reducedArray = _.reduce(byCampaign, (result, value, key, accumulator) => {
//             console.log('accumulator: ', accumulator);
//             if (result.Date === value.Date) {
//               const date = {
//                 ...result,
//                 Clicks: result.Clicks + value.Clicks,
//                 Impressions: result.Impressions + value.Impressions,
//               };
//               console.log('date: ', date);
//               console.log('result: ', result.Clicks + value.Clicks);
//               resultArray.push(date);
//             }
//             console.log('result: ', result);
//             console.log('value: ', value);
//             return result;
//           });
//           console.log('resultArray: ', resultArray);
//           resolve(byDate);
//         },
//       });
//     } catch (error) {
//       reject(new Error(error));
//     }
//   });
// };

export type MetricsData = {
  Date?: string;
  DataSource?: string;
  Campaign?: string;
  Clicks: number;
  Impressions: number;
};
export type MetricsType = Record<string, MetricsData>;

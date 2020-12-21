/* eslint-disable import/prefer-default-export */
export const fetchMetrics = async () => {
  try {
    const response = await fetch('api/data.csv');
    const metrics = response.body;
    console.log('metrics: ', metrics);
    return metrics;
  } catch (error) {
    throw new Error(error);
  }
};

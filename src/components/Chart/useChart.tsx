import { MetricsType } from 'api/Api';
import { useState } from 'react';

const useChart = (metrics: MetricsType) => {
  console.log('metrics: ', metrics);
  const [chartOptions] = useState({
    xAxis: {
      categories: Array.from(Object.keys(metrics)),
    },
    series: [{ data: [1, 2, 3] }],
    // series: [{ data: [1, 2, 3] }],
  });

  return {
    chartOptions,
  };
};

export default useChart;

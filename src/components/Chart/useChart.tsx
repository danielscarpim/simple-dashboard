import { MetricsType } from 'api/Api';
import { useState } from 'react';

const useChart = (metrics: MetricsType) => {
  console.log('metrics: ', metrics);
  const [chartOptions] = useState({
    xAxis: {
      categories: ['A', 'B', 'C'],
    },
    series: [{ data: [1, 2, 3] }],
  });

  return {
    chartOptions,
  };
};

export default useChart;

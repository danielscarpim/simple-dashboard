import { useState } from 'react';

interface ChartOptions {
  xAxis?: {
    categories: string[];
  };
  series: [
    {
      data: number[];
    },
  ];
}

const useChart = () => {
  const [chartOptions] = useState<ChartOptions>({
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

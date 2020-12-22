import { Metrics } from 'api/Api';
import _ from 'lodash';
import { useState } from 'react';

const useChart = (metrics: Metrics) => {
  const getSeries = () => {
    const clicks: number[] = [];
    const impressions: number[] = [];
    const series = [
      { data: clicks, name: 'Clicks' },
      { data: impressions, name: 'Impressions' },
    ];
    _.forEach(metrics, (values) => {
      clicks.push(values.Clicks);
      impressions.push(values.Impressions);
    });
    return series;
  };

  const [chartOptions] = useState({
    xAxis: {
      categories: Array.from(Object.keys(metrics)),
    },
    series: getSeries(),
  });

  return {
    chartOptions,
  };
};

export default useChart;

import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import useChart from './useChart';

const Chart = () => {
  const { chartOptions } = useChart();
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default Chart;

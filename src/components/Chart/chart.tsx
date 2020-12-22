import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Metrics } from 'api/Api';
import useChart from './useChart';

const Chart = ({ metrics }: { metrics: Metrics }) => {
  const { chartOptions } = useChart(metrics);
  return <HighchartsReact highcharts={Highcharts} options={chartOptions} />;
};

export default Chart;

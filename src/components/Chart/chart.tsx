import React from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Metrics } from 'api/Api';
import { Box } from '@material-ui/core';
import useChart from './useChart';

const Chart = ({ metrics }: { metrics: Metrics }) => {
  const { chartOptions } = useChart(metrics);
  return (
    <Box>
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </Box>
  );
};

export default Chart;

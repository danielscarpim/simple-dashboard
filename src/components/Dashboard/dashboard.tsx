import React from 'react';
import { Chart } from 'components';
import useDashboard from './useDashboard';

const Dashboard = () => {
  const { metrics } = useDashboard();
  return <div>{metrics && <Chart metrics={metrics} />}</div>;
};

export default Dashboard;

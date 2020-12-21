import React from 'react';
import { Chart } from 'components';
import useDashboard from './useDashboard';

const Dashboard = () => {
  const { metrics } = useDashboard();
  console.log('metrics: ', metrics);
  return (
    <div>
      <Chart />
    </div>
  );
};

export default Dashboard;

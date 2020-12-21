import React from 'react';
import useDashboard from './useDashboard';

const Dashboard = () => {
  const { metrics } = useDashboard();
  console.log('metrics: ', metrics);
  return <div>dashboard</div>;
};

export default Dashboard;

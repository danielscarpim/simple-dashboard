import React from 'react';
import useDashboard from './useDashboard';

const Dashboard = () => {
  const { metrics } = useDashboard();
  return <div>dashboard</div>;
};

export default Dashboard;

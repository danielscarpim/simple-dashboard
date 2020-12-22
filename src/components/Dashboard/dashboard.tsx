import React from 'react';
import { Chart, Filter } from 'components';
import useDashboard from './useDashboard';

const Dashboard = () => {
  const { metrics, filters } = useDashboard();
  return (
    <div>
      {filters && <Filter filters={filters} />}
      {metrics && <Chart metrics={metrics} />}
    </div>
  );
};

export default Dashboard;

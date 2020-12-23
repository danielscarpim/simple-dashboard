import React from 'react';
import { Chart, Filter } from 'components';
import useDashboard from './useDashboard';

const Dashboard = () => {
  const { metrics, filters, handleFilterChange, campaignFilter } = useDashboard();
  return (
    <div>
      {filters && <Filter filters={filters} campaignFilter={campaignFilter} handleFilterChange={handleFilterChange} />}
      {metrics && <Chart metrics={metrics} />}
    </div>
  );
};

export default Dashboard;

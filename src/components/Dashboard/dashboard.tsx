import React from 'react';
import { Chart, Filter } from 'components';
import { Box } from '@material-ui/core';
import useDashboard from './useDashboard';

const Dashboard = () => {
  const { metrics, filters, campaignFilter, setCampaignFilter, sourceFilter, setSourceFilter } = useDashboard();
  return (
    <Box padding="20px 0">
      {filters && (
        <Filter
          filters={filters}
          campaignFilter={campaignFilter}
          setCampaignFilter={setCampaignFilter}
          sourceFilter={sourceFilter}
          setSourceFilter={setSourceFilter}
        />
      )}
      {metrics && <Chart metrics={metrics} />}
    </Box>
  );
};

export default Dashboard;

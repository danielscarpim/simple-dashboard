import React from 'react';
import { Chart, Filter } from 'components';
import { Box, Typography } from '@material-ui/core';
import useDashboard from './useDashboard';

const Dashboard = () => {
  const { metrics, filters, campaignFilter, setCampaignFilter, sourceFilter, setSourceFilter } = useDashboard();
  return (
    <Box padding="20px 0">
      <Typography variant="h6" gutterBottom>
        {`Datasource "${sourceFilter || 'All Sources'}" and metrics "${campaignFilter || 'All Campaigns'}"`}
      </Typography>
      {metrics && <Chart metrics={metrics} />}
      {filters && (
        <Filter
          filters={filters}
          campaignFilter={campaignFilter}
          setCampaignFilter={setCampaignFilter}
          sourceFilter={sourceFilter}
          setSourceFilter={setSourceFilter}
        />
      )}
    </Box>
  );
};

export default Dashboard;

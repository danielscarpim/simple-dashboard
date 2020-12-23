/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Filters } from 'api/Api';
import { FormControl, Typography, Box, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

interface FilterProps {
  filters: Filters;
  campaignFilter: string | null;
  setCampaignFilter: (value: string | null) => void;
  sourceFilter: string | null;
  setSourceFilter: (value: string | null) => void;
}

const Filter = ({ filters, campaignFilter, setCampaignFilter, sourceFilter, setSourceFilter }: FilterProps) => {
  const { campaigns, dataSources } = filters;
  // console.log('campaigns: ', campaigns);
  return (
    <Box display="flex" flexDirection="column">
      <Typography>Filters</Typography>
      <Box display="flex" flexDirection="row">
        <Box display="flex" flex="1" paddingRight="10px">
          <FormControl fullWidth>
            <Autocomplete
              fullWidth
              id="campaign-filter"
              options={campaigns}
              renderInput={(params) => <TextField {...params} label="Campaign" margin="normal" />}
              value={campaignFilter}
              onChange={(event, value) => setCampaignFilter(value)}
            />
          </FormControl>
        </Box>
        <Box display="flex" flex="1" paddingLeft="10px">
          <FormControl fullWidth>
            <Autocomplete
              fullWidth
              id="datasource-filter"
              options={dataSources}
              renderInput={(params) => <TextField {...params} label="Data Source" margin="normal" />}
              value={sourceFilter}
              onChange={(event, value) => setSourceFilter(value)}
            />
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default Filter;

/* eslint-disable react/jsx-props-no-spreading */
import React, { ChangeEvent } from 'react';
import { Filters } from 'api/Api';
import { FormControl, Typography, InputLabel, MenuItem, Select, Box, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

interface FilterProps {
  filters: Filters;
  handleFilterChange: (event: ChangeEvent<Record<string, unknown>>, value: string | null) => void;
  campaignFilter: string | null;
}

const Filter = ({ filters, handleFilterChange, campaignFilter }: FilterProps) => {
  const { campaigns, dataSources } = filters;
  // console.log('campaigns: ', campaigns);
  return (
    <Box display="flex" flexDirection="column">
      <Typography>Filters</Typography>
      <Box display="flex" width="50%">
        <FormControl fullWidth>
          <Autocomplete
            fullWidth
            id="campaign-filter"
            options={campaigns}
            renderInput={(params) => <TextField {...params} label="Campaigns" margin="normal" />}
            value={campaignFilter}
            onChange={handleFilterChange}
          />
        </FormControl>
      </Box>
    </Box>
  );
};

export default Filter;

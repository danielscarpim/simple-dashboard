import React from 'react';
import { Filters } from 'api/Api';

interface FilterProps {
  filters: Filters;
  handleFilterChange: (event: React.FormEvent) => void;
}

const Filter = ({ filters, handleFilterChange }: FilterProps) => {
  const { campaigns, dataSources } = filters;
  // console.log('campaigns: ', campaigns);
  return (
    <div>
      <p>Filters</p>
      <select name="campaigns" id="campaigns" onChange={handleFilterChange}>
        {campaigns.map((campaign) => (
          <option key={campaign} value={campaign}>
            {campaign}
          </option>
        ))}
      </select>
      <select name="dataSources" id="dataSources">
        {dataSources.map((dataSource) => (
          <option key={dataSource} value={dataSource}>
            {dataSource}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filter;

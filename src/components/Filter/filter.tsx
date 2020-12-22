import React from 'react';
import { Filters } from 'api/Api';

const Filter = ({ filters }: { filters: Filters }) => {
  const { campaigns, dataSources } = filters;
  return (
    <div>
      <p>Filters</p>
      <select name="campaigns" id="campaigns">
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

import React from 'react';
import shortid from 'shortid';
import PropTypes from 'prop-types';
import FilterContainer from './Filter.styled';

const customId = shortid.generate();

function Filter({ value, onChange }) {
  return (
    <FilterContainer>
      <label>
        Find contact by name
        <input
          id={customId}
          value={value}
          onChange={onChange}
          name="filter"
        ></input>
      </label>
    </FilterContainer>
  );
}

Filter.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default Filter;

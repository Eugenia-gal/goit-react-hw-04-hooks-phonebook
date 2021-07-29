import React from 'react';
import PropTypes from 'prop-types';
import CustomContainer from 'Components/Container/Container.styled';

function Container({ children }) {
  return <CustomContainer>{children}</CustomContainer>;
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;

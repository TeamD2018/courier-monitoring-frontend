import React from 'react';
import styled from 'styled-components';
import { Intent, Tag } from '@blueprintjs/core';
import PropTypes from 'prop-types';


const StyledTag = styled(Tag)`
  margin-left: 0.5rem;
`;

const StatusTag = ({ courier }) => {
  const isBusy = courier.orders_count > 0;

  return (
    <StyledTag intent={isBusy ? Intent.WARNING : Intent.SUCCESS}>
      {isBusy ? 'Занят' : 'Свободен'}
    </StyledTag>
  );
};

StatusTag.propTypes = {
  courier: PropTypes.shape({
    orders_count: PropTypes.number.isRequired,
  }).isRequired,
};

export default StatusTag;

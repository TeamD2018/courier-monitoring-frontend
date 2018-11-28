import React from 'react';
import styled from '@emotion/styled';
import {
  Button, Callout, Card, Intent,
} from '@blueprintjs/core';
import PropTypes from 'prop-types';

const StyledCard = styled(Card)`
  position: absolute;
  top: 0;
  right: 0;
  
  padding: 0;
  margin: 0.5rem;
  overflow: auto;
  width: 20rem;
`;

function reloadPage() { window.location.reload(); }

const ErrorCallout = ({ errorMessage, errorName }) => (
  <StyledCard elevation={2}>
    <Callout title={errorName} intent={Intent.DANGER} icon="error">
      <div>{errorMessage}</div>
      <Button
        large
        minimal
        intent={Intent.DANGER}
        icon="refresh"
        onClick={reloadPage}
      >
        Перезагрузить страницу
      </Button>
    </Callout>
  </StyledCard>
);


ErrorCallout.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  errorName: PropTypes.string.isRequired,
};

export default ErrorCallout;

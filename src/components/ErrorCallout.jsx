/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import {
  Button, Callout, Card, Intent,
} from '@blueprintjs/core';
import PropTypes from 'prop-types';

const cardStyle = css`
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
  <Card css={cardStyle} elevation={2}>
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
  </Card>
);


ErrorCallout.propTypes = {
  errorMessage: PropTypes.string.isRequired,
  errorName: PropTypes.string.isRequired,
};

export default ErrorCallout;

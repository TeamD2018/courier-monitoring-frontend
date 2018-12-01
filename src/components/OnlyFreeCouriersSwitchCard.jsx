/** @jsx jsx */
import { jsx, css } from '@emotion/core';
/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { Card, Switch } from '@blueprintjs/core';

const cardStyle = css`
  padding: 0.5rem;
  margin: 0.5rem;
  text-align: center;
  vertical-align: center;
`;

const switchStyle = css`
  margin: 0;
`;

const OnlyFreeCouriersSwitchCard = ({ checked, onChange }) => (
  <Card css={cardStyle} elevation={2}>
    <Switch
      css={switchStyle}
      large
      checked={checked}
      label="Только свободные курьеры"
      onChange={onChange}
    />
  </Card>
);

OnlyFreeCouriersSwitchCard.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func,
};

OnlyFreeCouriersSwitchCard.defaultProps = {
  onChange: null,
};


export default OnlyFreeCouriersSwitchCard;

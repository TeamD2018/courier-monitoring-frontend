/** @jsx jsx */
import { jsx, css } from '@emotion/core';
/* eslint-disable no-unused-vars */
import React, { PureComponent } from 'react';
/* eslint-enable no-unused-vars */
import PropTypes from 'prop-types';
import { Card } from '@blueprintjs/core';
import crossIcon from '../images/cross.svg';

const cardStyle = css`
  display: flex;
  justify-content: center;
  padding: 0.5rem;
  margin: 0.5rem;
  text-align: center;
  vertical-align: center;
`;

const iconStyle = css`
  margin: auto 0.4rem auto 0;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
`;

const textStyle = css`
  text-align: center;
  vertical-align: center;
  margin: auto;
  min-width: 0;
`;

/* eslint-disable jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-noninteractive-element-interactions */
const PolygonFilterCard = ({ name, resetPolygonFilter }) => (
  <Card css={cardStyle} elevation={2}>
    <div css={textStyle}>{name}</div>
    <img css={iconStyle} alt="Close" src={crossIcon} onClick={resetPolygonFilter} />
  </Card>
);
/* eslint-enable jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-noninteractive-element-interactions */

PolygonFilterCard.propTypes = {
  name: PropTypes.string.isRequired,
  resetPolygonFilter: PropTypes.func.isRequired,
};


export default PolygonFilterCard;

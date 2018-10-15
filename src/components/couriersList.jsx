import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { H5 } from '@blueprintjs/core';

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  width: 100%;
  padding: 0.8rem;
  
  &:nth-of-type(odd) {
    background: rgba(191, 204, 214, 0.15);
  }
  
  &:hover {
    background: rgba(191, 204, 214, 0.3);
  }
  
  &:active {
    background: rgba(191, 204, 214, 0.5);
  }
`;

const Title = styled.div`
  width: 100%;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const Phone = styled.div`
  flex-grow: 1;
  text-align: left;
`;

const LastSeen = styled.div`
  flex-grow: 1;
  text-align: right;
`;

class CouriersList extends PureComponent {
  static renderRow(courier) {
    return (
      <Row
        key={courier.id}
        id={courier.id}
      >
        <Title><H5>{ courier.name }</H5></Title>
        <Info>
          <Phone>{ courier.phone }</Phone>
          <LastSeen>{ courier.lastSeen }</LastSeen>
        </Info>
      </Row>
    );
  }

  render() {
    const { couriers } = this.props;

    return (
      <Body>
        { couriers.map(CouriersList.renderRow) }
      </Body>
    );
  }
}

CouriersList.propTypes = {
  couriers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    lastSeen: PropTypes.string,
  })),
};

CouriersList.defaultProps = {
  couriers: [],
};

export default CouriersList;

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Button, Card, Collapse, H5,
} from '@blueprintjs/core';

const Body = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  
  -webkit-overflow-scrolling: touch;
`;

const Row = styled.div`
  width: 100%;
  padding: 0.8rem;
  cursor: pointer;
  
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

const Title = styled(H5)`
  display: block;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-wrap: normal;
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

const StyledCard = styled(Card)`
  padding: 0;
  margin: 0.5rem;
  overflow: auto;
`;

const StyledButton = styled(Button)`
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 1) none !important;
  z-index: 100;
`;

class CouriersList extends PureComponent {
  constructor(props) {
    super(props);

    this.toggleList = this.toggleList.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
  }

  onRowClick(courier) {
    const {
      pan, hideCouriersList, requestActiveCourier, setZoom,
    } = this.props;

    pan({
      lat: courier.location.point.lat,
      lng: courier.location.point.lon,
    });

    setZoom(13);

    requestActiveCourier(courier.id, 0);
    hideCouriersList();
  }

  toggleList() {
    const { isOpen, showCouriersList, hideCouriersList } = this.props;

    if (isOpen) {
      hideCouriersList();
    } else {
      showCouriersList();
    }
  }

  renderRow(courier) {
    return (
      <Row
        key={courier.id}
        onClick={() => this.onRowClick(courier)}
      >
        <Title>{courier.name}</Title>
        <Info>
          <Phone>{`+${courier.phone}`}</Phone>
          <LastSeen>{new Date(courier.last_seen * 1000).toLocaleString()}</LastSeen>
        </Info>
      </Row>
    );
  }

  render() {
    const { couriers, isOpen } = this.props;

    return (
      <StyledCard>
        <StyledButton
          icon={isOpen ? 'caret-up' : 'caret-down'}
          fill
          large
          minimal
          onClick={this.toggleList}
        >
          Couriers
        </StyledButton>
        <Collapse isOpen={isOpen}>
          <Body>
            {couriers.map(this.renderRow)}
          </Body>
        </Collapse>
      </StyledCard>
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
  isOpen: PropTypes.bool,
  showCouriersList: PropTypes.func.isRequired,
  hideCouriersList: PropTypes.func.isRequired,
  pan: PropTypes.func.isRequired,
  setZoom: PropTypes.func.isRequired,
  requestActiveCourier: PropTypes.func.isRequired,
};

CouriersList.defaultProps = {
  couriers: [],
  isOpen: false,
};

export default CouriersList;

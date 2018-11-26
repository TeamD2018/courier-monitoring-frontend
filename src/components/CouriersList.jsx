import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Button, Card, Collapse, H5,
} from '@blueprintjs/core';
import StatusTag from './StatusTag';

const Body = styled.div`
  width: 100%;
  overflow: auto;
  
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

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0.5rem;
  min-height: 0;
  
  & .bp3-collapse {
    display: flex;
    min-height: 0;
  }
  
  & .bp3-collapse-body {
    display: flex;
    min-height: 0;
    width: 100%;
  }
`;

const StyledButton = styled(Button)`
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

    pan(courier.location);

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
        <H5>
          {courier.name}
          <StatusTag courier={courier} />
        </H5>
        <div>{`+${courier.phone}`}</div>
      </Row>
    );
  }

  render() {
    const { couriers, isOpen } = this.props;

    return (
      <StyledCard elevation={2}>
        <StyledButton
          icon={isOpen ? 'caret-up' : 'caret-down'}
          fill
          large
          minimal
          onClick={this.toggleList}
        >
          Курьеры
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
    lastSeen: PropTypes.number,
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

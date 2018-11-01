import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Button, Card, Collapse, Icon,
} from '@blueprintjs/core';

const WaypointsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  
  -webkit-overflow-scrolling: touch;
`;

const Waypoint = styled.div`
  width: 100%;
  padding: 0.8rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  
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

const StyledDiv = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 0.4rem;
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

class CourierDetails extends PureComponent {
  constructor(props) {
    super(props);

    this.toggleList = this.toggleList.bind(this);
  }

  toggleList() {
    const { isOpen, showOrderDetails, hideOrderDetails } = this.props;

    if (isOpen) {
      hideOrderDetails();
    } else {
      showOrderDetails();
    }
  }

  render() {
    const { pan, order, isOpen } = this.props;

    return (
      <StyledCard>
        <StyledButton
          icon={isOpen ? 'caret-up' : 'caret-down'}
          fill
          large
          minimal
          onClick={this.toggleList}
        >
          Courier Info
        </StyledButton>
        <Collapse isOpen={isOpen}>
          <WaypointsList>
            <Waypoint onClick={() => pan(order.source.point)}>
              <StyledDiv><Icon icon="home" /></StyledDiv>
              <div>{order.source.address}</div>
            </Waypoint>
            <Waypoint onClick={() => pan(order.destination.point)}>
              <StyledDiv><Icon icon="shop" /></StyledDiv>
              <div>{order.destination.address}</div>
            </Waypoint>
          </WaypointsList>
        </Collapse>
      </StyledCard>
    );
  }
}

CourierDetails.propTypes = {
  order: PropTypes.shape({
    destination: PropTypes.shape({
      point: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }).isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
    source: PropTypes.shape({
      point: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
      }),
      address: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  isOpen: PropTypes.bool,
  showOrderDetails: PropTypes.func.isRequired,
  hideOrderDetails: PropTypes.func.isRequired,
  pan: PropTypes.func.isRequired,
};

CourierDetails.defaultProps = {
  isOpen: true,
};

export default CourierDetails;

import React, { PureComponent } from 'react';
import { Popover, PopoverInteractionKind } from '@blueprintjs/core';

import styled from 'styled-components';
import PropTypes from 'prop-types';
import courierMarker from '../images/Courier.png';

const StyledDiv = styled.div`
  padding: 1rem;
`;

const StyledIcon = styled.img`
  width: 32px;
  cursor: pointer;
  position: absolute;
  transform: translate(-50%, -100%);
`;

class CourierMarker extends PureComponent {
  constructor(props) {
    super(props);
    this.exposeActiveCourier = this.exposeActiveCourier.bind(this);
  }

  exposeActiveCourier() {
    const {
      requestActiveCourier, courier, hideCouriersList, pan, resetActiveCourier,
    } = this.props;
    resetActiveCourier(courier.id);
    requestActiveCourier(courier.id, 0);
    hideCouriersList();

    pan({
      lat: courier.location.point.lat,
      lng: courier.location.point.lon,
    });
  }

  render() {
    const { courier } = this.props;

    return (
      <Popover
        interactionKind={PopoverInteractionKind.HOVER}
        transitionDuration={100}
        position="bottom"
      >
        <StyledIcon
          onClick={this.exposeActiveCourier}
          src={courierMarker}
        />
        <StyledDiv>
          <div className="bp3-text-large">{courier.name}</div>
          {courier.phone && <div className="bp3-text-muted">{`+${courier.phone}`}</div>}
        </StyledDiv>
      </Popover>
    );
  }
}

CourierMarker.propTypes = {
  courier: PropTypes.object.isRequired,
};

export default CourierMarker;

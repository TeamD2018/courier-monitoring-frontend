import React, { PureComponent } from 'react';
import { Popover, PopoverInteractionKind } from '@blueprintjs/core';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import courierMarker from '../images/Courier.png';
import busyCourierMarker from '../images/Busy courier.png';
import activeCourierMarker from '../images/Active courier.png';

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
  render() {
    const { courier, onClick, active } = this.props;

    let icon;
    if (active) {
      icon = activeCourierMarker;
    } else if (courier.ordersCount > 0) {
      icon = busyCourierMarker;
    } else {
      icon = courierMarker;
    }

    return (
      <Popover
        interactionKind={PopoverInteractionKind.HOVER}
        transitionDuration={100}
        position="bottom"
      >
        <StyledIcon
          onClick={() => onClick(courier)}
          src={icon}
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
  courier: PropTypes.shape({
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ordersCount: PropTypes.number.isRequired,
  }).isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

CourierMarker.defaultProps = {
  active: false,
  onClick: null,
};

export default CourierMarker;

import React, { PureComponent } from 'react';
import { Popover, PopoverInteractionKind } from '@blueprintjs/core';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import shopMarker from '../images/Shop.png';
import homeMarker from '../images/Home.png';

const StyledDiv = styled.div`
  padding: 1rem;
`;

const StyledIcon = styled.img`
  width: 32px;
  cursor: pointer;
  position: absolute;
  transform: translate(-50%, -100%);
`;

class OrderMarker extends PureComponent {
  render() {
    const { address, type } = this.props;
    return (
      <Popover
        interactionKind={PopoverInteractionKind.HOVER}
        transitionDuration={100}
        position="bottom"
      >
        <StyledIcon
          onClick={this.exposeActiveCourier}
          src={type ? homeMarker : shopMarker}
        />
        <StyledDiv className="bp3-text-large">{address}</StyledDiv>
      </Popover>
    );
  }
}

OrderMarker.propTypes = {
  address: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default OrderMarker;

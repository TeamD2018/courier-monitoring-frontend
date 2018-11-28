import React, { PureComponent } from 'react';
import { Popover, PopoverInteractionKind } from '@blueprintjs/core';
import styled from '@emotion/styled';
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
    const { address, type, onClick } = this.props;
    return (
      <Popover
        interactionKind={PopoverInteractionKind.HOVER}
        transitionDuration={100}
        position="bottom"
      >
        <StyledIcon
          src={type ? homeMarker : shopMarker}
          onClick={onClick}
        />
        <StyledDiv className="bp3-text-large">{address}</StyledDiv>
      </Popover>
    );
  }
}

OrderMarker.propTypes = {
  address: PropTypes.string.isRequired,
  type: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

OrderMarker.defaultProps = {
  onClick: null,
};

export default OrderMarker;

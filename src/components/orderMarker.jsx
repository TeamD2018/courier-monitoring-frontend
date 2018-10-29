import React, { PureComponent } from 'react';
import { Icon, Popover, PopoverInteractionKind } from '@blueprintjs/core';
import styled from 'styled-components';

const StyledDiv = styled.div`
  padding: 1rem;
`;

class OrderMarker extends PureComponent {
  render() {
    const { icon, address } = this.props;
    return (
      <Popover
        interactionKind={PopoverInteractionKind.HOVER}
        transitionDuration={100}
        position="bottom"
      >
        <Icon
          icon={icon}
          iconSize={32}
        />
        <StyledDiv className="bp3-text-large">{address}</StyledDiv>
      </Popover>
    );
  }
}

export default OrderMarker;

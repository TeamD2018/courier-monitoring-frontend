import React, { PureComponent } from 'react';
import { Icon, Popover, PopoverInteractionKind } from '@blueprintjs/core';


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
        <div className="bp3-text-large">{address}</div>
      </Popover>
    );
  }
}

export default OrderMarker;

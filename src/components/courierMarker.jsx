import React, { PureComponent } from 'react';
import {
  Icon, Intent, Popover, PopoverInteractionKind,
} from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledDiv = styled.div`
  padding: 1rem;
`;

const StyledIcon = styled(Icon)`
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
      requestActiveCourier, courier, hideCouriersList, pan
    } = this.props;
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
          icon={IconNames.MAP_MARKER}
          intent={Intent.DANGER}
          iconSize={32}
        />
        <StyledDiv>
          <div className="bp3-text-large">{courier.name}</div>
          {courier.phone && <div className="bp3-text-muted">{courier.phone}</div>}
        </StyledDiv>
      </Popover>
    );
  }
}

CourierMarker.propTypes = {
  courier: PropTypes.object.isRequired,
};

export default CourierMarker;

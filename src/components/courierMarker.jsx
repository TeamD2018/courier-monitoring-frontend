import React, { Component } from 'react';
import { Icon, Intent, Popover, PopoverInteractionKind } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import styled from 'styled-components';
import PropTypes from 'prop-types';

class CourierMarker extends Component {
  render() {
    const { phone, name } = this.props;

    const StyledDiv = styled.div`
      padding: 1rem;
    `;

    const StyledIcon = styled(Icon)`
      cursor: pointer;
    `;

    return (
      <Popover interactionKind={PopoverInteractionKind.HOVER} transitionDuration={100}>
        <StyledIcon icon={IconNames.MAP_MARKER} intent={Intent.DANGER} iconSize={32} />
        <StyledDiv>
          <div className="bp3-text-large">{name}</div>
          { phone && <div className="bp3-text-muted">{phone}</div> }
        </StyledDiv>
      </Popover>
    );
  }
}

CourierMarker.propTypes = {
  phone: PropTypes.string,
  name: PropTypes.string.isRequired,
};

CourierMarker.defaultProps = {
  phone: null,
};

export default CourierMarker;

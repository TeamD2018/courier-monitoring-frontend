import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Portal } from '@blueprintjs/core';

const StyledPortal = styled(Portal)`
  display: flex;
  flex-direction: column;

  max-height: 100%;
  z-index: 0;

  flex-grow: 2;
  width: 20rem;
  
  padding: 0.5rem;
  
  @media only screen and (max-device-width: 667px) 
                     and (-webkit-min-device-pixel-ratio: 2)
                     and (orientation: portrait) { 
    width: 100%;
  }
  
  @media only print {
    display: none;
  }
`;

class Sidebar extends PureComponent {
  render() {
    const { children } = this.props;
    return (
      <StyledPortal>
        {children}
      </StyledPortal>
    );
  }
}

Sidebar.propTypes = {
  children: PropTypes.node,
};

Sidebar.defaultProps = {
  children: [],
};

export default Sidebar;

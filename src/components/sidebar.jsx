import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Portal } from '@blueprintjs/core';

const StyledPortal = styled(Portal)`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 20rem;
  max-height: 100%;
  
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

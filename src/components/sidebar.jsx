import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledDiv = styled.div`
  position: fixed;
  display: flex;
  flex-direction: column;

  top: 0;
  left: 0;

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
      <StyledDiv>
        {children}
      </StyledDiv>
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

import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledDiv = styled.div`
  overflow: hidden;
  position: fixed;
  z-index: 0;
  top: 0;
  left: 0;
  width: 20rem;
  height: 100vh;
  
  padding: 1rem;
`;

class Sidebar extends PureComponent {
  render() {
    const { children } = this.props;
    return <StyledDiv>{children}</StyledDiv>;
  }
}

Sidebar.propTypes = {
  children: PropTypes.node,
};

Sidebar.defaultProps = {
  children: [],
};

export default Sidebar;

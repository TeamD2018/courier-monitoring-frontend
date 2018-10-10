import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

class Sidebar extends Component {
  render() {
    const StyledDiv = styled.div`
            overflow: hidden;
            position: fixed;
            z-index: 0;
            top: 0;
            left: 0;
            width: 25rem;
            height: 100vh;
            
            padding: 10px;
            margin: 10px;
        `;

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

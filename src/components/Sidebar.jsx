/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';

const style = css`
  position: fixed;
  display: flex;
  flex-direction: column;

  top: 0;
  left: 0;

  max-height: 100%;
  z-index: 0;

  flex-grow: 2;
  width: 20rem;
  
  
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
      <div css={style}>
        {children}
      </div>
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

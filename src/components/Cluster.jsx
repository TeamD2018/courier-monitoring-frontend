import React, { PureComponent } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import cluster from '../images/Cluster.png';

const StyledIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
  position: absolute;
  transform: translate(-50%, -50%);
  
  font-weight: 900;
  
  background: url(${cluster}) no-repeat;
  background-size: contain;
`;

class Cluster extends PureComponent {
  render() {
    const { pointCount, onClick } = this.props;

    return (
      <StyledIcon onClick={onClick}>{pointCount}</StyledIcon>
    );
  }
}

Cluster.propTypes = {
  pointCount: PropTypes.number.isRequired,
  onClick: PropTypes.func,
};

Cluster.defaultProps = {
  onClick: null,
};

export default Cluster;

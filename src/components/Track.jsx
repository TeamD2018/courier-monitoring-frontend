import React from 'react';
import PropTypes from 'prop-types';

class Track extends React.PureComponent {
  componentWillUnmount() {
    this.line.setMap(null);
    this.line = null;
  }

  render() {
    if (this.line) {
      this.line.setMap(null);
    }

    const { maps, map, history } = this.props;
    const line = new maps.Polyline({
      path: history,
      strokeColor: '#9179F2',
      strokeOpacity: 1,
      strokeWeight: 2,
    });
    line.setMap(map);
    this.line = line;
    return null;
  }
}

Track.propTypes = {
  maps: PropTypes.shape({
    Polyline: PropTypes.func.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  map: PropTypes.any.isRequired,
  history: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  })).isRequired,
};

export default Track;

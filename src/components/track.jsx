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
    const lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: 1,
      scale: 2,
    };

    const { maps, map, history } = this.props;
    const line = new maps.Polyline({
      path: history,
      strokeColor: '#AB47BC',
      strokeOpacity: 0,
      icons: [{
        icon: lineSymbol,
        offset: '0',
        repeat: '15px',
      }],
      strokeWeight: 3,
    });
    line.setMap(map);
    this.line = line;
    return null;
  }
}

Track.propTypes = {
  maps: PropTypes.any.isRequired,
  map: PropTypes.any.isRequired,
  history: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  })).isRequired,
};


export default Track;

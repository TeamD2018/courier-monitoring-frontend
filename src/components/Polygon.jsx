import React from 'react';
import PropTypes from 'prop-types';

class Polygon extends React.PureComponent {
  componentWillUnmount() {
    this.polygon.setMap(null);
    this.polygon = null;
  }

  render() {
    if (this.polygon) {
      this.polygon.setMap(null);
    }

    const { maps, map, polygonPoints } = this.props;
    const polygon = new maps.Polygon({
      paths: polygonPoints,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.1,
    });
    polygon.setMap(map);
    this.polygon = polygon;
    return null;
  }
}

Polygon.propTypes = {
  maps: PropTypes.shape({
    Polyline: PropTypes.func.isRequired,
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  map: PropTypes.any.isRequired,
  polygonPoints: PropTypes.arrayOf(PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  })).isRequired,
};

export default Polygon;

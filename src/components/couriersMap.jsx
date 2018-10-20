import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import PropTypes from 'prop-types';
import CourierMarker from './courierMarker';

const MOCKBA = {
  lat: 55.751244,
  lng: 37.618423,
};
const KEY = process.env.API_KEY;
const DEFAULT_ZOOM = 13;
const TIMEOUT = 5000;

class CouriersMap extends Component {
  static createOptions(map) {
    return {
      fullscreenControl: false,
      mapTypeControl: false,
      panControl: false,
      streetViewControl: false,
      zoomControlOptions: { position: map.ControlPosition.RIGHT_CENTER },
    };
  }

  constructor(props) {
    super(props);
    this.onMove = this.onMove.bind(this);
    this.refreshMarkers = this.refreshMarkers.bind(this);
    this.renderCourierMarker = this.renderCourierMarker.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.refreshMarkers, TIMEOUT);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onMove({ center, bounds }) {
    const { pan } = this.props;
    pan(center);

    this.bounds = bounds;
    this.refreshMarkers();
  }

  refreshMarkers() {
    const topLeftLat = this.bounds.nw.lat;
    const topLeftLon = this.bounds.nw.lng;

    const bottomRightLat = this.bounds.se.lat;
    const bottomRightLon = this.bounds.se.lng;

    const { requestCouriersByBoxField } = this.props;
    requestCouriersByBoxField({
      topLeftLat,
      topLeftLon,
      bottomRightLat,
      bottomRightLon,
    });
  }

  renderCourierMarker(courier) {
    const { requestActiveCourier } = this.props;
    return (
      <CourierMarker
        key={courier.id}
        courierId={courier.id}
        lat={courier.location.point.lat}
        lng={courier.location.point.lon}
        requestActiveCourier={requestActiveCourier}
        name={courier.name}
        phone={`+${courier.phone}`}
      />
    );
  }

  render() {
    const { couriers, center } = this.props;

    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: KEY }}
        defaultCenter={MOCKBA}
        center={center}
        defaultZoom={DEFAULT_ZOOM}
        onChange={this.onMove}
        options={CouriersMap.createOptions}
      >
        {couriers.map(this.renderCourierMarker)}
      </GoogleMapReact>
    );
  }
}

CouriersMap.propTypes = {
  couriers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    lastSeen: PropTypes.string,
  })),
  requestCouriersByBoxField: PropTypes.func.isRequired,
  requestActiveCourier: PropTypes.func.isRequired,
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  pan: PropTypes.func.isRequired,
};

CouriersMap.defaultProps = {
  couriers: [],
};

export default CouriersMap;

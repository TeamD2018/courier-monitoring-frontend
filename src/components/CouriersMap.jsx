import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import PropTypes from 'prop-types';
import { IconNames } from '@blueprintjs/icons';
import CourierMarker from './CourierMarker';
import Track from './Track';
import OrderMarker from './OrderMarker';

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
    this.handleNativeApi = this.handleNativeApi.bind(this);
    this.exposeActiveCourier = this.exposeActiveCourier.bind(this);
    this.onOrderMarkerClick = this.onOrderMarkerClick.bind(this);
    this.renderCourierMarker = this.renderCourierMarker.bind(this);
    this.renderSourceMarker = this.renderSourceMarker.bind(this);
    this.renderDestMarker = this.renderDestMarker.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.refreshMarkers, TIMEOUT);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onMove({ center, bounds, zoom }) {
    const {
      pan, setZoom, mapCenter, mapZoom,
    } = this.props;

    if (zoom !== mapZoom) {
      setZoom(zoom);
    }

    if (center !== mapCenter) {
      pan(center);
    }

    this.bounds = bounds;
    this.refreshMarkers();
  }

  onOrderMarkerClick(location) {
    const { pan } = this.props;

    pan(location);
  }

  refreshMarkers() {
    const topLeftLat = this.bounds.nw.lat;
    const topLeftLon = this.bounds.nw.lng;

    const bottomRightLat = this.bounds.se.lat;
    const bottomRightLon = this.bounds.se.lng;

    const { requestCouriersByBoxField, requestActiveCourier } = this.props;
    requestCouriersByBoxField({
      topLeftLat,
      topLeftLon,
      bottomRightLat,
      bottomRightLon,
    });

    const { activeCourier } = this.props;
    if (activeCourier.requestedId) {
      requestActiveCourier(activeCourier.requestedId);
    }
  }

  exposeActiveCourier(courier) {
    const {
      requestActiveCourier, hideCouriersList, pan,
    } = this.props;

    requestActiveCourier(courier.id);
    hideCouriersList();

    pan(courier.location);
  }

  handleNativeApi({ maps, map }) {
    /* eslint-disable react/no-unused-state */
    this.setState({
      maps,
      map,
      mapLoaded: true,
    });
    /* eslint-enable react/no-unused-state */
  }

  renderCourierMarker(courier) {
    const { activeCourier } = this.props;

    return (
      <CourierMarker
        onClick={this.exposeActiveCourier}
        key={courier.id}
        lat={courier.location.lat}
        lng={courier.location.lng}
        courier={courier}
        active={activeCourier.courier && courier.id === activeCourier.courier.id}
      />
    );
  }

  renderSourceMarker(order) {
    return (
      <OrderMarker
        key={`${order.id}_src`}
        lat={order.source.lat}
        lng={order.source.lng}
        address={order.source.address}
        icon={IconNames.SHOP}
        onClick={() => this.onOrderMarkerClick(order.source)}
        type={false}
      />
    );
  }

  renderDestMarker(order) {
    return (
      <OrderMarker
        key={`${order.id}_dst`}
        lat={order.destination.lat}
        lng={order.destination.lng}
        onClick={() => this.onOrderMarkerClick(order.destination)}
        address={order.destination.address}
        type
      />
    );
  }

  render() {
    const {
      couriers, mapCenter, activeCourier, mapZoom,
    } = this.props;

    const { maps, map, mapLoaded } = (this.state || {});
    const orders = (activeCourier.courier && activeCourier.courier.orders) || [];
    return (
      <>
        <GoogleMapReact
          bootstrapURLKeys={{ key: KEY }}
          defaultCenter={MOCKBA}
          center={mapCenter}
          defaultZoom={DEFAULT_ZOOM}
          zoom={mapZoom}
          onChange={this.onMove}
          options={CouriersMap.createOptions}
          onGoogleApiLoaded={this.handleNativeApi}
          yesIWantToUseGoogleMapApiInternals
        >
          {couriers.map(this.renderCourierMarker)}
          {orders.map(this.renderSourceMarker)}
          {orders.map(this.renderDestMarker)}
        </GoogleMapReact>
        {mapLoaded && activeCourier.courier && activeCourier.courier.geoHistory && (
          <Track
            map={map}
            maps={maps}
            history={activeCourier.courier.geoHistory}
          />
        )}
      </>
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
    lastSeen: PropTypes.number,
  })),
  requestCouriersByBoxField: PropTypes.func.isRequired,
  requestActiveCourier: PropTypes.func.isRequired,
  mapCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  mapZoom: PropTypes.number.isRequired,
  pan: PropTypes.func.isRequired,
  setZoom: PropTypes.func.isRequired,
  activeCourier: PropTypes.shape({
    courier: PropTypes.shape({
      geoHistory: PropTypes.arrayOf(PropTypes.shape({
        lat: PropTypes.number,
        lon: PropTypes.number,
      })),
      courierId: PropTypes.string,
    }),
    requestedId: PropTypes.string,
  }),
  hideCouriersList: PropTypes.func.isRequired,
};

CouriersMap.defaultProps = {
  couriers: [],
  activeCourier: null,
};

export default CouriersMap;

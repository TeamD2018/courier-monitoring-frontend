import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import PropTypes from 'prop-types';
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

class SingleCourierMap extends Component {
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
    this.handleNativeApi = this.handleNativeApi.bind(this);
  }

  componentDidMount() {
    this.timer = setInterval(this.refreshMarkers, TIMEOUT);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onMove({ center, zoom }) {
    const {
      pan, setZoom, mapZoom, mapCenter,
    } = this.props;

    if (zoom !== mapZoom) {
      setZoom(zoom);
    }

    if (center !== mapCenter) {
      pan(center);
    }

    this.refreshMarkers();
  }

  refreshMarkers() {
    const {
      requestActiveCourierWithOnlyOrder, orderId, courierId,
    } = this.props;

    requestActiveCourierWithOnlyOrder(courierId, orderId);
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
    const { pan } = this.props;
    return (
      <CourierMarker
        key={courier.id}
        lat={courier.location.lat}
        lng={courier.location.lng}
        onClick={() => pan(courier.location)}
        courier={courier}
      />
    );
  }

  renderSourceMarker(order) {
    const { pan } = this.props;
    return (
      <OrderMarker
        key={`${order.id}_src`}
        lat={order.source.lat}
        lng={order.source.lng}
        address={order.source.address}
        type={false}
        onClick={() => pan(order.source)}
      />
    );
  }

  renderDestMarker(order) {
    const { pan } = this.props;
    return (
      <OrderMarker
        key={`${order.id}_dst`}
        lat={order.destination.lat}
        lng={order.destination.lng}
        address={order.destination.address}
        type
        onClick={() => pan(order.destination)}
      />
    );
  }

  render() {
    const { mapCenter, activeCourier, mapZoom } = this.props;
    const { maps, map, mapLoaded } = (this.state || {});

    return (
      <>
        <GoogleMapReact
          bootstrapURLKeys={{ key: KEY }}
          defaultCenter={MOCKBA}
          center={mapCenter}
          defaultZoom={DEFAULT_ZOOM}
          zoom={mapZoom}
          onChange={this.onMove}
          options={SingleCourierMap.createOptions}
          onGoogleApiLoaded={this.handleNativeApi}
          yesIWantToUseGoogleMapApiInternals
        >
          {activeCourier.courier && this.renderCourierMarker(activeCourier.courier)}
          {activeCourier.courier && this.renderDestMarker(activeCourier.courier.orders[0])}
          {activeCourier.courier && this.renderSourceMarker(activeCourier.courier.orders[0])}
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

SingleCourierMap.propTypes = {
  mapCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }).isRequired,
  pan: PropTypes.func.isRequired,
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
  orderId: PropTypes.string.isRequired,
  courierId: PropTypes.string.isRequired,
  activeOrder: PropTypes.shape({
    source: PropTypes.shape({
      address: PropTypes.string,
      point: PropTypes.shape({
        lat: PropTypes.number,
        lon: PropTypes.number,
      }),
    }),
    destination: PropTypes.shape({
      address: PropTypes.string,
      point: PropTypes.shape({
        lat: PropTypes.number,
        lon: PropTypes.number,
      }),
    }),
    orderNumber: PropTypes.number,
  }),
  requestActiveCourierWithOnlyOrder: PropTypes.func.isRequired,
  setZoom: PropTypes.func.isRequired,
  mapZoom: PropTypes.func.isRequired,
};

SingleCourierMap.defaultProps = {
  activeCourier: null,
  activeOrder: null,
};

export default SingleCourierMap;

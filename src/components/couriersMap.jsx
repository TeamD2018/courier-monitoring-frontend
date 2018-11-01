import React, { Component, Fragment } from 'react';
import GoogleMapReact from 'google-map-react';

import PropTypes from 'prop-types';
import { IconNames } from '@blueprintjs/icons';
import CourierMarker from './courierMarker';
import Track from './track';
import OrderMarker from './orderMarker';

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

  onMove({ center, bounds }) {
    const { pan } = this.props;
    pan(center);

    this.bounds = bounds;
    this.refreshMarkers();
  }

  onOrderMarkerClick(location) {
    const { pan } = this.props;

    pan({
      lat: location.lat,
      lng: location.lon,
    });
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
    if (activeCourier && activeCourier.id) {
      requestActiveCourier(activeCourier.id, 0);
    }
  }

  exposeActiveCourier(courier) {
    const {
      requestActiveCourier, hideCouriersList, pan,
    } = this.props;

    requestActiveCourier(courier.id, 0);
    hideCouriersList();

    pan({
      lat: courier.location.point.lat,
      lng: courier.location.point.lon,
    });
  }

  handleNativeApi({ maps, map }) {
    this.setState({
      maps,
      map,
      mapLoaded: true,
    });
  }

  renderCourierMarker(courier) {
    return (
      <CourierMarker
        onClick={this.exposeActiveCourier}
        key={courier.id}
        lat={courier.location.point.lat}
        lng={courier.location.point.lon}
        courier={courier}
      />
    );
  }

  renderSourceMarker(order) {
    return (
      <OrderMarker
        key={order.id}
        lat={order.source.point.lat}
        lng={order.source.point.lon}
        address={order.source.address}
        icon={IconNames.SHOP}
        onClick={() => this.onOrderMarkerClick(order.source.point)}
        type={false}
      />
    );
  }

  renderDestMarker(order) {
    return (
      <OrderMarker
        key={order.id}
        lat={order.destination.point.lat}
        lng={order.destination.point.lon}
        onClick={() => this.onOrderMarkerClick(order.destination.point)}
        address={order.destination.address}
        type
      />
    );
  }

  render() {
    const {
      couriers, center, activeCourier,
    } = this.props;

    const { maps, map, mapLoaded } = (this.state || {});
    const orders = (activeCourier && activeCourier.orders) || [];
    return (
      <Fragment>
        <GoogleMapReact
          bootstrapURLKeys={{ key: KEY }}
          defaultCenter={MOCKBA}
          center={center}
          defaultZoom={DEFAULT_ZOOM}
          onChange={this.onMove}
          options={CouriersMap.createOptions}
          onGoogleApiLoaded={this.handleNativeApi}
          yesIWantToUseGoogleMapApiInternals
        >
          {couriers.map(this.renderCourierMarker)}
          {orders.map(this.renderSourceMarker)}
          {orders.map(this.renderDestMarker)}
        </GoogleMapReact>
        {
          mapLoaded && activeCourier && activeCourier.geoHistory && (
            <Track
              map={map}
              maps={maps}
              history={activeCourier.geoHistory}
            />
          )
        }
      </Fragment>
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
  activeCourier: PropTypes.shape({
    geoHistory: PropTypes.arrayOf(PropTypes.shape({
      lat: PropTypes.number,
      lon: PropTypes.number,
    })),
    courierId: PropTypes.string,
  }),
  hideCouriersList: PropTypes.func.isRequired,
};

CouriersMap.defaultProps = {
  couriers: [],
  activeCourier: {},
};

export default CouriersMap;

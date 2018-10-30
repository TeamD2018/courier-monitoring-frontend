import React, { Component, Fragment } from 'react';
import GoogleMapReact from 'google-map-react';

import PropTypes from 'prop-types';
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

  onMove({ center, bounds }) {
    const { pan } = this.props;
    pan(center);

    this.bounds = bounds;
    this.refreshMarkers();
  }

  refreshMarkers() {
    const { requestActiveCourier } = this.props;

    const { activeCourier } = this.props;
    if (activeCourier && activeCourier.id) {
      requestActiveCourier(activeCourier.id, activeCourier.last_seen);
    } else {
      const { exposeActiveOrderInfo, orderId, courierId } = this.props;
      exposeActiveOrderInfo(courierId, orderId);
    }
  }


  handleNativeApi({ maps, map }) {
    this.setState({
      maps,
      map,
      mapLoaded: true,
    });
  }

  renderCourierMarker(courier) {
    const {
      requestActiveCourier, pan, resetActiveCourier,
    } = this.props;
    return (
      <CourierMarker
        key={courier.id}
        courierId={courier.id}
        lat={courier.location.point.lat}
        lng={courier.location.point.lon}
        requestActiveCourier={requestActiveCourier}
        resetActiveCourier={resetActiveCourier}
        pan={pan}
        courier={courier}
      />
    );
  }

  static renderSourceMarker(order) {

    return (
      <OrderMarker
        key={`${order.id}src`}
        lat={order.source.point.lat}
        lng={order.source.point.lon}
        address={order.source.address}
        isDest={false}
      />
    );
  }

  static renderDestMarker(order) {

    return (
      <OrderMarker
        key={`${order.id}dst`}
        lat={order.destination.point.lat}
        lng={order.destination.point.lon}
        address={order.destination.address}
        isDest
      />
    );
  }

  render() {
    const {
      center, activeCourier, activeOrder,
    } = this.props;
    const { maps, map, mapLoaded } = (this.state || {});

    return (
      <Fragment>
        <GoogleMapReact
          bootstrapURLKeys={{ key: KEY }}
          defaultCenter={MOCKBA}
          center={center}
          defaultZoom={DEFAULT_ZOOM}
          onChange={this.onMove}
          options={SingleCourierMap.createOptions}
          onGoogleApiLoaded={this.handleNativeApi}
          yesIWantToUseGoogleMapApiInternals
        >
          {activeCourier && this.renderCourierMarker(activeCourier)}
          {activeOrder && SingleCourierMap.renderDestMarker(activeOrder)}
          {activeOrder && SingleCourierMap.renderSourceMarker(activeOrder)}

        </GoogleMapReact>
        {
          mapLoaded && activeCourier && activeCourier.geoHistory
          && (
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

SingleCourierMap.propTypes = {

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
  exposeActiveOrderInfo: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
  courierId: PropTypes.string.isRequired,
  resetActiveCourier: PropTypes.func.isRequired,
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
    order_number: PropTypes.number,
  }),
};

SingleCourierMap.defaultProps = {
  activeCourier: null,
  activeOrder: null,
};

export default SingleCourierMap;

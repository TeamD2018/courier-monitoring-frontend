import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import Supercluster from 'supercluster';

import PropTypes from 'prop-types';
import CourierMarker from './CourierMarker';
import Track from './Track';
import OrderMarker from './OrderMarker';
import Cluster from './Cluster';
import Polygon from './Polygon';

const KEY = process.env.API_KEY;
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
    this.renderCourierMarker = this.renderCourierMarker.bind(this);
    CouriersMap.renderSourceMarker = CouriersMap.renderSourceMarker.bind(this);
    CouriersMap.renderDestMarker = CouriersMap.renderDestMarker.bind(this);
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

  refreshMarkers() {
    const topLeftLat = this.bounds.nw.lat;
    const topLeftLon = this.bounds.nw.lng;

    const bottomRightLat = this.bounds.se.lat;
    const bottomRightLon = this.bounds.se.lng;

    const {
      requestCouriersByBoxField,
      requestCouriersByPolygon,
      requestActiveCourier,
      polygonFilter,
    } = this.props;

    if (polygonFilter) {
      requestCouriersByPolygon(polygonFilter.osmID, polygonFilter.osmType, true);
    } else {
      requestCouriersByBoxField({
        topLeftLat,
        topLeftLon,
        bottomRightLat,
        bottomRightLon,
      }, true);
    }

    const { activeCourier } = this.props;
    if (activeCourier.requestedId) {
      requestActiveCourier(activeCourier.requestedId);
    }
  }

  exposeActiveCourier(courier) {
    const { requestActiveCourier, hideCouriersList } = this.props;

    requestActiveCourier(courier.id);
    hideCouriersList();
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

    if (courier.properties.cluster) {
      return (
        <Cluster
          key={courier.id}
          lng={courier.geometry.coordinates[0]}
          lat={courier.geometry.coordinates[1]}
          pointCount={courier.properties.point_count}
          cluster={courier.properties}
        />
      );
    }

    const oldCourier = courier.properties;

    return (
      <CourierMarker
        onClick={this.exposeActiveCourier}
        key={oldCourier.id}
        lat={oldCourier.location.lat}
        lng={oldCourier.location.lng}
        courier={oldCourier}
        active={activeCourier.courier && oldCourier.id === activeCourier.courier.id}
      />
    );
  }

  static renderSourceMarker(order) {
    return (
      <OrderMarker
        key={`${order.id}_src`}
        lat={order.source.lat}
        lng={order.source.lng}
        address={order.source.address}
        type={false}
      />
    );
  }

  static renderDestMarker(order) {
    return (
      <OrderMarker
        key={`${order.id}_dst`}
        lat={order.destination.lat}
        lng={order.destination.lng}
        address={order.destination.address}
        type
      />
    );
  }

  renderClusters(couriers) {
    if (this.bounds) {
      const geoJSONCouriers = couriers.map(courier => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [courier.location.lng, courier.location.lat],
        },
        properties: courier,
      }));

      const bbox = [
        this.bounds.nw.lng,
        this.bounds.se.lat,
        this.bounds.se.lng,
        this.bounds.nw.lat,
      ];

      const clusterizer = new Supercluster({
        radius: 80,
        maxZoom: 16,
      }).load(geoJSONCouriers);

      const { mapZoom } = this.props;
      const clusters = clusterizer.getClusters(bbox, mapZoom);

      return clusters.map(this.renderCourierMarker);
    }

    return [];
  }

  render() {
    const {
      couriers, mapCenter, activeCourier, mapZoom, polygonFilter,
    } = this.props;

    const { maps, map, mapLoaded } = (this.state || {});
    const orders = (activeCourier.courier && activeCourier.courier.orders) || [];
    return (
      <>
        <GoogleMapReact
          bootstrapURLKeys={{ key: KEY }}
          center={mapCenter}
          zoom={mapZoom}
          onChange={this.onMove}
          options={CouriersMap.createOptions}
          onGoogleApiLoaded={this.handleNativeApi}
          yesIWantToUseGoogleMapApiInternals
        >
          {this.renderClusters(couriers)}
          {orders.map(CouriersMap.renderSourceMarker)}
          {orders.map(CouriersMap.renderDestMarker)}
        </GoogleMapReact>
        {mapLoaded && activeCourier.courier && activeCourier.courier.geoHistory && (
          <Track
            map={map}
            maps={maps}
            history={activeCourier.courier.geoHistory}
          />
        )}
        {mapLoaded && polygonFilter && (
          <Polygon
            map={map}
            maps={maps}
            polygonPoints={polygonFilter.polygon}
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
  polygonFilter: PropTypes.shape({
    osmID: PropTypes.number.isRequired,
    osmType: PropTypes.string.isRequired,
    polygon: PropTypes.arrayOf(PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    })).isRequired,
  }),
  requestCouriersByBoxField: PropTypes.func.isRequired,
  requestCouriersByPolygon: PropTypes.func.isRequired,
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
  polygonFilter: null,
};

export default CouriersMap;

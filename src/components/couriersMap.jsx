import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

import CourierMarker from './courierMarker';

const MOSCOW = { lat: 55.751244, lng: 37.618423 };
const KEY = 'AIzaSyCsvYa45nNh7NNLE_PUix8SOI73_HlcTX8';
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
  }

  componentDidMount() {
    this.timer = setInterval(this.refreshMarkers, TIMEOUT);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onMove({ center, bounds }) {
    this.bounds = bounds;
    this.refreshMarkers();

    const { lat, lng } = center;
    const { changeCenter } = this.props;
    changeCenter({ lat, lng });
  }

  refreshMarkers() {
    console.log('Markers refreshing...');

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


  render() {
    const { couriers } = this.props;

    return (
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: KEY }}
          defaultCenter={MOSCOW}
          defaultZoom={DEFAULT_ZOOM}
          onChange={this.onMove}
          options={CouriersMap.createOptions}
        >
          {couriers.map(courier => (
            <CourierMarker
              key={courier.id}
              lat={courier.location.point.lat}
              lng={courier.location.point.lon}
              name={courier.name}
              phone={`+${courier.phone}`}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default CouriersMap;

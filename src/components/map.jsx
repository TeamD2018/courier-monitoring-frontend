import React, { Component } from 'react';
import { Spinner } from '@blueprintjs/core';
import {
  withGoogleMap, GoogleMap, withScriptjs,
} from 'react-google-maps';
import styled from 'styled-components';

import Markers from '../containers/markers';

const MOSCOW = { lat: 55.751244, lng: 37.618423 };
const GOOGLE_API_URL = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCsvYa45nNh7NNLE_PUix8SOI73_HlcTX8';
const DEFAULT_ZOOM = 13;
const TIMEOUT = 5000;

const MAP_OPTIONS = {
  fullscreenControl: false,
  mapTypeControl: false,
  panControl: false,
  streetViewControl: false,
};

class Map extends Component {
  constructor(props) {
    super(props);

    this.onMove = this.onMove.bind(this);
    this.refreshMarkers = this.refreshMarkers.bind(this);

    this.mapRef = React.createRef();
  }

  componentDidMount() {
    this.timer = setInterval(this.refreshMarkers, TIMEOUT);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onMove() {
    this.refreshMarkers();
    const getCenter = this.mapRef.current.getCenter();

    const lat = getCenter.lat();
    const lng = getCenter.lng();
    const { changeCenter } = this.props;
    changeCenter({ lat, lng });
  }

  refreshMarkers() {
    console.log('Markers refreshing...');

    const bounds = this.mapRef.current.getBounds();

    const lat = bounds.f;
    const lon = bounds.b;

    const topLeftLat = lat.f;
    const topLeftLon = lon.b;

    const bottomRightLat = lat.b;
    const bottomRightLon = lon.f;

    const { requestCouriersByBoxField } = this.props;
    requestCouriersByBoxField({
      topLeftLat,
      topLeftLon,
      bottomRightLat,
      bottomRightLon,
    });
  }


  render() {
    const GoogleMapWrapper = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        defaultCenter={MOSCOW}
        defaultZoom={DEFAULT_ZOOM}
        ref={this.mapRef}
        defaultOptions={MAP_OPTIONS}
        onIdle={this.onMove}
      >
        <Markers />
      </GoogleMap>
    )));

    const StyledSpinner = styled(Spinner)`
        height: 100%;
        width: 100%;
        
        display: flex;
        align-items: center;
        justify-content: center;
    `;


    return (
      <GoogleMapWrapper
        googleMapURL={GOOGLE_API_URL}
        loadingElement={<StyledSpinner size={200} intent="primary" />}
        containerElement={<div />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    );
  }
}

export default Map;

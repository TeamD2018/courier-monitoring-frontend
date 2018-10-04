import React, { Component } from 'react';
import {Spinner} from "@blueprintjs/core";
import { withGoogleMap, GoogleMap, withScriptjs } from 'react-google-maps';
import styled from 'styled-components';

class Map extends Component {
    render() {
      const GoogleMapExample = withScriptjs(withGoogleMap(props => (
        <GoogleMap
          defaultCenter = { { lat: 55.751244, lng: 37.618423 } }
          defaultZoom = { 13 }
        >
        </GoogleMap>
      )));

      const Container = styled.div`
        height: 100%;
        width: 100%;
        margin: 0;
        padding: 0;
      `;

      return (
        <div>
          <GoogleMapExample
            googleMapURL='https://maps.googleapis.com/maps/api/js?key=AIzaSyCsvYa45nNh7NNLE_PUix8SOI73_HlcTX8'
            loadingElement={<Spinner />}
            containerElement={ <Container /> }
            mapElement={ <div style={{ height: `100%` }} /> }
          />
        </div>
      );
    }
};

export default Map;

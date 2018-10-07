import React, { Component } from 'react';
import { Marker } from 'react-google-maps';

import connect from "react-redux/es/connect/connect";

class Markers extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return this.props.couriers.map(courier => {
            const position = {
                lat: courier.location.point.lat,
                lng: courier.location.point.lon
            };

            return <Marker position={ position } />
        });
    }
}

const mapStateToProps = state => ({
    couriers: state.couriers,
    center: state.center,
});

export default connect(mapStateToProps)(Markers);

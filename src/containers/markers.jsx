import React, { Component } from 'react';
import { Marker } from 'react-google-maps';

import connect from "react-redux/es/connect/connect";

class Markers extends Component {
    constructor(props) {
        super(props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(event, object) {
        const info = `Name: ${object.name}\nPhone: ${object.phone}`;

        alert(info);
    }

    render() {
        return this.props.couriers.map(courier => {
            const position = {
                lat: courier.location.point.lat,
                lng: courier.location.point.lon
            };

            return (
                <Marker
                    position={ position }
                    onClick={ e => this.onClick(e, courier) }
                />
            );
        });
    }
}

const mapStateToProps = state => ({
    couriers: state.couriers,
    center: state.center,
});

export default connect(mapStateToProps)(Markers);

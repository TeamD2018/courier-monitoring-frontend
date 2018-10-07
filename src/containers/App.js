import React, { Component } from 'react';
import Map from './map.jsx';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as actions from '../actions';

class App extends Component {
    constructor (props) {
        super(props);

        this.boundActionCreators = bindActionCreators(actions, this.props.dispatch);
    }

    render() {
        return (
            <Map { ...this.boundActionCreators } />
        )
    }
}

const mapStateToProps = (state) => ({
    couriers: state.couriers,
    center: state.center,
});

export default connect(mapStateToProps)(App);

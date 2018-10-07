import React, { Component } from 'react';
import Map from '../components/map.jsx';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import {  HTMLTable, Card} from '@blueprintjs/core';
import styled from 'styled-components';

import * as actions from '../actions';
import Sidebar from '../components/sidebar';

class App extends Component {
    constructor (props) {
        super(props);

        this.boundActionCreators = bindActionCreators(actions, this.props.dispatch);
    }

    render() {

        const StyledHTMLTable = styled(HTMLTable)`
            width: 100%;
        `;

        return (
            <div>
                <Map { ...this.boundActionCreators } />
                <Sidebar>
                    <Card>
                        <StyledHTMLTable interactive={true}>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                { this.props.couriers.map(courier =>
                                     <tr>
                                         <td>{ courier.name }</td>
                                         <td>{ courier.phone }</td>
                                     </tr>
                                ) }
                            </tbody>

                        </StyledHTMLTable>
                    </Card>
                </Sidebar>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    couriers: state.couriers,
    center: state.center,
});

export default connect(mapStateToProps)(App);

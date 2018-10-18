import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CouriersMap from '../components/couriersMap';

import * as actions from '../actions';
import Sidebar from '../components/sidebar';
import CouriersList from '../components/couriersList';
import SearchBar from '../components/searchBar';

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    this.boundActionCreators = bindActionCreators(actions, dispatch);
  }


    const rows = couriers.map((courier) => {
      const d = new Date(courier.last_seen * 1000);

      return {
        name: courier.name,
        phone: `+${courier.phone}`,
        lastSeen: d.toLocaleString(),
        id: courier.id,
        location: courier.location,
      };
    });
  render() {
    const {
      couriers, center,
    } = this.props;

    return (
      <Fragment>
        <CouriersMap
          couriers={couriers}
          center={center}
          {...this.boundActionCreators}
        />
        <Sidebar>
          {rows.length > 0 && (
          <SearchBar {...this.boundActionCreators} />
              <CouriersList
                couriers={rows}
              />
          )}
        </Sidebar>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  couriers: state.couriers,
  center: state.center,
  highlightedRowId: state.highlightedRowId,
});

export default connect(mapStateToProps)(App);

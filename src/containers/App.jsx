import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CouriersMap from '../components/couriersMap';
import * as actions from '../actions';
import Sidebar from '../components/sidebar';
import CouriersList from '../components/couriersList';
import SearchBar from '../components/searchBar';
import CourierDetails from '../components/courierDetails';

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    this.boundActionCreators = bindActionCreators(actions, dispatch);
  }

  render() {
    const {
      couriers, center, isCouriersListOpen, activeCourier,
    } = this.props;

    return (
      <Fragment>
        <CouriersMap
          couriers={couriers}
          center={center}
          activeCourier={activeCourier}
          {...this.boundActionCreators}
        />
        <Sidebar>
          <SearchBar {...this.boundActionCreators} />
          {
            couriers.length > 0 && (
              <CouriersList
                isOpen={isCouriersListOpen}
                couriers={couriers}
                activeCourier={activeCourier}
                {...this.boundActionCreators}
              />
            )
          }
          {
            activeCourier && (
              <CourierDetails
                courier={activeCourier}
                {...this.boundActionCreators}
              />
            )
          }
        </Sidebar>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  couriers: state.couriers,
  activeCourier: state.activeCourier,
  center: state.map.center,
  isCouriersListOpen: state.couriersList.isOpen,
});

export default connect(mapStateToProps)(App);

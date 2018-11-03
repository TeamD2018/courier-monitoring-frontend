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
      couriers, mapCenter, mapZoom, isCouriersListOpen, areCourierDetailsOpen, activeCourier,
    } = this.props;

    return (
      <Fragment>
        <CouriersMap
          couriers={couriers}
          mapCenter={mapCenter}
          mapZoom={mapZoom}
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
                {...this.boundActionCreators}
              />
            )
          }
          {
            activeCourier.courier && (
              <CourierDetails
                courier={activeCourier.courier}
                isFetching={activeCourier.isFetching}
                isOpen={areCourierDetailsOpen}
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
  mapCenter: state.map.center,
  isCouriersListOpen: state.couriersList.isOpen,
  areCourierDetailsOpen: state.courierDetails.isOpen,
  mapZoom: state.map.zoom,
});

export default connect(mapStateToProps)(App);

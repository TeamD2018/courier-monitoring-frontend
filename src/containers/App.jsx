import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CouriersMap from '../components/CouriersMap';
import * as actions from '../actions';
import Sidebar from '../components/Sidebar';
import CouriersList from '../components/CouriersList';
import SearchBar from '../components/SearchBar';
import CourierDetails from '../components/CourierDetails';
import ErrorCallout from '../components/ErrorCallout';
import OnlyFreeCouriersSwitchCard from '../components/OnlyFreeCouriersSwitchCard';
import PolygonFilterCard from '../components/PolygonFilterCard';

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    this.boundActionCreators = bindActionCreators(actions, dispatch);
  }

  render() {
    const {
      couriers,
      mapCenter,
      mapZoom,
      isCouriersListOpen,
      areCourierDetailsOpen,
      activeCourier,
      error,
      showOnlyFreeCouriers,
      polygonFilter,
    } = this.props;

    const filteredCouriers = showOnlyFreeCouriers
      ? couriers.filter(courier => courier.ordersCount === 0)
      : couriers;

    return (
      <>
        <CouriersMap
          couriers={filteredCouriers}
          mapCenter={mapCenter}
          mapZoom={mapZoom}
          activeCourier={activeCourier}
          polygonFilter={polygonFilter}
          {...this.boundActionCreators}
        />
        <Sidebar>
          <SearchBar {...this.boundActionCreators} />
          <OnlyFreeCouriersSwitchCard
            checked={showOnlyFreeCouriers}
            onChange={showOnlyFreeCouriers
              ? this.boundActionCreators.resetShowOnlyFreeCouriersFlag
              : this.boundActionCreators.setShowOnlyFreeCouriersFlag
            }
          />
          {polygonFilter && (
            <PolygonFilterCard
              resetPolygonFilter={this.boundActionCreators.resetPolygonFilter}
              name={polygonFilter.name}
            />
          )}
          {filteredCouriers.length > 0 && (
            <CouriersList
              isOpen={isCouriersListOpen}
              couriers={filteredCouriers}
              {...this.boundActionCreators}
            />
          )}
          {activeCourier.courier && (
            <CourierDetails
              courier={activeCourier.courier}
              isFetching={activeCourier.isFetching}
              isOpen={areCourierDetailsOpen}
              {...this.boundActionCreators}
            />
          )}
        </Sidebar>
        {error.error && (
          <ErrorCallout errorMessage={error.errorMessage} errorName={error.errorName} />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  couriers: state.couriers.couriers,
  showOnlyFreeCouriers: state.couriers.showOnlyFreeCouriers,
  activeCourier: state.activeCourier,
  mapCenter: state.map.center,
  isCouriersListOpen: state.couriersList.isOpen,
  areCourierDetailsOpen: state.courierDetails.isOpen,
  mapZoom: state.map.zoom,
  error: state.error,
  polygonFilter: state.couriers.polygonFilter,
});

export default connect(mapStateToProps)(App);

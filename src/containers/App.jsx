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
    } = this.props;

    return (
      <>
        <CouriersMap
          couriers={couriers}
          mapCenter={mapCenter}
          mapZoom={mapZoom}
          activeCourier={activeCourier}
          showOnlyFreeCouriers={showOnlyFreeCouriers}
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
          {couriers.length > 0 && (
            <CouriersList
              isOpen={isCouriersListOpen}
              couriers={couriers}
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
});

export default connect(mapStateToProps)(App);

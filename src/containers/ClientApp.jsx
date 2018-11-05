import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SingleCourierMap from '../components/SingleCourierMap';
import * as actions from '../actions';
import Sidebar from '../components/Sidebar';
import CourierDetails from '../components/CourierDetails';

class ClientApp extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    this.boundActionCreators = bindActionCreators(actions, dispatch);
  }

  render() {
    const {
      mapCenter, mapZoom, activeCourier, orderId, courierId, activeOrder,
    } = this.props;

    return (
      <>
        <SingleCourierMap
          mapCenter={mapCenter}
          mapZoom={mapZoom}
          activeCourier={activeCourier}
          activeOrder={activeOrder}
          courierId={courierId}
          orderId={orderId}
          {...this.boundActionCreators}
        />
        <Sidebar>
          {
            activeCourier.courier && (
              <CourierDetails
                courier={activeCourier.courier}
                isFetching={activeCourier.isFetching}
                {...this.boundActionCreators}
              />
            )
          }
        </Sidebar>
      </>
    );
  }
}

const mapStateToProps = state => ({
  activeCourier: state.activeCourier,
  mapCenter: state.map.center,
  mapZoom: state.map.zoom,
});

export default connect(mapStateToProps)(ClientApp);

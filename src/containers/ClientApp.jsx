import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SingleCourierMap from '../components/singleCourierMap';
import * as actions from '../actions';
import Sidebar from '../components/sidebar';
import CourierDetails from '../components/courierDetails';

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
      <Fragment>
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
  activeCourier: state.activeCourier,
  mapCenter: state.map.center,
  mapZoom: state.map.zoom,
});

export default connect(mapStateToProps)(ClientApp);

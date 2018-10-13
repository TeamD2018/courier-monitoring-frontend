import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card } from '@blueprintjs/core';
import styled from 'styled-components';
import CourierMap from '../components/couriersMap';

import * as actions from '../actions';
import Sidebar from '../components/sidebar';
import Table from '../components/table';

const StyledCard = styled(Card)`
  margin: 0;
  padding: 0;
  max-height: 100%;
  overflow: auto;
`;

class App extends Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;
    this.boundActionCreators = bindActionCreators(actions, dispatch);
  }


  static onRowClick(event, row) {
    const info = `Name: ${row.Name}\nPhone: ${row.Phone}`;

    alert(info);
  }

  static extractRowID(row) {
    return row.id;
  }

  render() {
    const { couriers, highlightedRowId } = this.props;

    const headers = ['Name', 'Phone', 'Last seen'];
    const rows = couriers.map((courier) => {
      const d = new Date(courier.last_seen * 1000);

      return {
        Name: courier.name,
        Phone: `+${courier.phone}`,
        'Last seen': d.toLocaleString(),
        id: courier.id,
      };
    });

    return (
      <div>
        <CourierMap couriers={couriers} {...this.boundActionCreators} />
        <Sidebar>
          {rows.length > 0 && (
            <StyledCard>
              <Table
                headers={headers}
                rows={rows}
                // onRowClick={App.onRowClick}
                rowId={App.extractRowID}
                highlightedRowId={highlightedRowId}
              />
            </StyledCard>
          )}
        </Sidebar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  couriers: state.couriers,
  center: state.center,
  highlightedRowId: state.highlightedRowId,
});

export default connect(mapStateToProps)(App);

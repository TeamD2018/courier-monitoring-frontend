import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { HTMLTable, Card } from '@blueprintjs/core';
import styled from 'styled-components';
import Map from '../components/map.jsx';

import * as actions from '../actions';
import Sidebar from '../components/sidebar';
import Table from '../components/table';

class App extends Component {
  constructor(props) {
    super(props);

    this.boundActionCreators = bindActionCreators(actions, this.props.dispatch);
  }


  onRowClick(event, row) {
    const info = `Name: ${row.Name}\nPhone: ${row.Phone}`;

    alert(info);
  }

  render() {
    const StyledCard = styled(Card)`
            margin: 0;
            padding: 0;
        `;

    const StyledHTMLTable = styled(HTMLTable)`
            width: 100%;
        `;

    const headers = ['Name', 'Phone', 'Last seen'];
    const rows = this.props.couriers.map((courier) => {
      const d = new Date(courier.last_seen * 1000);

      return {
        Name: courier.name,
        Phone: `+${courier.phone}`,
        'Last seen': d.toLocaleString(),
      };
    });

    return (
      <div>
        <Map {...this.boundActionCreators} />
        <Sidebar>
          {rows.length > 0
                        && (
                        <StyledCard>
                          <Table headers={headers} rows={rows} onRowClick={this.onRowClick} />
                        </StyledCard>
                        )
                    }
        </Sidebar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  couriers: state.couriers,
  center: state.center,
});

export default connect(mapStateToProps)(App);

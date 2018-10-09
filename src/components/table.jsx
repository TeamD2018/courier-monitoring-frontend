import React, { Component } from 'react';
import styled from 'styled-components';
import { HTMLTable } from '@blueprintjs/core';
import PropTypes from 'prop-types';

class Table extends Component {
  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);
  }

  renderRow(row) {
    const {
      onRowClick, rowId, headers, highlightedRowId,
    } = this.props;

    const renderedHeaders = headers.map(header => <td key={header}>{ row[header] }</td>);

    if (rowId(row) === highlightedRowId) {
      const HighlightedTR = styled.tr`
        font-weight: bold,
      `;

      return (
        <HighlightedTR key={rowId(row)} id={rowId(row)} onClick={e => onRowClick(e, row)}>
          { renderedHeaders}
        </HighlightedTR>
      );
    }

    return (
      <tr key={rowId(row)} id={rowId(row)} onClick={e => onRowClick(e, row)}>{ renderedHeaders}</tr>
    );
  }

  render() {
    const StyledHTMLTable = styled(HTMLTable)`
        width: 100%;
    `;


    const { headers, rows } = this.props;
    return (
      <StyledHTMLTable interactive>
        <thead><tr>{ headers.map(header => <th key={header}>{ header }</th>)}</tr></thead>
        <tbody>{ rows.map(this.renderRow) }</tbody>
      </StyledHTMLTable>
    );
  }
}

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  rows: PropTypes.arrayOf(PropTypes.PropTypes.objectOf(PropTypes.node)).isRequired,
  onRowClick: PropTypes.func,
  rowId: PropTypes.func,
  highlightedRowId: PropTypes.string,
};

Table.defaultProps = {
  onRowClick: () => {},
  rowId: () => {},
  highlightedRowId: '',
};

export default Table;

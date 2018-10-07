import React, { Component } from 'react';
import styled from 'styled-components';
import { HTMLTable } from '@blueprintjs/core';

class Table extends Component {
    render() {
        const StyledHTMLTable = styled(HTMLTable)`
            width: 100%;
        `;

        return (
            <StyledHTMLTable interactive={true}>
                <thead>
                    <tr>{ this.props.headers.map(header => <th>{ header }</th>)}</tr>
                </thead>
                <tbody>
                    { this.props.rows.map(row =>
                        <tr onClick={ (e) => this.props.onRowClick(e, row) }>
                            { this.props.headers.map(header => <td>{ row[header] }</td>) }
                        </tr>
                    ) }
                </tbody>
            </StyledHTMLTable>
        );
    }
}

export default Table;

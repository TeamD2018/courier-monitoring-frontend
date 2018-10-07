import React, { Component } from 'react';
import styled from 'styled-components';

export default class Sidebar extends Component {

    render() {
        const StyledDiv = styled.div`
            overflow: scroll;
            position: fixed;
            z-index: 0;
            top: 0;
            left: 0;
            width: 25rem;
            
            padding: 10px;
            margin: 10px;
        `;

        return <StyledDiv>{this.props.children}</StyledDiv>;
    }
}
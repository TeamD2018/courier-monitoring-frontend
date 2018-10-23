import {
  Button, Card, Collapse,
} from '@blueprintjs/core';
import React, { PureComponent } from 'react';
import styled from 'styled-components';


const StyledCard = styled(Card)`
  overflow: hidden;
  flex-grow: 1;
  margin: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 0.3rem;
`;


const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

class CourierCard extends PureComponent {
  static renderOrder(order) {
    return (
      <Row key={order.id}>
        <p>
          {order.source.address}
        </p>
        <p>
          {order.destination.address}
        </p>
      </Row>
    );
  }


  render() {
    const {
      activeCourier, isOpen, disableActiveCourier, pan,
    } = this.props;
    const orders = activeCourier.orders || [];
    const ordersNumber = orders.length;
    return (
      <Collapse isOpen={isOpen}>
        <StyledCard interactive={false} onClick={() => pan(activeCourier.location)}>

          <Row>
            <span>{activeCourier.name}</span>
            {' '}
            <Button
              onClick={() => disableActiveCourier()}
              icon="cross"
            />
            {' '}

          </Row>
          <Row>{activeCourier.phone}</Row>
          <Row>
            Активных заказов:
            {ordersNumber}
          </Row>
          {orders.map(CourierCard.renderOrder)}
        </StyledCard>
      </Collapse>);
  }
}

export default CourierCard;

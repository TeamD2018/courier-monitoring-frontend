import {
  Button, Card, Collapse, Icon,
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
  align-items: center;
  justify-content: space-between;
`;

const InfoText = styled.p`
  margin-left: 1rem;
  text-align: left;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

class CourierCard extends PureComponent {
  constructor(props) {
    super(props);

    this.renderOrder = this.renderOrder.bind(this);
  }

  renderOrder(order) {
    const { pan } = this.props;
    return (

      <Column key={order.id}>
        <Row onClick={() => pan(order.source.point)}>
          <Icon icon="shop"/>
          <InfoText className="bp3-text-small">
            {order.source.address}
          </InfoText>
        </Row>
        <Row onClick={() => pan(order.destination.point)}>
          <Icon icon={'home'}/>
          <InfoText className="bp3-text-small">
            {order.destination.address}
          </InfoText>
        </Row>
      </Column>

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
            <h4>{activeCourier.name}</h4>

            <Button
              onClick={() => disableActiveCourier()}
              icon="cross"
              minimal
            />


          </Row>
          <Row>{activeCourier.phone}</Row>
          <Row>
            Активных заказов:
            {ordersNumber}
          </Row>
          {orders.map(this.renderOrder)}
        </StyledCard>
      </Collapse>);
  }
}

export default CourierCard;

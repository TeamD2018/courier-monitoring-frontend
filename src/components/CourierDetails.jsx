import React, { Fragment, PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Button, Card, Collapse, Divider, H5, Icon, Classes,
} from '@blueprintjs/core';
import moment from 'moment';
import StatusTag from './StatusTag';

const SOURCE = false;
const DESTINATION = true;

const WaypointsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  
  -webkit-overflow-scrolling: touch;
`;

const Waypoint = styled.div`
  width: 100%;
  padding: 0.8rem;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  
  &:nth-of-type(even) {
    background: rgba(191, 204, 214, 0.15);
  }
  
  &:hover {
    background: rgba(191, 204, 214, 0.3);
  }
  
  &:active {
    background: rgba(191, 204, 214, 0.5);
  }
`;

const CourierInfo = styled.div`
  width: 100%;
  padding: 0.8rem;
`;

const Title = styled(H5)`
  cursor: pointer;
`;

const StyledDiv = styled.div`
  margin: auto 0.4rem auto 0;
`;

const StyledCard = styled(Card)`
  padding: 0;
  margin: 0.5rem;
  overflow: auto;
`;

const BoldDiv = styled.div`
  font-weight: bold;
`;

const StyledButton = styled(Button)`
  position: sticky;
  top: 0;
  background: rgba(255, 255, 255, 1) none !important;
  z-index: 100;
`;


class CourierDetails extends PureComponent {
  constructor(props) {
    super(props);
    moment.locale('ru');
    this.state = {
      relativeLastSeen: true,
    };

    this.toggleList = this.toggleList.bind(this);
    this.renderWaypoints = this.renderWaypoints.bind(this);
    this.renderWaypoint = this.renderWaypoint.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
  }

  onRowClick(waypoint) {
    const { pan, setZoom } = this.props;

    setZoom(13);
    pan(waypoint.location.point);
  }

  onCourierClick(courier) {
    const { setZoom, pan } = this.props;

    setZoom(13);
    pan({
      lat: courier.location.point.lat,
      lng: courier.location.point.lon,
    });
  }

  toggleList() {
    const { isOpen, showCourierDetails, hideCourierDetails } = this.props;

    if (isOpen) {
      hideCourierDetails();
    } else {
      showCourierDetails();
    }
  }

  renderWaypoint(waypoint) {
    const { isFetching } = this.props;

    return (
      <Waypoint
        key={`${waypoint.orderId}_${(waypoint.type ? 'dst' : 'src')}`}
        onClick={() => this.onRowClick(waypoint)}
      >
        <StyledDiv className={isFetching ? Classes.SKELETON : undefined}>
          <Icon icon={waypoint.type ? 'home' : 'shop'} />
        </StyledDiv>
        <div className={isFetching ? Classes.SKELETON : undefined}>
          {waypoint.type && (
            <BoldDiv>{`Заказ №${waypoint.orderNumber}`}</BoldDiv>
          )}
          {waypoint.location.address}
        </div>
      </Waypoint>
    );
  }

  renderWaypoints(orders) {
    const waypointsMap = new Map();

    orders.forEach((order) => {
      if (waypointsMap.has(order.source.address)) {
        waypointsMap.get(order.source.address).push(order);
      } else {
        waypointsMap.set(order.source.address, [order]);
      }
    });

    const waypoints = [];
    waypointsMap.forEach((ordersOfSource) => {
      waypoints.push({
        type: SOURCE,
        orderId: ordersOfSource[0].id,
        location: {
          address: ordersOfSource[0].source.address,
          point: {
            lat: ordersOfSource[0].source.point.lat,
            lng: ordersOfSource[0].source.point.lon,
          },
        },
      });

      ordersOfSource.forEach(order => waypoints.push({
        type: DESTINATION,
        orderId: order.id,
        orderNumber: order.order_number,
        created_at: order.created_at,
        location: {
          address: order.destination.address,
          point: {
            lat: order.destination.point.lat,
            lng: order.destination.point.lon,
          },
        },
      }));
    });

    return waypoints.map(this.renderWaypoint);
  }

  render() {
    const { courier, isOpen, isFetching } = this.props;
    const { relativeLastSeen } = this.state;

    /* eslint-disable jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-static-element-interactions */
    return (
      <StyledCard elevation={2}>
        <StyledButton
          icon={isOpen ? 'caret-up' : 'caret-down'}
          fill
          large
          minimal
          onClick={this.toggleList}
        >
          Информация
        </StyledButton>
        <Collapse isOpen={isOpen}>
          <CourierInfo>
            <Title
              className={isFetching ? Classes.SKELETON : undefined}
              onClick={() => this.onCourierClick(courier)}
            >
              {courier.name}
              <StatusTag courier={courier} />
            </Title>
            <div
              className={isFetching ? Classes.SKELETON : undefined}
              onClick={() => this.setState({ relativeLastSeen: !relativeLastSeen })}
            >
              {`Был активен ${relativeLastSeen
                ? moment.unix(courier.last_seen).startOf('second').fromNow()
                : moment.unix(courier.last_seen).format('HH:mm:ss DD.MM.YYYY')
              }`}
            </div>
            <div className={isFetching ? Classes.SKELETON : undefined}>
              {`+${courier.phone}`}
            </div>
          </CourierInfo>
          {courier.orders.length > 0 && (
            <Fragment>
              <Divider />
              <WaypointsList>
                {this.renderWaypoints(courier.orders)}
              </WaypointsList>
            </Fragment>
          )}
        </Collapse>
      </StyledCard>
    );
    /* eslint-enable jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-static-element-interactions */
  }
}

CourierDetails.propTypes = {
  courier: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    lastSeen: PropTypes.string,
  }).isRequired,
  isOpen: PropTypes.bool,
  showCourierDetails: PropTypes.func.isRequired,
  hideCourierDetails: PropTypes.func.isRequired,
  pan: PropTypes.func.isRequired,
  setZoom: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
};

CourierDetails.defaultProps = {
  isOpen: true,
  isFetching: false,
};

export default CourierDetails;

import React, { Fragment, PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Button, Card, Collapse, Divider, H5, Icon, Classes, Tag, Intent,
} from '@blueprintjs/core';

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
  cursor: pointer;
`;

const Title = styled(H5)`
  display: block;
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  word-wrap: normal;
`;

const Info = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
`;

const Phone = styled.div`
  flex-grow: 1;
  text-align: left;
`;

const LastSeen = styled.div`
  flex-grow: 1;
  text-align: right;
`;

const StyledDiv = styled.div`
  margin-top: auto;
  margin-bottom: auto;
  margin-right: 0.4rem;
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

const StyledTag = styled(Tag)`
  margin-left: 0.5rem;
`;

class CourierDetails extends PureComponent {
  constructor(props) {
    super(props);

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
        <StyledDiv className={isFetching && Classes.SKELETON}>
          <Icon icon={waypoint.type ? 'home' : 'shop'} />
        </StyledDiv>
        <div className={isFetching && Classes.SKELETON}>
          {
            waypoint.type && (
              <BoldDiv>{`№${waypoint.orderNumber}`}</BoldDiv>
            )
          }
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

    return (
      <StyledCard elevation={2}>
        <StyledButton
          icon={isOpen ? 'caret-up' : 'caret-down'}
          fill
          large
          minimal
          onClick={this.toggleList}
        >
          Courier Info
        </StyledButton>
        <Collapse isOpen={isOpen}>
          <CourierInfo
            onClick={() => this.onCourierClick(courier)}
          >
            <Title className={isFetching && Classes.SKELETON}>
              {courier.name}
              {
                courier.orders_count > 0
                  ? <StyledTag intent={Intent.WARNING}>Busy</StyledTag>
                  : <StyledTag intent={Intent.SUCCESS}>Free</StyledTag>
              }
            </Title>
            <Info>
              <Phone className={isFetching && Classes.SKELETON}>{`+${courier.phone}`}</Phone>
              <LastSeen className={isFetching && Classes.SKELETON}>
                {new Date(courier.last_seen * 1000).toLocaleString()}
              </LastSeen>
            </Info>
          </CourierInfo>
          {
            courier.orders && (
              <Fragment>
                <Divider />
                <WaypointsList>
                  {this.renderWaypoints(courier.orders)}
                </WaypointsList>
              </Fragment>
            )
          }
        </Collapse>
      </StyledCard>
    );
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

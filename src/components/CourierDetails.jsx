/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, Collapse, Divider, H5, Classes,
} from '@blueprintjs/core';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import ruLocale from 'date-fns/locale/ru';
import StatusTag from './StatusTag';

import home from '../images/home.svg';
import shop from '../images/shop.svg';

const SOURCE = false;
const DESTINATION = true;

const cardStyle = css`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0.5rem;
`;

const waypointListStyle = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  
  -webkit-overflow-scrolling: touch;
`;

const waypointStyle = css`
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

const courierInfoStyle = css`
  width: 100%;
  padding: 0.8rem;
`;

const titleStyle = css`
  cursor: pointer;
`;

const divStyle = css`
  margin: auto 0.4rem auto 0;
`;

const boldDivStyle = css`
  font-weight: bold;
`;

const buttonStyle = css`
  top: 0;
  background: rgba(255, 255, 255, 1) none !important;
  z-index: 100;
`;

const iconStyle = css`
  width: 1rem;
`;

class CourierDetails extends PureComponent {
  constructor(props) {
    super(props);

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
    pan(waypoint.location);
  }

  onCourierClick(courier) {
    const { setZoom, pan } = this.props;

    setZoom(13);
    pan(courier.location);
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

    /* eslint-disable jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-static-element-interactions */
    return (
      <div
        css={waypointStyle}
        key={`${waypoint.orderId}_${(waypoint.type ? 'dst' : 'src')}`}
        onClick={() => this.onRowClick(waypoint)}
      >
        <div css={divStyle} className={isFetching ? Classes.SKELETON : undefined}>
          <img
            css={iconStyle}
            alt={waypoint.type ? home : shop}
            src={waypoint.type ? home : shop}
          />
        </div>
        <div className={isFetching ? Classes.SKELETON : undefined}>
          {waypoint.type && (
            <div css={boldDivStyle}>{`Заказ №${waypoint.orderNumber}`}</div>
          )}
          {waypoint.location.address}
        </div>
      </div>
    );
    /* eslint-enable jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-static-element-interactions */
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
      waypoints.push(this.renderWaypoint({
        type: SOURCE,
        orderId: ordersOfSource[0].id,
        location: ordersOfSource[0].source,
      }));

      ordersOfSource.forEach(order => waypoints.push(this.renderWaypoint({
        type: DESTINATION,
        orderId: order.id,
        orderNumber: order.orderNumber,
        createdAt: order.createdAt,
        location: order.destination,
      })));
    });

    return waypoints;
  }

  render() {
    const { courier, isOpen, isFetching } = this.props;
    const { relativeLastSeen } = this.state;

    const courierLastSeen = new Date(courier.lastSeen * 1000);

    /* eslint-disable jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-static-element-interactions */
    return (
      <Card css={cardStyle} elevation={2}>
        <Button
          css={buttonStyle}
          icon={isOpen ? 'caret-up' : 'caret-down'}
          fill
          large
          minimal
          onClick={this.toggleList}
        >
          Информация
        </Button>
        <Collapse isOpen={isOpen}>
          <div css={courierInfoStyle}>
            <H5
              css={titleStyle}
              className={isFetching ? Classes.SKELETON : undefined}
              onClick={() => this.onCourierClick(courier)}
            >
              {courier.name}
              <StatusTag courier={courier} />
            </H5>
            <div
              className={isFetching ? Classes.SKELETON : undefined}
              onClick={() => this.setState({ relativeLastSeen: !relativeLastSeen })}
            >
              {relativeLastSeen
                ? `Был активен ${distanceInWordsToNow(courierLastSeen, { locale: ruLocale })} назад`
                : `Был активен ${courierLastSeen.toLocaleString()}`
              }
            </div>
            <div className={isFetching ? Classes.SKELETON : undefined}>
              {`+${courier.phone}`}
            </div>
          </div>
          {courier.orders.length > 0 && (
            <>
              <Divider />
              <div css={waypointListStyle}>
                {this.renderWaypoints(courier.orders)}
              </div>
            </>
          )}
        </Collapse>
      </Card>
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
    lastSeen: PropTypes.number,
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

/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Button, Card, Collapse, H5,
} from '@blueprintjs/core';
import StatusTag from './StatusTag';

const bodyStyle = css`
  width: 100%;
  overflow: auto;
  
  -webkit-overflow-scrolling: touch;
`;

const rowStyle = css`
  width: 100%;
  padding: 0.8rem;
  cursor: pointer;
  
  &:nth-of-type(odd) {
    background: rgba(191, 204, 214, 0.15);
  }
  
  &:hover {
    background: rgba(191, 204, 214, 0.3);
  }
  
  &:active {
    background: rgba(191, 204, 214, 0.5);
  }
`;

const cardStyle = css`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0.5rem;
  min-height: 0;
  
  & .bp3-collapse {
    display: flex;
    min-height: 0;
  }
  
  & .bp3-collapse-body {
    display: flex;
    min-height: 0;
    width: 100%;
  }
`;

const buttonStyle = css`
  top: 0;
  background: rgba(255, 255, 255, 1) none !important;
  z-index: 100;
`;

class CouriersList extends PureComponent {
  constructor(props) {
    super(props);

    this.toggleList = this.toggleList.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.onRowClick = this.onRowClick.bind(this);
  }

  onRowClick(courier) {
    const {
      pan, hideCouriersList, requestActiveCourier, setZoom,
    } = this.props;

    pan(courier.location);

    setZoom(13);

    requestActiveCourier(courier.id, 0);
    hideCouriersList();
  }

  toggleList() {
    const { isOpen, showCouriersList, hideCouriersList } = this.props;

    if (isOpen) {
      hideCouriersList();
    } else {
      showCouriersList();
    }
  }

  renderRow(courier) {
    /* eslint-disable jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-static-element-interactions */
    return (
      <div
        css={rowStyle}
        key={courier.id}
        onClick={() => this.onRowClick(courier)}
      >
        <H5>
          {courier.name}
          <StatusTag courier={courier} />
        </H5>
        <div>{`+${courier.phone}`}</div>
      </div>
    );
    /* eslint-enable jsx-a11y/click-events-have-key-events,
      jsx-a11y/no-static-element-interactions */
  }

  render() {
    const { couriers, isOpen } = this.props;

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
          Курьеры
        </Button>
        <Collapse isOpen={isOpen}>
          <div css={bodyStyle}>
            {couriers.map(this.renderRow)}
          </div>
        </Collapse>
      </Card>
    );
  }
}

CouriersList.propTypes = {
  couriers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    phone: PropTypes.string,
    location: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number,
    }),
    lastSeen: PropTypes.number,
  })),
  isOpen: PropTypes.bool,
  showCouriersList: PropTypes.func.isRequired,
  hideCouriersList: PropTypes.func.isRequired,
  pan: PropTypes.func.isRequired,
  setZoom: PropTypes.func.isRequired,
  requestActiveCourier: PropTypes.func.isRequired,
};

CouriersList.defaultProps = {
  couriers: [],
  isOpen: false,
};

export default CouriersList;

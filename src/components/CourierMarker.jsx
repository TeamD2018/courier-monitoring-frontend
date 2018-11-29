/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { PureComponent } from 'react';
import { Popover, PopoverInteractionKind } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import courierMarker from '../images/Courier.png';
import busyCourierMarker from '../images/Busy courier.png';
import activeCourierMarker from '../images/Active courier.png';

const divStyle = css`
  padding: 1rem;
`;

const iconStyle = css`
  width: 2rem;
  cursor: pointer;
  position: absolute;
  transform: translate(-50%, -120%);
`;

class CourierMarker extends PureComponent {
  render() {
    const { courier, onClick, active } = this.props;

    let icon;
    if (active) {
      icon = activeCourierMarker;
    } else if (courier.ordersCount > 0) {
      icon = busyCourierMarker;
    } else {
      icon = courierMarker;
    }

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions,
      jsx-a11y/click-events-have-key-events */
    return (
      <Popover
        interactionKind={PopoverInteractionKind.HOVER}
        transitionDuration={100}
        position="bottom"
      >
        <img
          alt="Courier"
          css={iconStyle}
          onClick={() => onClick(courier)}
          src={icon}
        />
        <div css={divStyle}>
          <div className="bp3-text-large">{courier.name}</div>
          {courier.phone && <div className="bp3-text-muted">{`+${courier.phone}`}</div>}
        </div>
      </Popover>
    );
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions,
      jsx-a11y/click-events-have-key-events */
  }
}

CourierMarker.propTypes = {
  courier: PropTypes.shape({
    phone: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    ordersCount: PropTypes.number.isRequired,
  }).isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

CourierMarker.defaultProps = {
  active: false,
  onClick: null,
};

export default CourierMarker;

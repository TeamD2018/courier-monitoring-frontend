/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { PureComponent } from 'react';
import { Popover, PopoverInteractionKind } from '@blueprintjs/core';
import PropTypes from 'prop-types';
import shopMarker from '../images/Shop.png';
import homeMarker from '../images/Home.png';

const divStyle = css`
  padding: 1rem;
`;

const iconStyle = css`
  width: 32px;
  cursor: pointer;
  position: absolute;
  transform: translate(-50%, -100%);
`;

class OrderMarker extends PureComponent {
  render() {
    const { address, type, onClick } = this.props;

    /* eslint-disable jsx-a11y/no-noninteractive-element-interactions,
      jsx-a11y/click-events-have-key-events */
    return (
      <Popover
        interactionKind={PopoverInteractionKind.HOVER}
        transitionDuration={100}
        position="bottom"
      >
        <img
          alt={type ? 'Home' : 'Shop'}
          css={iconStyle}
          src={type ? homeMarker : shopMarker}
          onClick={onClick}
        />
        <div css={divStyle} className="bp3-text-large">{address}</div>
      </Popover>
    );
    /* eslint-enable jsx-a11y/no-noninteractive-element-interactions,
      jsx-a11y/click-events-have-key-events */
  }
}

OrderMarker.propTypes = {
  address: PropTypes.string.isRequired,
  type: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

OrderMarker.defaultProps = {
  onClick: null,
};

export default OrderMarker;

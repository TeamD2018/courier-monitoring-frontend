/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Intent, Tag } from '@blueprintjs/core';
import PropTypes from 'prop-types';


const tagStyle = css`
  margin-left: 0.5rem;
`;

const StatusTag = ({ courier }) => {
  const isBusy = courier.ordersCount > 0;

  return (
    <Tag css={tagStyle} intent={isBusy ? Intent.WARNING : Intent.SUCCESS}>
      {isBusy ? 'Занят' : 'Свободен'}
    </Tag>
  );
};

StatusTag.propTypes = {
  courier: PropTypes.shape({
    ordersCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default StatusTag;

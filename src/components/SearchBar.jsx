import React, { PureComponent } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import styled from 'styled-components';
import { Card } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import { getSuggestions } from '../api';

const StyledCard = styled(Card)`
  margin: 0.5rem;
  padding: 0.3rem;
  flex-grow: 0;
  & span.bp3-popover-target {
    width: 100%;
  }
`;

const customStyles = {
  menu: base => ({
    ...base,
    zIndex: '1000',
  }),
};

class SearchBar extends PureComponent {
  static promiseOptions(query) {
    return new Promise(async (resolve) => {
      if (query !== '') {
        try {
          const suggestions = await getSuggestions(query);

          const options = [
            {
              label: 'Курьеры',
              options: suggestions.couriers.map(suggestion => ({
                value: suggestion.id,
                label: suggestion.name,
                type: 'courier',
                ...suggestion,
              })),
            },
            {
              label: 'Места назначения',
              options: suggestions.orders.map(suggestion => ({
                value: suggestion.id,
                label: `№${suggestion.order_number}: ${suggestion.destination.address}`,
                type: 'order',
                ...suggestion,
              })),
            },
          ];

          resolve(options);
        } catch (e) {
          console.error(e);
        }
      } else {
        resolve([]);
      }
    });
  }

  constructor(props) {
    super(props);

    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(item) {
    const {
      requestActiveCourier, hideCouriersList, pan, setZoom,
    } = this.props;

    switch (item.type) {
      case 'courier':
        requestActiveCourier(item.id, 0);
        hideCouriersList();

        pan({
          lat: item.location.point.lat,
          lng: item.location.point.lon,
        });
        break;

      case 'order':
        requestActiveCourier(item.courier_id, 0);
        hideCouriersList();

        pan({
          lat: item.destination.point.lat,
          lng: item.destination.point.lon,
        });
        break;

      default:
        break;
    }

    setZoom(13);
  }

  render() {
    return (
      <StyledCard elevation={2}>
        <AsyncSelect
          loadOptions={SearchBar.promiseOptions}
          onChange={this.onItemClick}
          styles={customStyles}
          openMenuOnClick={false}
          loadingMessage={() => 'Поиск...'}
          noOptionsMessage={() => 'Ничего не нашлось'}
          placeholder="Курьеры, заказы, адреса..."
          value={null}
        />
      </StyledCard>
    );
  }
}

SearchBar.propTypes = {
  requestActiveCourier: PropTypes.func.isRequired,
  hideCouriersList: PropTypes.func.isRequired,
  pan: PropTypes.func.isRequired,
  setZoom: PropTypes.func.isRequired,
};


export default SearchBar;

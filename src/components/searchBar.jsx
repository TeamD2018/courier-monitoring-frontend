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
  constructor(props) {
    super(props);

    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(item) {
    const {
      requestActiveCourier, hideCouriersList, pan, resetActiveCourier,
    } = this.props;
    resetActiveCourier(item.courier.id);
    requestActiveCourier(item.courier.id, 0);
    hideCouriersList();

    pan({
      lat: item.courier.location.point.lat,
      lng: item.courier.location.point.lon,
    });
  }

  promiseOptions(query) {
    return new Promise(async (resolve) => {
      if (query !== '') {
        try {
          const suggestions = await getSuggestions(query);

          const options = suggestions.couriers.map(suggestion => ({
            value: suggestion.id,
            label: suggestion.name,
            courier: suggestion,
          }));

          resolve(options);
        } catch (e) {
          console.error(e);
        }
      } else {
        resolve([]);
      }
    });
  }

  render() {
    return (
      <StyledCard>
        <AsyncSelect
          loadOptions={this.promiseOptions}
          onChange={this.onItemClick}
          styles={customStyles}
          openMenuOnClick={false}
        />
      </StyledCard>
    );
  }
}

SearchBar.propTypes = {
  pan: PropTypes.func.isRequired,
  requestActiveCourier: PropTypes.func.isRequired,
  hideCouriersList: PropTypes.func.isRequired,
  resetActiveCourier: PropTypes.func.isRequired,
};


export default SearchBar;

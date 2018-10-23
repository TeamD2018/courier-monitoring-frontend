import React, { PureComponent } from 'react';
import styled from 'styled-components';
import {
  Card, Classes, MenuItem,
} from '@blueprintjs/core';

import { Suggest } from '@blueprintjs/select';
import * as api from '../api';

const SUGGESTIONS_COUNT = 5;

const StyledCard = styled(Card)`
  margin: 0.5rem;
  padding: 0.3rem;
  flex-grow: 0;
  & span.bp3-popover-target {
    width: 100%;
  }
`;

const StyledSuggest = styled(Suggest)`
  width: 100%;
`;

class SearchBar extends PureComponent {
  constructor(props) {
    super(props);

    this.onQueryChange = this.onQueryChange.bind(this);
    this.onItemClick = this.onItemClick.bind(this);
    this.itemRenderer = this.itemRenderer.bind(this);

    this.state = {
      suggestions: [],
    };
  }

  static inputValueRenderer(item) {
    return item.name;
  }

  onItemClick(courier) {
    const { pan } = this.props;

    pan({
      lat: courier.location.point.lat,
      lng: courier.location.point.lon,
    });
  }

  itemRenderer(item, itemProps) {
    return (
      <MenuItem
        key={item.id}
        text={item.name}
        label={item.phone}
        onClick={() => this.onItemClick(item)}
      />
    );
  }

  async onQueryChange(query, event) {
    if (query !== '') {
      try {
        const suggestions = await api.getSuggestions(query, SUGGESTIONS_COUNT);

        this.setState((state, props) => ({
          ...state,
          suggestions,
        }));
      } catch (e) {
        console.error(e);
      }
    } else {
      this.setState((state, props) => ({
        ...state,
        suggestions: [],
      }));
    }
  }

  render() {
    const { suggestions } = this.state;

    return (
      <StyledCard>
        <StyledSuggest
          onQueryChange={this.onQueryChange}
          inputProps={{
            fill: true,
            leftIcon: 'search',
          }}
          inputValueRenderer={SearchBar.inputValueRenderer}
          itemRenderer={this.itemRenderer}
          items={suggestions}
          popoverProps={{
            popoverClassName: Classes.MINIMAL,
          }}
          noResults={<MenuItem disabled text="No results." />}
          openOnKeyDown
        />
      </StyledCard>
    );
  }
}

export default SearchBar;

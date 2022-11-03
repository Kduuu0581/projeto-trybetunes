import React, { Component } from 'react';

class Search extends Component {
  state = {
    artist: '',
  };

  handleClick = () => {
    this.state({ artist: '' });
  };

  render() {
    const { artist } = this.state;
    const caracterMin = 2;
    return (
      <>
        <div data-testid="page-search">
          Search
        </div>
        <input
          type="text"
          data-testid="search-artist-input"
          value={ artist }
          onChange={ ({ target: { value } }) => {
            this.setState({ artist: value });
          } }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ artist.length < caracterMin }
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
      </>
    );
  }
}

export default Search;

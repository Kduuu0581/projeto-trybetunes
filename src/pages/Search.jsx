import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends Component {
  state = {
    artist: '',
    name: '',
    results: [],
    loading: false,
  };

  handleClick = async () => {
    const { artist } = this.state;
    this.setState({ artist: '', loading: true });
    const resultados = await searchAlbumsAPI(artist);
    this.setState({ results: resultados, loading: false });
  };

  render() {
    const { artist, results, name, loading } = this.state;
    const caracterMin = 2;
    return (
      <div data-testid="page-search">
        Search
        {!loading && (
          <>
            <input
              type="text"
              data-testid="search-artist-input"
              value={ artist }
              onChange={ ({ target: { value } }) => {
                this.setState({ artist: value, name: value });
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
        )}
        {loading && <Loading />}
        <div>
          {name.length >= 2 && results.length > 0 ? (
            <div>
              <p>{`Resultado de álbuns de: ${name}`}</p>
              {results.map((album, index) => (
                <div key={ `${album.artistId} ${index}` }>
                  <img src={ album.artworkUrl100 } alt={ album.artistName } />
                  <h2>{`Álbum ${album.trackCount} ${album.collectionName}`}</h2>
                  <p>{`Artista ${album.artistName}`}</p>
                  <Link
                    to={ `/album/${album.collectionId}` }
                    data-testid={ `link-to-album-${album.collectionId}` }
                  >
                    Álbum
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <h2>Nenhum álbum foi encontrado</h2>
          )}
        </div>
      </div>
    );
  }
}

export default Search;

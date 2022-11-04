import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    albums: [],
    artistName: '',
    albumName: '',
    albumImage: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const album = await getMusics(id);
    this.setState({
      albums: album,
      artistName: album[0].artistName,
      albumName: album[0].collectionName,
      albumImage: album[0].artworkUrl100,
    });
  }

  render() {
    const { albums, artistName, albumName, albumImage } = this.state;
    return (
      <div data-testid="page-album">
        <h2 data-testid="artist-name">{artistName}</h2>
        <h3 data-testid="album-name">{albumName}</h3>
        <img src={ albumImage } alt={ albumName } />
        {albums.slice(1).map((album) => (
          <div key={ album.collectionId }>
            <MusicCard
              trackName={ album.trackName }
              previewUrl={ album.previewUrl }
              trackId={ album.trackId }
              album={ album }
            />
          </div>
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Album;

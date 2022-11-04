import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    favoriteMusic: false,
  };

  async componentDidMount() {
    const { trackName } = this.props;
    const favoriteSong = await getFavoriteSongs();
    const favoritesList = [
      ...favoriteSong.map((favoriteSongs) => favoriteSongs.trackName)];
    if (favoritesList.includes(trackName)) {
      this.setState({ favoriteMusic: true });
    }
  }

  favoriteMusic = () => {
    const { album } = this.props;
    this.setState({ loading: true }, async () => {
      await addSong(album);
      this.setState({ loading: false, favoriteMusic: true });
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favoriteMusic, loading } = this.state;
    return (
      <div>
        {loading === true ? (
          <Loading />
        ) : (
          <div>
            <h1>{trackName}</h1>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
            </audio>
            <label htmlFor="favoriteMusic">
              Favorita
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                name="favoriteMusic"
                id="favoriteMusic"
                onChange={ this.favoriteMusic }
                checked={ favoriteMusic }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  album: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default MusicCard;

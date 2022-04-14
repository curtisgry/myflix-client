import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import FavoriteToggle from './favorite-toggle';

import './movie-card.scss';

class MovieCard extends Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
    };
  }

  componentDidMount() {
    this.checkIsFavorite();
  }

  componentDidUpdate(prevProps) {
    const { favorites } = this.props;
    if (prevProps.favorites === favorites) return;
    this.checkIsFavorite();
  }

  // Check movie id is in current favorites list from redux
  checkIsFavorite() {
    const { movie, favorites } = this.props;
    if (favorites.indexOf(movie._id) !== -1) {
      this.setState({
        isFavorite: true,
      });
    } else {
      this.setState({
        isFavorite: false,
      });
    }
  }

  render() {
    const { movie, variant, getFavorites } = this.props;
    const { isFavorite } = this.state;
    return (
      <Card className="movie-card shadow">
        {variant === 'profile' ? (
          ''
        ) : (
          <FavoriteToggle
            isFavorite={isFavorite}
            movieId={movie._id}
            getFavorites={getFavorites}
          />
        )}
        <img
          className="movie-card-image"
          alt={`A marketing poster for the movie ${movie.Title}`}
          src={`https://res.cloudinary.com/drghkywbx/image/upload/c_thumb,w_200/v1649103140/${movie.ImagePath}`}
          crossOrigin="anonymous"
        />

        <Link to={`/movies/${movie._id}`}>
          <div className="card-link-bg-animated">
            <Card.Title className="movie-card-title">{movie.Title}</Card.Title>
          </div>
        </Link>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
  }).isRequired,
  favorites: PropTypes.array.isRequired,
  variant: PropTypes.string,
  getFavorites: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { favorites } = state;
  return { favorites };
};

export default connect(mapStateToProps)(MovieCard);

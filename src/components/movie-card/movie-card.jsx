import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import FavoriteToggle from './favorite-toggle';

import './movie-card.scss';

export default class MovieCard extends Component {
  render() {
    const { movie, hasDescription, isFavorite, getFavorites, getUserInfo } =
      this.props;
    return (
      <Card>
        <FavoriteToggle
          isFavorite={isFavorite}
          movieId={movie._id}
          getFavorites={getFavorites}
          getUserInfo={getUserInfo}
        />
        <img
          className="card-image"
          alt={`A marketing poster for the movie ${movie.Title}`}
          src={`https://res.cloudinary.com/drghkywbx/image/upload/c_thumb,w_200/v1649103140/${movie.ImagePath}`}
          crossOrigin="anonymous"
        />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          {hasDescription ? <Card.Text>{movie.Description}</Card.Text> : ''}
          <Link to={`/movies/${movie._id}`}>
            <Button variant="link">Open</Button>
          </Link>
        </Card.Body>
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
  hasDescription: PropTypes.bool,
};

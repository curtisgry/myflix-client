import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import MovieCard from '../movie-card/movie-card';

import './profile-view.scss';

function FavoriteList({ favoriteMovies, removeFavorite }) {
  return (
    <>
      <h3>Favorites List</h3>
      {favoriteMovies.length < 1 ? (
        <span>No favorites.</span>
      ) : (
        <Row>
          {favoriteMovies.map((movie) => (
            <Col md={4} key={movie._id}>
              <div>
                <MovieCard movie={movie} variant="profile" />
                <Button
                  className="profile-remove-favorite-btn"
                  variant="link"
                  onClick={() => removeFavorite(movie._id)}
                >
                  <svg className="remove-icon" viewBox="0 0 460.775 460.775">
                    <path d="M285.08 230.397 456.218 59.27c6.076-6.077 6.076-15.911 0-21.986L423.511 4.565a15.55 15.55 0 0 0-21.985 0l-171.138 171.14L59.25 4.565a15.551 15.551 0 0 0-21.985 0L4.558 37.284c-6.077 6.075-6.077 15.909 0 21.986l171.138 171.128L4.575 401.505c-6.074 6.077-6.074 15.911 0 21.986l32.709 32.719a15.555 15.555 0 0 0 21.986 0l171.117-171.12 171.118 171.12a15.551 15.551 0 0 0 21.985 0l32.709-32.719c6.074-6.075 6.074-15.909 0-21.986L285.08 230.397z" />
                  </svg>
                </Button>
              </div>
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

FavoriteList.propTypes = {
  favoriteMovies: PropTypes.array,
  removeFavorite: PropTypes.func.isRequired,
};

export default FavoriteList;

import React from 'react';
import PropTypes from 'prop-types';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import MovieCard from '../movie-card/movie-card';

function FavoriteList({ favoriteMovies, getFavorites, getUserInfo }) {
  return (
    <>
      <h3>Favorites List</h3>
      {favoriteMovies.length < 1 ? (
        <span>No favorites.</span>
      ) : (
        <Row>
          {favoriteMovies.map((movie) => (
            <Col md={3} key={movie._id}>
              <MovieCard
                movie={movie}
                isFavorite
                getFavorites={getFavorites}
                getUserInfo={getUserInfo}
              />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
}

FavoriteList.propTypes = {
  favoriteMovies: PropTypes.array,
};

export default FavoriteList;

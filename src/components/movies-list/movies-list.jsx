import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import MovieCard from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = (state) => {
  const { visibilityFilter, favorites } = state;
  return { visibilityFilter, favorites };
};

function MoviesList(props) {
  const { movies, visibilityFilter, favorites, getFavorites } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  console.log(favorites);

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col md={12} style={{ margin: '1em' }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((m) =>
        favorites.indexOf(m._id) !== -1 ? (
          <Col md={3} key={m._id}>
            <MovieCard movie={m} isFavorite getFavorites={getFavorites} />
          </Col>
        ) : (
          <Col md={3} key={m._id}>
            <MovieCard
              movie={m}
              isFavorite={false}
              getFavorites={getFavorites}
            />
          </Col>
        )
      )}
    </>
  );
}

export default connect(mapStateToProps)(MoviesList);

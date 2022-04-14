import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';
import MovieCard from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

function MoviesList(props) {
  const { movies, visibilityFilter, favorites, getFavorites } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter((m) =>
      m.Title.toLowerCase().includes(visibilityFilter.toLowerCase())
    );
  }

  if (!movies) return <div className="main-view" />;

  return (
    <>
      <Col md={12} style={{ margin: '1em' }}>
        <VisibilityFilterInput visibilityFilter={visibilityFilter} />
      </Col>
      {filteredMovies.map((m) =>
        favorites.indexOf(m._id) !== -1 ? (
          <Col md={4} key={m._id}>
            <MovieCard movie={m} isFavorite getFavorites={getFavorites} />
          </Col>
        ) : (
          <Col className="mb-4" md={4} key={m._id}>
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

const mapStateToProps = (state) => {
  const { visibilityFilter, favorites } = state;
  return { visibilityFilter, favorites };
};

export default connect(mapStateToProps)(MoviesList);

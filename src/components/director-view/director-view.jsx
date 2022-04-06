import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import MovieCard from '../movie-card/movie-card';

export default function DirectorView({ director, directorMovies, onBackClick }) {
  return (
    <div>
      {director ? (
        <>
          <div>
            <h2>{director.Name}</h2>
            <p>{director.Bio}</p>
          </div>
          <Row>
            {directorMovies.map((movie) => (
              <Col md={3} key={movie._id}>
                <MovieCard movie={movie} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <div>All directors</div>
      )}
    </div>
  );
}

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Link } from 'react-router-dom';

function GenreViewAll({ movies }) {
  // Take directors out of movies into new Array
  // then get index of director in the new array and compare it to the current index
  // of the filter method. If the index matches it will return a single director
  // filtering out the duplicates.
  const genreList = movies
    .map((movie) => movie.Genre)
    .filter(
      (item, index, self) =>
        self.findIndex((gen) => gen.Name === item.Name) === index
    );

  return (
    <div>
      <Row>
        {genreList.map((genre) => (
          <Col lg={12} key={genre.name}>
            <h2>{genre.Name}</h2>
            <p>{genre.Description}</p>
            <Link to={`/genres/${genre.Name}`}>
              <Button variant="link">View Movies</Button>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
}

GenreViewAll.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default GenreViewAll;

import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function GenreViewAll({ movies }) {
  // Take directors out of movies into new Array
  // then get index of director in the new array and compare it to the current index
  // of the filter method. If the index matches it will return a single director
  // filtering out the duplicates.
  const genreList = movies
    .map((movie) => movie.Genre)
    .filter(
      (item, index, self) =>
        self.findIndex((gen) => gen.Name === item.Name) == index
    );

  return (
    <div>
      <Row>
        {genreList.map((genre) => (
          <Col lg={12} key={genre._id}>
            <p>{genre.Name}</p>
          </Col>
        ))}
      </Row>
    </div>
  );
}

import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import DirectorCard from '../director-card/director-card';

export default function DirectorsViewAll({ movies }) {
  // Take directors out of movies into new Array
  // then get index of director in the new array and compare it to the current index
  // of the filter method. If the index matches it will return a single director
  // filtering out the duplicates.
  const directorList = movies
    .map((movie) => movie.Director)
    .filter(
      (item, index, self) =>
        self.findIndex((dir) => dir.Name === item.Name) == index
    );

  return (
    <div>
      <Row>
        {directorList.map((director) => (
          <Col lg={12} key={director._id}>
            <DirectorCard director={director} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

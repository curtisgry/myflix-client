import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './movie-card.scss';

export default class MovieCard extends Component {
        render() {
                const { movie, onMovieClick } = this.props;
                return (
                        <Card>
                                <Card.Img
                                        className="card-image"
                                        variant="top"
                                        src={`https://res.cloudinary.com/drghkywbx/image/upload/c_thumb,w_200/v1649103140/${movie.ImagePath}`}
                                        crossOrigin="anonymous"
                                />
                                <Card.Body>
                                        <Card.Title>{movie.Title}</Card.Title>
                                        <Card.Text>{movie.Description}</Card.Text>
                                        <Button onClick={() => onMovieClick(movie)} variant="link">
                                                Open
                                        </Button>
                                </Card.Body>
                        </Card>
                );
        }
}

MovieCard.propTypes = {
        movie: PropTypes.shape({
                Title: PropTypes.string.isRequired,
                Description: PropTypes.string.isRequired,
                ImagePath: PropTypes.string.isRequired,
        }).isRequired,
        onMovieClick: PropTypes.func.isRequired,
};

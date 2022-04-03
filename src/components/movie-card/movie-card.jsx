import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MovieCard extends Component {
        render() {
                const { movie, onMovieClick } = this.props;
                return (
                        <div className="movie-card" onClick={() => onMovieClick(movie)}>
                                {movie.Title}
                        </div>
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

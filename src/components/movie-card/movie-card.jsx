import React, { Component } from 'react';

export default class MovieCard extends Component {
        render() {
                const { movie } = this.props;
                return <div className="movie-card">{movie.Title}</div>;
        }
}

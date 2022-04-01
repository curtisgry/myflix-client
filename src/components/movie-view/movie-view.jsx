/* eslint-disable */
import React, { Component } from 'react';

export default class MovieView extends Component {
        render() {
                const { movie, onBackClick } = this.props;
                return (
                        <div className="movie-view">
                                <div className="movie-poster">
                                        <img style={{width: '200px'}} src={movie.Image} />
                                </div>
                                <div className="movie-title">
                                        <span className="label">Title: </span>
                                        <span className="value">{movie.Title}</span>
                                </div>
                                <div className="movie-description">
                                        <span className="label">Description: </span>
                                        <span className="value">{movie.Description}</span>
                                </div>
                                <button type="button" onClick={() => onBackClick(null)}>
                                        Back
                                </button>
                        </div>
                );
        }
}
/* eslint-disable */
/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types'



export default class MovieView extends Component {

    keyPressCallback(event){
        console.log(event)
    }

    componentDidMount(){
        document.addEventListener('keydown', this.keyPressCallback)
    }

    componentWillUnmount(){
        document.removeEventListener('keydown', this.keyPressCallback)
    }

        render() {
                const { movie, onBackClick } = this.props;
                return (
                        <div className="movie-view">
                                <div className="movie-poster">
                                        <img src={`https://res.cloudinary.com/drghkywbx/image/upload/v1649103136/${movie.ImagePath}`} crossOrigin="anonymous" />
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


MovieView.propTypes = {
    movie: PropTypes.shape({
            Title: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
            ImagePath: PropTypes.string.isRequired,
    }).isRequired,
    onBackClick: PropTypes.func.isRequired,
};
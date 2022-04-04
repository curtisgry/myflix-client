/* eslint-disable */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Card from 'react-bootstrap/Card'


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
                      
                        <>
                        <Card>
                          <Card.Img className='movie-poster' variant="top" src={`https://res.cloudinary.com/drghkywbx/image/upload/v1649103136/${movie.ImagePath}`} crossOrigin="anonymous" />
                          <Card.Body>
                            <Card.Text>
                                <h2 className='movie-title'>{movie.Title}</h2>
                              {movie.Description}
                            </Card.Text>
                            <button type="button" onClick={() => onBackClick(null)}>
                                        Back
                                </button>
                          </Card.Body>
                        </Card>
                      </>
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
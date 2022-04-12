/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Button, Badge } from "react-bootstrap";

export default class MovieView extends Component {

  constructor(){
    super();
    this.state = {
      favoriteSuccess: false
    }
  }

  addToFavorites(user, movie){
    const userToken = localStorage.getItem('token');
    axios.post(`https://myflix-api-cgray.herokuapp.com/users/${user}/movies/${movie._id}`, null, {
      headers: { Authorization: `Bearer ${userToken}` }
    })
    .then(()=> {
      this.setState({
        favoriteSuccess: true
      })
    })
    .catch((e)=> {
      console.log('Something went wrong' + e)
    })
  }

 

  render() {
    const { movie, onBackClick, user } = this.props;
    

    return (
      <>
        <Card>
          <Card.Img
            className="movie-poster"
            variant="top"
            src={`https://res.cloudinary.com/drghkywbx/image/upload/v1649103136/${movie.ImagePath}`}
            crossOrigin="anonymous"
          />
          <Card.Body>
          <h2 className="movie-title">{movie.Title}</h2>
            <Card.Text>
              {movie.Description}
            </Card.Text>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">Director</Button>
            </Link>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">Genre</Button>
            </Link>
            <Button variant="link" onClick={() => onBackClick()}>
              Back
            </Button>
            <Button variant="success" onClick={() => this.addToFavorites(user, movie)}>Add to favorites</Button>
            {this.state.favoriteSuccess ? <Badge bg="success">Success!</Badge> : ''}
          </Card.Body>
        </Card>
      </>
    );
  }
}



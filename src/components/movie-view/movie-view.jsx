/* eslint-disable */
import React, { Component } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { Button, Badge } from "react-bootstrap";
import FavoriteToggle from '../movie-card/favorite-toggle';
import { connect } from "react-redux";

class MovieView extends Component {
  constructor() {
    super();
    this.state = {
      isFavorite: false,
    };
  }

  componentDidMount() {
    this.checkIsFavorite();
  }

  componentDidUpdate(prevProps) {
    const { favorites } = this.props;
    if (prevProps.favorites === favorites) return;
    this.checkIsFavorite();
  }

  // Check movie id is in current favorites list from redux
  checkIsFavorite() {
    const { movie, favorites } = this.props;
    if (favorites.indexOf(movie._id) !== -1) {
      this.setState({
        isFavorite: true,
      });
    } else {
      this.setState({
        isFavorite: false,
      });
    }
  }
  render() {
    const { movie, onBackClick, user, getFavorites } = this.props;
    
    const {isFavorite} = this.state

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
          <FavoriteToggle isFavorite={isFavorite} movieId={movie._id} user={user} getFavorites={getFavorites}/>
          </Card.Body>
        </Card>
      </>
    );
  }
}


const mapStateToProps = (state) => {
  const {favorites, user} = state;
  return{favorites, user}
}

export default connect(mapStateToProps)(MovieView)
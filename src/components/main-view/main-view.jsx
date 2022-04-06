import React, { Component } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import DirectorView from '../director-view/director-view';
import NavbarTop from '../navbar/navbar';
import DirectorsViewAll from '../directors-view-all/directors-view-all';

export default class MainView extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  // Used with click event on MovieCard and MovieView to change UI view
  setSelectedMovie(newSelectedMoive) {
    this.setState({ selectedMovie: newSelectedMoive });
  }

  getMovies(userToken) {
    axios
      .get('https://myflix-api-cgray.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        this.setState({
          movies: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Updates user property in state to the logged in user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  render() {
    const { movies, user } = this.state;

    // If no logged in user LoginView is rendered
    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // Empty container when no list is loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <NavbarTop />
        <Row className="main-view justify-content-md-center">
          <Route
            exact
            path="/"
            render={() =>
              movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ))
            }
          />
          <Route
            exact
            path="/movies/:movieId"
            render={({ match, history }) => (
              <Col md={8}>
                <MovieView
                  movie={movies.find((m) => m._id === match.params.movieId)}
                  onBackClick={() => history.goBack()}
                />
              </Col>
            )}
          />
          <Route
            exact
            path="/directors"
            render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorsViewAll
                    movies={movies}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            exact
            path="/directors/:name"
            render={({ match, history }) => {
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={
                      movies.find((m) => m.Director.Name === match.params.name)
                        .Director
                    }
                    directorMovies={movies.filter(
                      (m) => m.Director.Name === match.params.name
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          )
        </Row>
      </Router>
    );
  }
}

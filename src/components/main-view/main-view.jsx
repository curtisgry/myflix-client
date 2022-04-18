import React, { Component } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import {
  setMovies,
  setUser,
  setFavorites,
  setDirectors,
  setGenres,
} from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import MovieView from '../movie-view/movie-view';
import StartView from '../start-view/start-view';
import DirectorView from '../director-view/director-view';
import NavbarTop from '../navbar/navbar';
import GenreView from '../genre-view/genre-view';
import ProfileView from '../profile-view/profile-view';
import UpdateProfile from '../update-profile/update-profile';
import separateData from '../../lib/separateData';
import ConfirmationView from '../confirmation-view/confirmation-view';

class MainView extends Component {
  constructor() {
    super();
    this.onLoggedIn = this.onLoggedIn.bind(this);
    this.getFavorites = this.getFavorites.bind(this);
    this.clearUserOnDelete = this.clearUserOnDelete.bind(this);
  }

  componentDidMount() {
    const accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      const { setUser } = this.props;
      setUser(localStorage.getItem('user'));

      this.getMovies(accessToken);
      this.getFavorites(accessToken);
    }
  }

  // Updates user property in state to the logged in user
  onLoggedIn(authData) {
    const { setUser } = this.props;

    setUser(authData.user.Username);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
    this.getFavorites(authData.token);
  }

  // Get movie list and update state with user authentication from Bearer Token
  getMovies(userToken) {
    axios
      .get('https://myflix-api-cgray.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${userToken}` },
      })
      .then((res) => {
        const { setMovies, setDirectors, setGenres } = this.props;
        setMovies(res.data);
        const directors = separateData('Director', res.data);
        setDirectors(directors);
        const genres = separateData('Genre', res.data);
        setGenres(genres);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getFavorites(userToken) {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      axios
        .get(`https://myflix-api-cgray.herokuapp.com/users/${loggedInUser}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        })
        .then((res) => {
          const { setFavorites } = this.props;
          setFavorites(res.data.FavoriteMovies);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  // Remove user from state when deleted from the edit view
  clearUserOnDelete() {
    localStorage.clear();
  }

  render() {
    const { movies, user, favorites } = this.props;
    console.log(user);
    return (
      <Router>
        {user ? <NavbarTop user={user} /> : ''}
        <Container>
          <Row className="main-view justify-content-md-center">
            {/* Main view for all movies */}
            <Route
              exact
              path="/"
              render={() => {
                // If no logged in user StartView is rendered
                if (!user)
                  return (
                    <StartView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );

                // Empty container when no list is loaded
                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <Row className="content">
                    <MoviesList
                      movies={movies}
                      favorites={favorites}
                      getFavorites={this.getFavorites}
                    />
                  </Row>
                );
              }}
            />

            {/* Register new User */}
            <Route
              exact
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col>
                    <StartView onLoggedIn={this.onLoggedIn} />
                  </Col>
                );
              }}
            />

            {/* Login user */}
            <Route
              exact
              path="/login"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <StartView onLoggedIn={(user) => this.onLoggedIn(user)} />
                );
              }}
            />

            {/* View user profile info */}
            <Route
              exact
              path="/users/:username"
              render={({ history }) => {
                // If no logged in user StartView is rendered
                if (!user)
                  return (
                    <StartView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                // Empty container when no list is loaded
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <ProfileView
                      history={history}
                      movies={movies}
                      user={user}
                      getFavorites={this.getFavorites}
                    />
                  </Col>
                );
              }}
            />

            {/* Edit user profile */}
            <Route
              exact
              path="/users/edit/:username"
              render={({ history }) => {
                // If no logged in user StartView is rendered
                if (!user)
                  return (
                    <StartView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                // Empty container when no list is loaded
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <UpdateProfile
                      history={history}
                      movies={movies}
                      user={user}
                      onLoggedIn={this.onLoggedIn}
                      clearUserOnDelete={this.clearUserOnDelete}
                    />
                  </Col>
                );
              }}
            />

            {/* More info for selected movie */}
            <Route
              exact
              path="/movies/:movieId"
              render={({ match, history }) => {
                // If no logged in user StartView is rendered
                if (!user)
                  return (
                    <StartView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                // Empty container when no list is loaded
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={12}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                      getFavorites={this.getFavorites}
                    />
                  </Col>
                );
              }}
            />

            {/* View movies in a genre */}
            <Route
              exact
              path="/genres/:name"
              render={({ match, history }) => {
                // If no logged in user StartView is rendered
                if (!user)
                  return (
                    <StartView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                // Empty container when no list is loaded
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      movies={movies.filter(
                        (m) => m.Genre.Name === match.params.name
                      )}
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre
                      }
                      getFavorites={this.getFavorites}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            {/* View movies by a director */}
            <Route
              exact
              path="/directors/:name"
              render={({ match, history }) => {
                // If no logged in user StartView is rendered
                if (!user)
                  return (
                    <StartView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                // Empty container when no list is loaded
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(
                          (m) => m.Director.Name === match.params.name
                        ).Director
                      }
                      directorMovies={movies.filter(
                        (m) => m.Director.Name === match.params.name
                      )}
                      getFavorites={this.getFavorites}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              exact
              path="/confirmation"
              render={({ match, history }) => <ConfirmationView />}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies,
  user: state.user,
  favorites: state.favorites,
  genres: state.genres,
  directors: state.directors,
});

export default connect(mapStateToProps, {
  setMovies,
  setUser,
  setFavorites,
  setDirectors,
  setGenres,
})(MainView);

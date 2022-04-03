import React, { Component } from 'react';
import axios from 'axios';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';

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
                axios.get('https://myflix-api-cgray.herokuapp.com/movies')
                        .then((res) => {
                                this.setState({
                                        movies: res.data,
                                });
                        })
                        .catch((err) => {
                                console.log(err);
                        });
        }

        // Used with click event on MovieCard and MovieView to change UI view
        setSelectedMovie(newSelectedMoive) {
                this.setState({ selectedMovie: newSelectedMoive });
        }

        // Updates user property in state to the logged in user
        onLoggedIn(user) {
                this.setState({
                        user,
                });
        }

        render() {
                const { movies, selectedMovie, user } = this.state;

                // If no logged in user LoginView is rendered
                if (!user) return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

                // Empty container when no list is loaded
                if (movies.length === 0) return <div className="main-view" />;

                return (
                        <div className="main-view">
                                {selectedMovie ? (
                                        <MovieView
                                                movie={selectedMovie}
                                                onBackClick={(newSelectedMovie) => {
                                                        this.setSelectedMovie(newSelectedMovie);
                                                }}
                                        />
                                ) : (
                                        movies.map((movie) => (
                                                <MovieCard
                                                        key={movie._id}
                                                        movie={movie}
                                                        onMovieClick={(movie) => {
                                                                this.setSelectedMovie(movie);
                                                        }}
                                                />
                                        ))
                                )}
                        </div>
                );
        }
}

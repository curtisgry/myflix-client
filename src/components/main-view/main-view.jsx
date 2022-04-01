import React, { Component } from 'react';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';

import inceptionImage from '../../images/inception.jpeg';
import shawshankImage from '../../images/shawshank.jpeg';
import gladiatorImage from '../../images/gladiator.jpeg';

export default class MainView extends Component {
        constructor() {
                super();
                this.state = {
                        movies: [
                                {
                                        _id: 1,
                                        Title: 'Inception',
                                        Description:
                                                'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
                                        Image: inceptionImage,
                                },
                                {
                                        _id: 2,
                                        Title: 'The Shawshank Redemption',
                                        Description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
                                        Image: shawshankImage,
                                },
                                {
                                        _id: 3,
                                        Title: 'Gladiator',
                                        Description: 'A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.',
                                        Image: gladiatorImage,
                                },
                        ],
                        selectedMovie: null,
                };
        }

        // Used with click event on MovieCard and MovieView to change UI view
        setSelectedMovie(newSelectedMoive) {
                this.setState({ selectedMovie: newSelectedMoive });
        }

        render() {
                const { movies, selectedMovie } = this.state;

                // Still display something if no movies are loaded
                if (movies.length === 0) return <div className="main-view">The list is empty</div>;

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

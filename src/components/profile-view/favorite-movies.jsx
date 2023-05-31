/* import React from "react";
import { Link } from "react-router-dom";   
import { Col } from "react-bootstrap";
   

export function FavoriteMovies( favoriteMovieList ) {    
    const movie = movie.filter(m => user.favoriteMovieList.includes(m._id));
    return (   
        <> 
            <Col md={12}>
                <h2>My Favorite Movies</h2>
            </Col>
                {favoriteMovieList.map(movie => (
                    <Col className="mb-4" key={favoriteMovieList._id} xl={2} lg={3} md={4} xs={6}>
                        <MovieCard movie={movie} />
                    </Col>

                   /*} return (
                        <div key={movies._id}>
                            <img src={movies.Image} />
                            <Link to={`/movies/${movies._id}`}>
                                <h4>movies.Title</h4>
                            </Link>
                            <button variant="secondary" onClick={() => removeFav(movies._id)}>Remove from Favorites</button>
                   </div> */
                    
        ))}
        </>
    );
} 

import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";  

export const MainView = () => {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    const storedToken = localStorage.getItem("token");

    const [user, setUser] = useState(storedUser ? storedUser : null);

    const [token, setToken] = useState(storedToken ? storedToken : null);

    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

const onMovieClick= (newSelectedMovie) => {
    setSelectedMovie(newSelectedMovie);
};
useEffect(() => {
    if (!token) return;
    fetch("https://jens-movie-api.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((data) => 
        setMovies(data));
}, [token]);
    return (
        <Row className="justify-content-md-center">
            {!user ? (
    <Col md={5}>
        <LoginView onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
    }} />
    or
    <SignupView />
    </Col>
    ) : selectedMovie ? (
        <Col md={8}>
            <MovieView
                selectedMovie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)}
    /> 
        </Col>
    ) : movies.length === 0 ? (
        <div>The list is empty!</div>
    ) : (
        <>
            {movies.map((movies) => (
                <Col className="mb-5" key={movies._id} md={3}>
                <MovieCard
                    movies={movies}
                    onMovieClick = {onMovieClick}
                />
                </Col>
            ))}
        </>
    )}
    </Row>
    );
};


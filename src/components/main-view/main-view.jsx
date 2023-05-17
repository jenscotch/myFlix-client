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


useEffect(() => {
    if (!token) {
        return;
    }

    fetch("https://jens-movie-api.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((data) => {
        const movies = data.docs.map((doc) => {
            return {
                id: doc.key,
                title: doc.Title,
                image: doc.Image,
                director: doc.Director_Name?.[0]
            };
        });
        setMovies(movies);
    });
}, [token]);

    return (
        <Row className="justify-content-md-center">
            {!user ? (
                <>
    <LoginView onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
    }} />
    or
    <SignupView />
    </>
    ) : selectedMovie ? (
        <Col md={8}>
        <MovieView
            movie={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
        />
        </Col>
    ) : movies.length === 0 ? (
        <div>The list is empty!</div>
    ) : (
        <>
            {movies.map((movie) => (
                <Col className="mb-5" key={movie.id} md={3}>
                <MovieCard
                    movie={movie}
                    onBookClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
                </Col>
            ))}
        </>
    )}
    </Row>
    );
};


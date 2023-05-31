import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";  
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./main-view.scss";

export const MainView = () => {

    const storedUser = JSON.parse(localStorage.getItem("user"));

    const storedToken = localStorage.getItem("token");

    const [user, setUser] = useState(storedUser ? storedUser : null);

    const [token, setToken] = useState(storedToken ? storedToken : null);

    const [movies, setMovies] = useState([]);

    

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
        <BrowserRouter>
        <NavigationBar 
            user={user}
            onLoggedOut={() => {
                setUser(null);
            }}
        />
        <Row className="justify-content-md-center">
            <Routes>
                <Route
                    path="/"
                    element={
                        <></>
                    }
                />
                <Route 
                    path="/signup"
                    element={
                        <>
                        {user ? (
                            <Navigate to="/" />
                        ) : (
                            <Col md={5}>
                                <SignupView />
                            </Col>
                        )}
                        </>
                    }
                 />
                <Route
                    path="/login"
                    element={
                        <>
                            {user ? (
                                <Navigate to="/movies" />
                            ) : (
                                <Col md={5}>
                                    <LoginView onLoggedIn={(user, token) => {
                                        setUser(user);
                                        setToken(token);
                                }} />
                                </Col>
                            )}
                        </>
                    }
                    />
                <Route
                    path="/profile"
                    element={
                        <>
                            {!user ? (
                                <Navigate to="/login" replace/>
                            ) : (
                                    <ProfileView
                                        user={user}
                                        movies={movies}
                                  
                                      
                                    />
                            )}
                        </>
                    }
                /> 
                <Route 
                    path="/movies/:movieId"
                    element={
                        <>
                        {!user ? (
                            <Navigate to="/login" replace />
                        ) : movies.length === 0 ? (
                            <Col>The list is empty!</Col>
                        ) : (
                            <Col md={8}>
                                <MovieView
                                    movies={movies}
                        
                                /> 
                            </Col>
                        )}
                        </>
                    }
                />
                <Route 
                    path="/movies"
                    element={
                        <>
                        {!user ? (
                            <Navigate to="/login" replace />
                        ) : movies.length === 0 ? (
                            <Col>The list is empty!</Col>
                        ) : (
                            <>
                            {movies.map((movie) => (
                                <Col className="mb-5" key={movie._id} md={3}>
                                <MovieCard
                                    movie={movie}
                                    user={user}
                                    
                                />
                                </Col>
                            ))}
                        </>
                    )}
                </>
            }
        />
    </Routes>
</Row>
</BrowserRouter>
);
};


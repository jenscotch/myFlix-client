import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { HomeView } from "../home-view/home-view";
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

    const sort = movies.sort((a, b) => {
        return a.Title > b.Title;
    });

    const onLoggedOut = () => {
        setUser(null);
        setToken(null);
        localStorage.clear();
    };

    // Verify that you are sending a request to your API to update the user
    const updateUserFavorites = (movieId, action) => {
        console.log(movies);
        console.log(user);
        if (action === "add") {
            setUser({ 
                ...user, 
                movie: [...user.Movies, movieId] });
        } else if (action === "remove") {
            setUser({
                ...user,
                movie: movies.filter((_id) => {
                    return _id !== movieId;
                }),
            });
        }
    };

    

useEffect(() => {
    if (!token) return;
    fetch("https://jens-movie-api.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => res.json())
    .then((movies) => 
        setMovies(movies));
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
                        <HomeView />
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
                                        setUser={setUser}
                                        onLoggedOut={onLoggedOut}
                                        updateUserFavorites={updateUserFavorites}
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
                                    setUser={setUser}
                                    updateUserFavorites={updateUserFavorites}
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


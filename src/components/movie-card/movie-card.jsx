import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./movie-card.scss";


export const MovieCard = ({ movie, user, setUser, updateUserFavorites }) => {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const [Movies, setMovies] = useState(null);
    const [isFavorite, setIsFavorite] = useState([{}]);
    

    const handleAddFavorites = (event) => {
        event.preventDefault();

        const data = {
            Movies: Movies
        };

        fetch(`https://jens-movie-api.herokuapp.com/users/${user.Name}/movies/${movie._id}`,
        {
            method: "POST",
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        .then((res) => {
            if(res.ok) {
                return res.json(); }})
        .then((data) => {
            alert("You added a new movie to your list.");
            updateUserFavorites(movieId, "add");
            setIsFavorite(true);
            setUser(data);
            window.location.reload();
    })
        
        .catch((error) => console.log(error));
    };

    const handleRemoveFavorites = () => {

        fetch(`https://jens-movie-api.herokuapp.com/users/${user.Name}/movies/${movie._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
            .then((res) => {
                if(res.ok) {
                    res.json(); }})
            .then((data) => {
                alert('You removed a movie from your list.');
                setIsFavorite(false);
                updateUserFavorites(movieId, "remove");
                setUser(data);
                window.location.reload();
            })
            .catch((error) => console.log(error));

    }; 

    

    if (!movie) return null;


    return (
        <Card className="movie-card card-wrap h-100 text-center">
            <Card.Img className="img-fluid card-img-top" variant="top" src={movie.Image} />
            <Card.Body>
                <Card.Title className="header-text">{movie.Title}</Card.Title>
                <Card.Body className="header-text">{movie.Year}</Card.Body>
                <Card.Footer>
                <Button
                    className="w-100"
                    variant="primary" 
                    href={`/movies/${encodeURIComponent(movie._id)}`}>Open</Button>

                <Button
                    className="w-100"
                    variant={"success"}
                    onClick={handleAddFavorites}>Add</Button>

                <Button
                    className="w-100"
                    variant={"danger"}
                    onClick={handleRemoveFavorites}>Remove</Button>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string,
        Description: PropTypes.string,
        Image: PropTypes.string,
    }).isRequired,
};
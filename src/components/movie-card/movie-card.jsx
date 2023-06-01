import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import "./movie-card.scss";


export const MovieCard = ({ movie, user, setUser, updateUserFavorites }) => {
    const navigate = useNavigate();
    const { movieId } = useParams();
    const [isFavorite, setIsFavorite] = useState(false);
    const handleClick = () => {
        navigate(`/movies/${encodeURIComponent(movie._id)}`);
    };

    useEffect(() => {
        if (user.Movies && movie._id) {
          setIsFavorite(user.Movies.includes(movie._id))
        }
      }, [movieId]);
    

    const handleAddFavorites = () => {
        fetch(`https://jens-movie-api.herokuapp.com/users/${user._id}`,
        {
            method: "POST",
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        .then((res) => {
            if(res.ok) {
                return res.json(); }})
        .then((user) => {
            alert("You added a new movie to your list.");
            updateUserFavorites(movieId, "add");
            localStorage.setItem(user.Movies, JSON.stringify(movie));
            setIsFavorite(true);
            setUser(user);
            window.location.reload();
    })
        
        .catch((error) => console.log(error));
    };



    if (!movie) return null;


    return (
        <Card className="movie-card card-wrap h-100 text-center" onClick={handleClick}>
            <Card.Img className="img-fluid card-img-top" variant="top" src={movie.Image} />
            <Card.Body>
                <Card.Title className="header-text">{movie.Title}</Card.Title>
                <Card.Body className="header-text">{movie.Year}</Card.Body>
                <Card.Body className="text">{movie.Description}</Card.Body>
                <Card.Footer>
                <Button
                    className="w-100"
                    variant="primary" 
                    href={`/movies/${encodeURIComponent(movie._id)}`}>Open</Button>

                <Button
                    className="w-100"
                    variant={isFavorite ? "danger" : "success"}
                    onClick={isFavorite ? handleRemoveFavorites : handleAddFavorites}>Add</Button>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string,
        Image: PropTypes.string.isRequired,
    }).isRequired,
};
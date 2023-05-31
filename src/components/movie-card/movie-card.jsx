import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";


export const MovieCard = ({ movie, user, updateUserFavorites }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(false);
    const handleClick = () => {
        navigate(`/movies/${encodeURIComponent(movie._id)}`);
    };

    useEffect(() => {
        if (user.favoriteMovies && movie._id) {
          setIsFavorite(user.favoriteMovies.includes(movie._id))
        }
      }, [movie]);
    

    const handleAddFavorites = () => {
        fetch(`/users/${user.Name}/movies/${movie._id}`,
        {

            headers: { Authorization: `Bearer ${localStorage.getItem('token')}`},
        })
        .then((response) => {
            if(response.ok) {
                return response.json(); }})
        .then((user) => {
            if (user) {
            updateUserFavorites(movie._id, 'add');
            setIsFavorite(true);
    }})
        
        .catch((error) => console.log(error));
    };



    if (!movie) return null;


    return (
        <Card className="h-100" onClick={handleClick}>
            <Card.Img variant="top" src={movie.Image} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Body>{movie.Year}</Card.Body>
                <Card.Body>{movie.Description}</Card.Body>
                <Card.Footer>
                <Button
                    variant="primary" 
                    style={{
                        maxWidth: '35%',
                        minHeight: '10px',
                        display: 'flex',
                        transition: 'all 0.3s ease',
                    }}
                    href={`/movies/${encodeURIComponent(movie._id)}`}>Open</Button>

                <Button
                    className="favorite-button"
                    variant="success"
                    style={{
                        maxWidth: '35%',
                        minHeight: '10px',
                        display: 'flex',
                        transition: 'all 0.3s ease',
                    }}
                    onClick={() => handleAddFavorites(movie._id)}>Add</Button>
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
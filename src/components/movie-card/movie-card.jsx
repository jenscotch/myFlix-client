import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";



export const MovieCard = ({ movie }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.Image} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Body>{movie.Description}</Card.Body>
                <Card.Footer>
                <Link to={`/movies/${encodeURIComponent(movie._id)}`}>Open</Link>
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
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";



export const MovieCard = ({ movies, onMovieClick }) => {
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movies.Image} />
            <Card.Body>
                <Card.Title>{movies.Title}</Card.Title>
                <Card.Body>{movies.Description}</Card.Body>
                <Card.Footer>
                    <Button onClick={() => onMovieClick(movies)} variant="link">
                        Open
                </Button>
                </Card.Footer>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movies: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string,
        Image: PropTypes.string.isRequired,
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};
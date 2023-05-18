import Button from "react-bootstrap/Button";
import "./movie-view.scss";

export const MovieView = ({ selectedMovie, onBackClick })  => {
    return (
        <div>

            <div>
                <img src={selectedMovie.Image} />
            </div>
            <div>
                <span>Title: </span>
                <span className="text">{selectedMovie.Title}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span className="text">{selectedMovie.Genre.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span className="text">{selectedMovie.Director.Name}</span>
            </div>
            <Button 
                onClick={onBackClick}
                className="back-button"
                style={{ cursor: "pointer "}}
            >
                Back
    </Button> 
        </div>
    );
};



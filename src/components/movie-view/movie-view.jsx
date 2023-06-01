import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies })  => {
    const {movieId} = useParams();
    const movie = movies.find((m) => m._id === movieId);
  
    return (
        <div className="text-box group">

            <div>
                <img className="image left" src={movie.Image} />
            </div>
            <div>
                <span className="heading">Title: </span>
                <span className="text">{movie.Title}</span>
            </div>
            <div>
                <span className="heading">Genre: </span>
                <span className="text">{movie.Genre.Name}</span>
            </div>
            <div>
                <span className="heading">Director: </span>
                <span className="text">{movie.Director.Name}</span>
            </div>
            <Link to={`/movies`}>
                <button className="back-button">Back</button>
            </Link> 
        </div>
    );
};



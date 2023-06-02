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
                <span className="heading">Title: <br></br></span>
                <span className="text">{movie.Title} ({movie.Year})</span>
            </div>
            <br></br>
            <div>
                <span className="heading">Genre: <br></br></span>
                <span className="text">{movie.Genre.Name}</span>
            </div>
            <br></br>
            <div>
                <span className="heading">Director: <br></br></span>
                <span className="text">{movie.Director.Name}</span>
            </div>
            <br></br>
            <div>
                <span className="heading">Description: <br></br></span>
                <span className="text">{movie.Description}</span>
            </div>
            <br></br>
            <div>
                <span className="heading">Featured Actors: <br></br></span>
                <span className="text">{movie.Actors}</span>
            </div>
            <br></br>
            <Link to={`/movies`}>
                <button className="back-button">Back</button>
            </Link> 
        </div>
    );
};



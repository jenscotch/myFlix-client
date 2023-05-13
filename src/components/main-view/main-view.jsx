import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: "Young Adult",
            description: "Soon after her divorce, a fiction writer returns to her home in small-town Minnesota. Looking to rekindle a romance with her ex-boyfriend, who is now happily married and has a newborn daughter.",
            image: "https://m.media-amazon.com/images/M/MV5BMTc4NzgyMjQwMV5BMl5BanBnXkFtZTcwNjMxODcwNw@@._V1_FMjpg_UX1000_.jpg",
            genre: [{
                name: "Comedy",
                description: "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect."
            }],
            director: [{
                name: "Jason Reitman",
                bio: "Jason Reitman is a Canadian  filmmaker and producer who notably directed Ghostbusters: Afterlife, Juno, Thank You for Smoking, Up in the Air, Young Adult, and Tully. He is the son of Ivan Reitman, who directed the first two Ghostbusters films and Twins",
                birth: "1977"
            }]
        },
        {
            id: 2,
            title: "In a World...",
            description: "An underachieving voice coach finds herself competing in the movie trailer voice-over profession against her arrogant father and his protégé.",
            image: "https://m.media-amazon.com/images/M/MV5BMTU0NzE0Mzg3M15BMl5BanBnXkFtZTcwNzY2MDY3OQ@@._V1_FMjpg_UX1000_.jpg",
            genre: [{
                name: "Comedy",
                description: "Comedy is a genre of film in which the main emphasis is on humor. These films are designed to make the audience laugh through amusement and most often work by exaggerating characteristics for humorous effect."
            }],
            director: [{
                name: "Lake Bell",
                bio: "Lake Siegel Bell is an American actress, screenwriter, and director. She wrote and directed the short film Worst Enemy, which debuted at the Sundance Film Festival in 2012, followed by her 2013 feature film directing debut In a World..., in which she also starred.",
                birth: "1979"
            }]
        },
        {
            id: 3,
            title: "Marie Antoinette",
            description: "The retelling of France's iconic but ill-fated queen, Marie Antoinette. From her betrothal and marriage to Louis XVI at 14 to her reign as queen at 19 and to the end of her reign as queen, and ultimately the fall of Versailles.",
            image: "https://m.media-amazon.com/images/M/MV5BNDViNjYxNWYtMWRiOS00NmMyLTgwNDMtNTg3MWYwNjAxNWM4XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_FMjpg_UX1000_.jpg",
            genre: [{
                name: "Drama",
                description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone. A primary element in a drama is the occurrence of conflict—emotional, social, or otherwise—and its resolution in the course of the storyline."
            }],
            director: [{
                name: "Sofia Coppola",
                bio: "Sofia Coppola is an American director and actress. She acted in The Godfather trilogy and Star Wars Episode I: The Phantom Menace. She directed Lost in Translation, Marie Antoinette, The Virgin Suicides, The Beguiled, On the Rocks, Somewhere and The Bling Ring. She is the daughter of Francis Ford Coppola.",
                birth: "1971"
            }]
        },
    ]);

const [selectedMovie, setSelectedMovie] = useState(null);

if (selectedMovie) {
    return (
        <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
}

if (movies.length === 0) {
    return <div>The list is empty!</div>;
}

return (
    <div>
        {movies.map((movie) => (
            <MovieCard
                key={movie.id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
            />
        ))}
    </div>
);
};
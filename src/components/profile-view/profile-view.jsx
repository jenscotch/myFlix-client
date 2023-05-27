import React from "react";
import { Row, Col } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { UserInfo } from "../profile-view/user-info";
import { FavoriteMovies } from "../profile-view/favorite-movies";
import { UpdateUser } from "../profile-view/update-user";

export const ProfileView = ({ onProfileUpdate, onLoggedIn, movie, user, token }) => {
    return (
        <div>
        <UserInfo name={user.Name} email={user.Email} birthday={user.Birthday} />
       {/* <FavoriteMovies favoriteMovieList={favoriteMovieList}/> */}
        <UpdateUser onProfileUpdate={onProfileUpdate} onLoggedIn={onLoggedIn} />   
            
        <Row>
            <FavoriteMovies favoriteMovieList={user.favoriteMovieList} />
                <Col xs={12} md={6} lg={4} xl={3} xxl={2} key={movie._id}>
                    <MovieCard movie={movie} user={user} token={token} />
                </Col>
        </Row>
        </div>
    )
}
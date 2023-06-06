import React from "react";
import { Button, Container } from "react-bootstrap";
import "./home-view.scss";

export const HomeView = () => {

    return (
        <Container className="vertical-center">
            <h1 className="neon">Jen's Flix</h1>
            <h2 className="p">THE ULTIMATE GUIDE TO JEN'S FAVORITE MOVIES</h2>
            <h3 className="p2">How many favorite movies do you have in common?</h3>
            <Button 
            variant="primary"
            className="home-button"
            href={`/movies`}
            >
            Start Browsing
            </Button> 

        </Container>
    );
};

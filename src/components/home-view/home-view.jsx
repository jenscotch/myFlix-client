import React from "react";
import { Button, Container } from "react-bootstrap";
import "./home-view.scss";

export const HomeView = () => {

    return (
        <Container className="vertical-center">
            <h1 className="neon">Jen's Flix</h1>
            <p className="p">THE ULTIMATE GUIDE TO JEN'S FAVORITE MOVIES</p>
            <p className="p2">How many favorite movies do you and Jen have in common?</p>
            <Button 
            variant="primary"
            className="home-button"
            href={`/login`}
            >
            Start Browsing
            </Button> 

        </Container>
    );
};

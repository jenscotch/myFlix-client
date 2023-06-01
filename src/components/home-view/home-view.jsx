import React from "react";
import { Button, Container } from "react-bootstrap";
import "./home-view.scss";

export const HomeView = () => {

    return (
        <Container className="vertical-center">
            <h1 className="h1">Jen's Flix</h1>
        
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

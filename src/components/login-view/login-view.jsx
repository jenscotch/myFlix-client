import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
    const [Name, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Name: Name,
            Password: Password
        };

        fetch("https://jens-movie-api.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })  .then((response) => response.json())
            .then((data) => {
                console.log("Login response: ", data)
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            } else {
                alert("No such user");
            }
        })
            .catch((e) => {
                alert("Something went wrong");
            });
    };

    return (
        <Container>
            <h1 className="text-center" style={{ textDecoration: 'bold', color: "white" }}>
                Login
            </h1>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <Form.Label style={{color: "white"}}>Name:</Form.Label>
                <Form.Control
                    className="text-light"
                    type="text"
                    value={Name}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength="3"
                />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label style={{color: "whitesmoke"}}>Password:</Form.Label>
                <Form.Control
                    className="text-light"
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        </Container>
    );
};
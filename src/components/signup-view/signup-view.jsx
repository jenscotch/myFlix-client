import{ useState } from "react";
import { Button, Container } from "react-bootstrap";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
    const [Name, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Name: Name,
            Password: Password,
            Email: Email,
            Birthday: Birthday
        };

        fetch("https://jens-movie-api.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    return (
        <Container>
            <h1 className="text-center" style={{ textDecoration: 'bold', color: "white" }}>
                Signup
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
                <Form.Label style={{color: "white"}}>Password:</Form.Label>
                <Form.Control
                    className="text-light"
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
        
            <Form.Group controlId="formEmail">
                <Form.Label style={{color: "white"}}>Email:</Form.Label>
                <Form.Control
                    className="text-light"
                    type="email"
                    value={Email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formBirthday">
                <Form.Label style={{color: "white"}}>Birthday:</Form.Label>
                <Form.Control
                    className="text-light"
                    type="date"
                    value={Birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
        </Container>
    );
};
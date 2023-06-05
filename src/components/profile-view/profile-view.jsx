import React, { useState, useEffect } from "react";
import { Container, Form, Button, Col, Row, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export const ProfileView = ({
    user,
    movies,
    setUser,
    onLoggedOut,
    updateUserFavorites,
    
}) => {
    const [ Name, setName ] = useState("");
    const [ Password, setPassword ] = useState("");
    const [ Email, setEmail ] = useState("");
    const [ Birthday, setBirthday ] = useState("");
    const [Movies, setFavorites] = useState([{}]);
    const navigate = useNavigate();
    const [showButton, setShowButton] = useState(false);
    const [hoverEnabled, setHoverEnabled] = useState(false);

    const data = {
        Name: Name,
        Password: Password,
        Email: Email,
        Birthday: Birthday
    };

    const getFavoriteMovies = () => {
        console.log(user);
        fetch(`https://jens-movie-api.herokuapp.com/users/${user.Name}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
})
        .then((res) => res.json())
        .then((data) => {
            const Movies = movies.filter((movie) => data.Movies.includes(movie._id));
            setFavorites(Movies);
    })
        .catch((e) => console.log(e));
};

    useEffect(() => {
        getFavoriteMovies();
    }, [user, movies]);

    useEffect(() => {
        const detectHover = () => {
            const hoverSupported = window.matchMedia("(hover: hover)").matches;
        setHoverEnabled(hoverSupported);
    };

    detectHover();
    window.addEventListener("resize", detectHover);

    return () => {
        window.removeEventListener("resize", detectHover);
    };
}, []);


    const handleUpdate = (e) => {
        e.preventDefault();
        fetch(`https://jens-movie-api.herokuapp.com/users/${user.Name}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(data),
        })
            .then((res) => res.json())
            .then((data) => {
                alert("Profile has been updated.");
           
                setUser(data);
            })
        .catch((e) => console.log(e));
    };

    const handleDelete = () => {
        const confirmDelete = window.confirm(
            "Are you sure you would like to delete your profile?"
        );

        if(!confirmDelete) {
            return;
        }

        fetch(`https://jens-movie-api.herokuapp.com/users/${user.Name}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.text())
            .then((data) => {
                alert(data);
                setUser();
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                navigate("/login");
                onLoggedOut();
            })
            .catch((e) => console.log(e));
        };



    return(
        <Container
            className="profile-container"
            style={{
                backgroundColor: '#00000095',
                color: 'whitesmoke',
                padding: '20px',
                width: '75%',
                justifyContent: 'center',
                borderRadius: '10px',
            }}
        >
            <style>
                {`
                .profile-form {
                    display: flex;
                    flex-direction: column;
                    align-item: center;
                    width: 25%;
                    margin: 0 auto;
                }
                
                @media screen and (max-width: 768px) {
                    .profile-form {
                        width: 75%
                    }
                }`}
            </style>
            
            <h1 className="text-center" style={{ textDecoration: "bold" }}>
                {user.Name}'s Profile
            </h1>
            <br></br>
            <br></br>
            <br></br>
            <h2 className="text-center">Favorite Movies</h2>
            <Row
                className="justify-content-center"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                }}
            >
                {Movies.length > 0 ? (
                    Movies
                        .filter((movie) => movie !== null)
                        .map((movie) => (
                            <Col key={movie}
                                xs={3} sm={3} md={3} lg={3}
                                className="d-flex justify-content-center mb-4"
                                style={{
                                    position: "relative",
                                    minHeight: "400px",
                                    minWidth: "300px",
                                    margin: "5px",
                                }}
                            >
                                <div
                                    style={{
                                        position: "relative",
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                        minWidth: "150px",
                                        maxWidth: "1000px",
                                    }}
                                    onMouseEnter={() => {
                                        if (hoverEnabled) {
                                            setShowButton(true);
                                        }
                                    }}
                                    onMouseLeave={() => {
                                        if (hoverEnabled) {
                                            setShowButton(false);
                                        }
                                    }}
                                >
                                    
                                    <div>
                                        <Card className="movie-card card-wrap h-100 text-center">
                                            <Card.Img className="img-fluid card-img-top" variant="top" src={movie.Image} />
                                        <Card.Body>
                                            <Card.Title className="header-text">{movie.Title}</Card.Title>
                                        <Card.Body className="header-text">{movie.Year}</Card.Body>
                                        </Card.Body>
                                        </Card>
                                    </div>
                                    <Button
                                        className="w-100"
                                        variant="primary" 
                                        href={`/movies/${encodeURIComponent(movie._id)}`}>Open</Button>
                                    {/*<Button variant="danger"
                                        syle={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            width: '100%',
                                            height: '50px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            transition: 'all 0.3s ease',
                                            opacity: hoverEnabled && showButton ? 1 : 0,
                                            zIndex: 1,
                                        }}
                                        onClick={handleRemoveFavorites}
                                    >
                                        Remove
                                    </Button>*/}
                                </div>
                            </Col>
                        ))
                ) : (
                    <p>No movies added yet.</p>
                )}
            </Row>
            <Form
                className="profile-form"
                style={{
                    width: "25%",
                    display: "flex",
                    flexDirection: "column",
                }}
            > 
                <br></br>
                <h4 className="text-center">Update Profile</h4>
                <Form.Group
                    controlId="formUsername"
                    style={{ padding: "10px", width: "100%" }}
                >
                    <Form.Label>Name:</Form.Label>
                    <Form.Control
                        className="text-light"
                        type="text"
                        placeholder="Enter name"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group
                    controlId="formPassword"
                    style={{ padding: "5px", width: "100%" }}
                >
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        className="text-light"
                        type="password"
                        placeholder="Password is required"
                        value={Password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group
                    controlId="formEmail"
                    style={{ padding: "5px", width: "100%" }}
                >
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                        className="text-light"
                        type="email"
                        placeholder="Enter new email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group
                    controlId="formBirthday"
                    style={{ padding: "5px", width: "100%" }}
                >
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                        className="text-light"
                        type="date"
                        value={Birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                    />
                </Form.Group>
                <br></br>
                <Button
                    variant="primary"
                    type="submit"
                    style={{
                        display: "flex",
                        justifyContent: "center",
                    }}
                    onClick={handleUpdate}
                >Update</Button>
                <Button variant="danger" type="button" onClick={handleDelete}>
                    Delete Account
                </Button>
            </Form>
        </Container>
    );
};


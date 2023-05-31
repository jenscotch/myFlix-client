{/* import {useState} from "react";
import {Form, Button, Alert} from "react-bootstrap";

export function UpdateUser ( onProfileUpdate, onLoggedOut ) {
    const [Name, handleNameUpdate] = useState("");
    const [Email, handleEmailUpdate] = useState("");
    const [Birthday, handleBirthdayUpdate] = useState("");

    const handleSubmit = (event) => {
            event.preventDefault();

            const data = {
                Name: Name,
                Email: Email,
                Birthday: Date,
            };
    
            fetch("https://jens-movie-api.herokuapp.com/users/${user._id}", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })  .then((response) => response.json())
                .then((data) => {
                    console.log("Database response: ", data)
                if (data.user) {
                    localStorage.setItem("Name", data.Name);
                    localStorage.setItem("Email", data.Email);
                    localStorage.setItem("Birthday", data.Birthday);
                    onProfileUpdate(data.Name, data.Email, data.Birthday);
                } 
            })
                .catch((e) => {
                    alert("Something went wrong");
                });
        };

        const deleteAccount = () => {
            fetch(`https://jens-movie-api.herokuapp.com/users/${user._id}`, {
                method: DELETE,
                headers: { Authorization: `Bearer ${token}`} 
            })
            .then(response => {
                if (response.ok) {
                    alert("Your account has been deleted.");
                    onLoggedOut();
                }
            })
            .catch(e => {
                alert(e);
            });
        }

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formUsername">
                <h2>Change Profile Info.</h2>
                <Form.Label>Name:</Form.Label>
                <Form.Control
                    type="text"
                    name="Name"
                    defaultValue={Name}
                    onChange={e => handleNameUpdate(e.target.value)} 
                />
            </Form.Group>
            <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    name="Email"
                    defaultValue={Email}
                    onChange={e => handleEmailUpdate(e.target.value)} 
                />
            </Form.Group>
            <Form.Group controlId="formBirthday">
                <Form.Control
                    type="date"
                    name="Birthday"
                    defaultValue={Birthday}
                    onChange={e => handleBirthdayUpdate(e.target.value)} 
                />
            </Form.Group>
                <Button variant="primary" type="submit">Update</Button>

                <Alert variant="danger" type="delete">
                    <Alert.Heading>Delete Profile?</Alert.Heading>
                        <p>Are you sure? Clicking "Delete Profile" will permanently delete your Profile and all of your info.!</p>
                        <hr />
                        <div className="d-flex justify-content-end">
                            <Button onClick={() => deleteAccount()} variant="outline-success">
                                Delete Profile    
                            </Button> 
                        </div>
                </Alert>
        </Form>
        
    )
    } */}
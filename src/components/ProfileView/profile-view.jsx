import { Card, Col, Row, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { MovieCard } from "../MovieCard/movie-card";

export const ProfileView = ({ user, token, setUser, movies, onAddToFavorites, onRemoveFavorite }) => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};


    if (username) data.username = username;
    if (name) data.name = name;
    if (password) data.password = password;
    if (email) data.email = email;
    if (birthdate) data.birthdate = birthdate;

    try {
      const response = await fetch(`https://cartoon-db-8718021d05a1.herokuapp.com/users/${user.username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (!response.ok) {
        if (responseData && responseData.error) {
          setError(responseData.error);
          console.log(responseData);
        } else {
          setError("Update failed. Please try again.")
        }
        return;
      }
      const updatedUser = { ...user, ...responseData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setError(null);
      alert("Your information was updated successfully.");

    } catch (error) {
      console.error('Error updating user: ', error)
      setError(error.message);
    }
  };

  const favoriteMovies = movies.filter(m => user.favorites.includes(m.id));

  return (
    <>
      <Row className="g-3">
        <Col sm={12}>
          <Card className="w-100 mt-3">
            <Card.Title className="m-2">Hi, {user.username}!</Card.Title>
            <Card.Body>
              <Card.Text>{user.name}</Card.Text>
              <Card.Text>{user.email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <hr />
      <Row>
        <h3>Your Favorites:</h3>
        {favoriteMovies.map((movie) => (
          <Col sm={12} md={6} lg={3} className="mb-4" key={movie.id}>
            <MovieCard movie={movie} onAddtoFavorites={onAddToFavorites} onRemoveFavorite={onRemoveFavorite} />
          </Col>
        ))}
      </Row>
      <hr />
      <Form onSubmit={handleSubmit} className="row g-3">
        <h2>Want to Update Your Info?</h2>
        <h6 className="text-muted">(Username and Email are required to make updates, but you can still update them here.)</h6>
        {error && <div>{error}</div>}
        <Form.Group controlId="formUsername">
          <Form.Label>
            Username (Required): </Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={2}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email (Required):</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            pattern={`[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$`}
            onInvalid={(e) => e.target.setCustomValidity('Please enter a valid email address')}
            onInput={(e) => e.target.setCustomValidity('')}
            required
          />
        </Form.Group>
        <Form.Group controlId="formName">
          <Form.Label>
            Name: </Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="col-md-6">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={8}
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword" className="col-md-6">
          <Form.Label>
            Confirm Password: </Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            minLength={8}
          />
          {password !== confirmPassword && (
            <span style={{ color: 'red' }}>Passwords do not match</span>
          )}
        </Form.Group>
        <Form.Group controlId="formBirthdate">
          <Form.Label>Birthdate:</Form.Label>
          <Form.Control
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
          />
        </Form.Group>
        <Button disabled={password !== confirmPassword} type="submit">Submit</Button>
      </Form>
    </>
  )

}
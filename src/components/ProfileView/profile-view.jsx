import { Card, Col, Row, Form, Button, InputGroup } from "react-bootstrap";
import { BiEye, BiEyeSlash } from "react-icons/bi"
import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";

export const ProfileView = ({ user, token, setUser, movies, onAddToFavorites, onRemoveFavorite }) => {

  //values so user can update each if they want to
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    confirmPassword: "",
    email: "",
    birthdate: ""
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || "",
        name: "",
        password: "",
        confirmPassword: "",
        email: user.email || "",
        birthdate: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedFormData = {};
    Object.keys(formData).forEach((key) => {
      trimmedFormData[key] = formData[key].trim();
    });

    // The following data setting allows a user to update parts of their profile without changing the whole user; http method is also patch instead of put; and this will create an object with only the updated fields
    const data = {
      username: trimmedFormData.username,
      email: trimmedFormData.email,
    };

    if (trimmedFormData.name !== '') {
      data.name = trimmedFormData.name;
    }

    if (trimmedFormData.birthdate !== '') {
      data.birthdate = trimmedFormData.birthdate;
    }

    if (formData.password !== '') {
      data.password = trimmedFormData.password;
    }

    console.log("submitting data: ", data)

    try {
      const response = await fetch(`https://cartoon-db-8718021d05a1.herokuapp.com/users/${user.username}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get("Content-Type");
      let responseData;
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();
        console.log(responseData)
      } else {
        responseData = { error: "Unexpected response from server" };
      }


      if (!response.ok) {
        if (responseData && responseData.error) {
          const errorMsg = responseData.errors.map(err => `${err.msg} (Field: ${err.path})`).join(', ')
          setError(`Update failed: ${errorMsg}`);
          console.log(errorMsg);
        } else {
          setError("Update failed. Please try again.")
        }
        return;
      }

      const updatedUser = { ...user, ...responseData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      console.log(updatedUser)
      setError(null);
      alert("Your information was updated successfully.");

      setFormData({
        username: updatedUser.username,
        name: "",
        password: "",
        confirmPassword: "",
        email: updatedUser.email,
        birthdate: ""
      });

    } catch (error) {
      console.error('Error updating user: ', error)
      setError(`Error updating user: ${error.message}`);
    }
  };

  const favoriteMovies = user.favorites ? movies.filter(m => user.favorites.includes(m.id)) : [];

  return (
    <>
      <Row className="g-3">
        <Col sm={12}>
          <Card className="w-100 mt-3">
            <Card.Title className="m-2" aria-label="Your username">Hi, {user.username}!</Card.Title>
            <Card.Body aria-label="Your name, email and birthday.">
              <Card.Text>{user.name}</Card.Text>
              <Card.Text>{user.email}</Card.Text>
              <Card.Text>{user.birthdate}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <hr />
      <Row>
        <h3 aria-label="Your favorite movies">Your Favorites:</h3>
        {favoriteMovies.map((movie) => (
          <Col sm={12} md={6} lg={3} className="mb-4" key={movie.id}>
            <MovieCard movie={movie} onAddtoFavorites={onAddToFavorites} onRemoveFavorite={onRemoveFavorite} />
          </Col>
        ))}
      </Row>
      <hr />
      <Form onSubmit={handleSubmit} className="row g-3" aria-label="A form to change your information">
        <h2>Want to Update Your Info?</h2>
        <h6 className="text-muted">(Username and Email are required to make updates, but you can still update them here.)</h6>
        {error && <div>{error}</div>}
        <Form.Group controlId="formUsername">
          <Form.Label>
            Username (Required): </Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            minLength={4}
            required
            aria-required="true"
            aria-label="your updated username"
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email (Required):</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            pattern={`[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$`}
            onInvalid={(e) => e.target.setCustomValidity('Please enter a valid email address')}
            onInput={(e) => e.target.setCustomValidity('')}
            required
            aria-required="true"
            aria-label="your updated email"
          />
        </Form.Group>
        <Form.Group controlId="formName">
          <Form.Label>
            Name: </Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            aria-label="Your name"
          />
        </Form.Group>
        <Form.Group controlId="formPassword" className="col-md-6">
          <Form.Label>Password:</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              aria-label="Enter a new password, then confirm again below"
            />
            <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "-" : "+"}
            </Button>
          </InputGroup>
        </Form.Group>
        <Form.Group controlId="formConfirmPassword" className="col-md-6">
          <Form.Label>
            Confirm Password: </Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength={8}
              aria-label="Confirm your new password"
            />
            <Button variant="outline-secondary" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? "-" : "+"}
            </Button>
          </InputGroup>
          {formData.password !== formData.confirmPassword && (
            <span style={{ color: 'red' }}>Passwords do not match</span>
          )}
        </Form.Group>
        <Form.Group controlId="formBirthdate">
          <Form.Label>Birthdate:</Form.Label>
          <Form.Control
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
            aria-label="Your date of birth"
          />
        </Form.Group>
        <Button disabled={formData.password !== formData.confirmPassword} type="submit" aria-label="Button to submit updates">Submit</Button>
      </Form>
    </>
  )

}
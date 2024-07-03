import { Card, Col, Row, Form, Button, InputGroup } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { useState, useEffect } from "react";
import { MovieCard } from "../MovieCard/movie-card";

import "react-toastify/dist/ReactToastify.css"


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

    try {
      const response = await fetch(`https://cartoon-db-8718021d05a1.herokuapp.com/users/${user.username}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      });

      //making sure the response comes through in the correct format
      const contentType = response.headers.get("Content-Type");
      let responseData;
      if (contentType && contentType.includes("application/json")) {
        responseData = await response.json();

      } else {
        responseData = { error: "Unexpected response from server" };
      }

      //confirming response and handling errors
      if (!response.ok) {
        if (responseData && responseData.error) {
          const errorMsg = responseData.errors.map(err => `${err.msg} (Field: ${err.path})`).join(', ')
          setError(`Update failed: ${errorMsg}`);
          console.log(errorMsg);
          toast.error(`Update failed: ${errorMsg}`)
        } else {
          setError("Update failed. Please try again.")
        }
        return;
      }

      const updatedUser = { ...user, ...responseData };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setError(null);
      toast.success("Your information was updated successfully.");

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
      toast.error(`Error updating user: ${error.message}`) //Testing use of toast, so keeping both errors for now
    }
  };

  const formattedBirthday = user.birthdate ? new Date(user.birthdate).toISOString().split('T')[0] : "";


  const favoriteMovies = user.favorites ? movies.filter(m => user.favorites.includes(m.id)) : [];

  return (
    <>
      <Row className="g-3">
        <Col sm={12}>
          <Card className="w-100 mt-3">
            <Card.Title className="m-2" aria-label="Your username">Hi, {user.username}!</Card.Title>
            <Card.Body aria-label="Your name, email and birthday.">
              <Card.Text>{user.name}</Card.Text>
              <Card.Text>Email: {user.email}</Card.Text>
              <Card.Text>Birthday: {formattedBirthday}</Card.Text>
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
      <Form onSubmit={handleSubmit} className="row g-3 mb-5" aria-label="A form to change your information">
        <h2>Want to Update Your Info?</h2>
        <h6 className="text-muted">(Username and Email are required to make updates, but you can still update them here.)</h6>
        <ToastContainer autoClose={3000} theme="colored" />
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
              {showPassword ? <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
              </svg></span> : <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg></span>}
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
            <Button variant="outline-secondary" className="bi bi-eye" onClick={() => setShowPassword(!showPassword)}>
              {/* Fix the below so that the eye icons show up */}
              {showPassword ? <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
              </svg></span> : <span><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
              </svg></span>}
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
      </Form >

    </>
  )

}
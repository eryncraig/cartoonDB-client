import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      username,
      name,
      password,
      email,
      birthdate,
    };

    try {
      const response = await fetch("https://cartoon-db-8718021d05a1.herokuapp.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert("Signup successful! Welcome to CartoonDB.");
      } else {
        response.json().then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setError("Signup failed.")
          }
        });
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <Form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <Form.Group controlId="formUsername">
        <Form.Label>
          Username: </Form.Label>
        <Form.Control
          type="text"
          placeholder="ex: ZorroTwoBlade"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          aria-required="true"
          aria-label="Enter a username"
          role="textbox"
          minLength={2}
        />
      </Form.Group>
      <Form.Group controlId="formName">
        <Form.Label className="m-2">
          Name (optional): </Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ex: Zorro"
          aria-label="Enter your name. This is optional"
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label className="m-2">Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-required="true"
          aria-label="Choose a password"
          placeholder="Password"
          minLength={8}
        />
      </Form.Group>
      <Form.Group controlId="formConfirmPassword">
        <Form.Label className="m-2">
          Confirm Password: </Form.Label>
        <Form.Control
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          aria-required="true"
          aria-label="Confirm your password"
          placeholder="Confirm password"
          minLength={8}
        />
        {password !== confirmPassword && (
          <span style={{ color: 'red' }}>Passwords do not match</span>
        )}
      </Form.Group>
      <Form.Group controlId="formEmail">
        <Form.Label className="m-2">Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          pattern={`[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$`}
          onInvalid={(e) => e.target.setCustomValidity('Please enter a valid email address')}
          onInput={(e) => e.target.setCustomValidity('')}
          required
          aria-required="true"
          aria-label="Enter your email here"
          placeholder="ex: zorro@onepiece.org"
        />
      </Form.Group>
      <Form.Group controlId="formBirthdate">
        <Form.Label className="m-2">Birthdate:</Form.Label>
        <Form.Control
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
          aria-required="true"
          aria-label="Your birthdate"
        />
      </Form.Group>
      <Button className="m-2" type="submit" role="button" aria-label="Submit button">Submit</Button>
    </Form>
  )

}
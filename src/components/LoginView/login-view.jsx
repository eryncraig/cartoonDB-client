import { useState } from "react";
import { Form, Button } from "react-bootstrap";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password
    }

    fetch("https://cartoon-db-8718021d05a1.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((response) => {
      if (!response.ok) {
        if (response.status >= 400 && response.status < 500) {
          return response.json().then((data) => {
            let errorMessage;
            switch (response.status) {
              case 400:
                errorMessage = data.message || "Invalid username or password. Please register if you don't have an account.";
                break;
              case 401:
                errorMessage = "Unauthorized access. Please check your credentials.";
                break;
              case 404:
                errorMessage = "User not found. Please register.";
                break;
              default:
                errorMessage = "Client error. Please check your input.";
            }
            throw new Error(errorMessage)
          });
        } else {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      }
      return response.json()
    })
      .then((data) => {
        if (data && data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token)
        } else {
          alert("No such user.");
        }
      }).catch((e) => {
        console.error("Login error: ", e)
        alert("Something went wrong. " + e.message)
      })

  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>
          Username: </Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          aria-required="true"
          aria-label="Enter your username"
        />
      </Form.Group>
      <Form.Group controlId="formPassword">
        <Form.Label>
          Password: </Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          aria-required="true"
          aria-label="Enter your password"
        />
      </Form.Group>
      <Button className="m-2" variant="primary" type="submit" aria-label="Button to log in">Submit</Button>
    </Form>
  )

}
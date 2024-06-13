import { useState } from "react";

export const LoginView = () => {
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
    }).then((response) => response.json())
      .then((data) => {
        console.log("Login response: ", data);
        if (data.user) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          onLoggedIn(data.user, data.token)
        } else {
          alert("No such user.");
        }
      }).catch((e) => {
        alert("Something went wrong. " + e)
      })

  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  )

}
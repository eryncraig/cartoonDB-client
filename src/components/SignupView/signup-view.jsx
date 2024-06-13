import { useState } from "react";

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
    <form onSubmit={handleSubmit}>
      {error && <div>{error}</div>}
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={2}
        />
      </label>
      <label>
        Name (optional):
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
      </label>
      <label>
        Confirm Password:
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={8}
        />
        {password !== confirmPassword && (
          <span style={{ color: 'red' }}>Passwords do not match</span>
        )}
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          pattern={`[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$`}
          onInvalid={(e) => e.target.setCustomValidity('Please enter a valid email address')}
          onInput={(e) => e.target.setCustomValidity('')}
          required
        />
      </label>
      <label>
        Birthdate:
        <input
          type="date"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  )

}
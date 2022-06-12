// src/pages/SignupPage.js

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.errors[0].defaultMessage;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="hero">
        <h1 className="title">BOOK-HUB</h1>
    <div className="formBox">
        <div className="button-box">
        <div id="btn2"></div>
            <Link  to="/login">
            <button className="toggle-btn">Login</button>
          </Link>
        <Link to="/signup">
            <button className="toggle-btn">Sign Up</button>
          </Link>
            </div>
      <form id="register" className="input-group" onSubmit={handleSignupSubmit}>
      <input placeholder="Name" className="input-field" type="text" name="name" value={name} onChange={handleName} />
        <input placeholder="Email" className="input-field" type="email" name="email" value={email} onChange={handleEmail} />

        <input
        placeholder="Password"
        className="input-field"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button class="summit-btn" type="submit">Login</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default SignupPage;
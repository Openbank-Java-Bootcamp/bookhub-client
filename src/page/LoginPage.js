// src/pages/LoginPage.js

import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

//he modificado el error porque no iba (si tira asi asi se queda)

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("Invalid Credentials");
  const[error, setError] = useState(false);
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  //login process
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Request to the server's endpoint `/auth/login` returns a response
        // with the JWT string ->  response.data.authToken
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/"); // <== ADD
      })
      .catch((error) => {
        setError(true);
      });
  };

  return (
    <div className="hero">
        <h1 className="title">BOOK-HUB</h1>
    <div className="formBox">
        <div className="button-box">
            <div id="btn"></div>
            <Link  to="/login">
            <button className="toggle-btn">Login</button>
          </Link>
        <Link to="/signup">
            <button className="toggle">Sign Up</button>
          </Link>
            </div>
      <form id="login"className="input-group" onSubmit={handleLoginSubmit}>
        <input placeholder="Email" className="input-field" type="email" name="email" value={email} onChange={handleEmail} />

        <input
        placeholder="Password"
        className="input-field"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <button className="summit-btn" type="submit">Login</button>
      </form>
      {error && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default LoginPage;
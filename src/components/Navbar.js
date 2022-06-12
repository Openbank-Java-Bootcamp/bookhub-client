import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="Navbar">
      <Link to="/">
        <button className="logout">Book Searcher</button>
      </Link>
      <Link to="/mybooks">
        <button className="logout">My books</button>
      </Link>
      <button className="logout"onClick={logOutUser}>Logout</button>
    </nav>
  );
}

export default Navbar;
import { useContext } from "react";
import Navbar from "../components/Navbar";
import { AuthContext } from "../context/auth.context";

function MyBooks(){
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
    return(
        <div>
            <Navbar />
            <h2>{user.name}, This are your books</h2>
        </div>
    )
}

export default MyBooks;
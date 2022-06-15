import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
const API_URL2 = "http://localhost:5005/api/books/";


function MyBookBox(props){
    const [isbn, setIsbn] = useState(props.book.id);

    const deleteBook =() =>{
        const storedToken = localStorage.getItem("authToken");
        // Send the token through the request "Authorization" Headers
        axios
          .delete(API_URL2+isbn, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            // Reset the state
            props.refresh();
          })
          .catch((error) => console.log(error))
    }

    return(
        <div >
        <div className="cardTBR">
            <button  className="summit-btn7" onClick={deleteBook}>❌</button>
            <img src={props.book.imagen} alt="book cover" />
            <div className="button">
            <Link to={`/book/${props.book.id}/info`}>
                <h3 className="title2">{props.book.title}</h3>
             </Link>
            </div>
        </div>
        </div>
    )
}
export default MyBookBox;
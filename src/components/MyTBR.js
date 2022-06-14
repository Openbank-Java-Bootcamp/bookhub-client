import axios from "axios";
import MyBook from "../components/MyTBR";
import MyRead from "../components/MyRead";
import MyReading from "../components/MyReading";
import { useEffect, useState } from "react";
import MyBookBox from "./MyTBRBook";
import BookCard from "./BookCard";
const API_URL2 = "http://localhost:5005/api/books/TBR";


function MyTBR(){
    const[loading, setLoading] = useState(true);
    const[books, setBooks] = useState([]);

    useEffect(() =>{
        getUserBook();
    },[]);

    const getUserBook = () =>{
        const storedToken = localStorage.getItem("authToken");
        // Send the token through the request "Authorization" Headers
        axios
          .get(API_URL2, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            // Reset the state
            setBooks(response.data);
            console.log(response);
            setLoading(false);
          })
          .catch((error) => console.log(error));
    }
    return(
            <div className="colum">
                {loading? <div>loading</div>:
                (<div>
                <h2 className="booktit">FUTURE READINGS</h2>
                <div className="container2">
                {books.map((book) =>{
                    console.log(book);
                    return(
                    <div className="bookBOX">
                        <MyBookBox key={book.id} book={book} refresh={getUserBook} />
                     </div>
                    );
                })}
                </div>
                </div>)}
                
            </div>
        )
}
export default MyTBR;
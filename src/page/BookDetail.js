import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddBook from "../components/AddBook";
import Navbar from "../components/Navbar";
import RatingBook from "../components/RatingsBook";
import bookData from "../samplebooks.json"
const API_URL = "http://localhost:5005/api/ratings";


function BookDetail(){
    const{id} = useParams();
    const[book, setBook] = useState(null);
    const[loading, setLoading] = useState(true);
    const[status, setStatus]=useState("");
    const[pagesRead, setPagesRead]=useState(0);
    const[Form, setForm]=useState(false);
    const[points, setPoints] = useState(0);
    const[comment, setComment] = useState("");

    const handlepoints = (e) => setPoints(e.target.value);
    const handleComment = (e) => setComment(e.target.value);

    const handleRevewSumit = (e) =>{
        e.preventDefault();
        const requestBody = {"bookId": id,points, comment }
        const storedToken = localStorage.getItem("authToken");
        console.log(requestBody);
        // Send the token through the request "Authorization" Headers
        axios
          .post(API_URL, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            // Reset the state
            setPoints(0);
            setComment("");
            getbookDBFalsa();
          })
          .catch((error) => console.log(error));

    }


    //FOR WHEN WE WORK WITH THE SAMPLE DATA
    useEffect(() =>{
        var dbBook = bookData.items.map((v1) =>{
            if (v1.id == id){
                setBook(v1);
                setLoading(false);
                return v1;
            }
        })
    },[book]);

    const getbookDBFalsa = () =>{
        var dbBook = bookData.items.map((v1) =>{
            if (v1.id == id){
                setBook(v1);
                setLoading(false);
                return v1;
            }
        })
    }

    //end of working with sample data

    /*
    useEffect(() =>{
        getBook();
    },[]);
    

    const getBook = () =>{
        console.log(id);
        axios.get("https://www.googleapis.com/books/v1/volumes/"+id+"?key=AIzaSyBTeJJInkrzrYGIkCEwOoXpEb8yAg6mln4")
        .then((response) => {
            setBook(response.data);
            setLoading(false);
        })
        .catch((error) => console.log(error));
        console.log(book);
    }

    */

    const addBook = () =>{
        const storedToken = localStorage.getItem("authToken");

        const requestBody =
        {
            id, status, pagesRead
        }

        // Send the token through the request "Authorization" Headers
        axios
          .post(`${API_URL}/api/books`, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            // Reset the state
            
          })
          .catch((error) => console.log(error));
    };
    
    const seeForm = () =>{
        Form ? setForm(false)
        : setForm(true);
    }

    
 
    return(
        <div>
            <Navbar />
            {loading ? <div>Loading</div>
            : (
            <>
            <div className="bookDetail">
                <div className="detail1">
                    <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="book cover" />
                    <h4 className="titleDecript"> {book.volumeInfo.title}</h4>
                    {book.volumeInfo.authors.map((author, i) =>(                  
                        <div key={i} className="Author">
                            {author}
                            </div>
                                 ))}
                    <p>Number of pages: {book.volumeInfo.pageCount}</p>
                </div>
                <div className="description">
                <h3>DESCRIPTION:</h3>
                <div dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }} />
                </div>
            </div>
            <div className="formAddBook">
            </div>
            <div className="addBookBut">
                    <button className="summit-btn3" onClick={seeForm}>{Form ? "Hide Form" : "Add to my Shelf" }</button>
            </div>
                <div>
                    <h3>PEOPLE´S OPINION</h3>
                    <hr className="division"/>
                </div>
                    <RatingBook key={id} bookId={id} book={book} />
            </>
             )}    
        </div>
    )

}
export default BookDetail;
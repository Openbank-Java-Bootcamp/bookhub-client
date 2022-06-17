import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import RatingBook from "../components/RatingsBook";
import bookData from "../samplebooks.json"
const API_URL = "http://localhost:5005/api/ratings";
const API_URL2 = "http://localhost:5005/api/books";

function BookDetail(){
    const{id} = useParams();
    const[book, setBook] = useState(null);
    const[loading, setLoading] = useState(true);
    const[status, setStatus]=useState("");
    const[pagesRead, setPagesRead]=useState(0);
    const[Form, setForm]=useState(false);
    const[points, setPoints] = useState(0);
    const[comment, setComment] = useState("");
    const[reading, setReading] = useState(false);
    const[error, setErrot] = useState(false);
    const[bookAdded, setBookAdded] = useState(false);

    const handlepoints = (e) => setPoints(e.target.value);
    const handleComment = (e) => setComment(e.target.value);

    //post a review
    const handleRevewSumit = (e) =>{
        e.preventDefault();
        const requestBody = {"bookId": id,points, comment, "imagen":book.volumeInfo.imageLinks.smallThumbnail,
    "title":book.volumeInfo.title, "pages":book.volumeInfo.pageCount}
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
            getBook();
          })
          .catch((error) => console.log(error));

    }
    
    useEffect(() =>{
        getBook();
    },[]);
    
    //get book (from google api)
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


    //hide and see form button
    const seeForm = () =>{
        Form ? setForm(false)
        : setForm(true);
    }

    //see and hide form of number of pages (reading status)
    const handleStatusChange = (e)  =>{
        if(e.target.value=="READING"){
            setReading(true);
        }else{
            setReading(false);
        }
        setStatus(e.target.value)
    }
    
    //post a book
    const AddToBookToUser = (e) =>{
        e.preventDefault();
        const storedToken = localStorage.getItem("authToken");
        var pagesR = parseInt(pagesRead);

        const requestBody =
        {id, status,"pagesRead": pagesR , "imagen": book.volumeInfo.imageLinks.smallThumbnail,
            "title":book.volumeInfo.title, "pages":book.volumeInfo.pageCount}
        console.log("Request body:")
        console.log(requestBody);
        axios
          .post(API_URL2, requestBody, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then((response) => {
            setErrot(false);
            setComment("");
            setPagesRead(0);
            setReading(false);
            setForm(false);
            setBookAdded(true);
            
          })
          .catch((error) =>{
             console.log(error)
            setErrot(true)});
    }

 
    return(
        <div className="d">
            <Navbar />
            {loading ? <div>Loading</div>
            : (
            <>
            <div className="bookDetail">
                <div className="detail1">
                    <img src={book.volumeInfo.imageLinks.smallThumbnail} alt="book cover" />
                    <h2 className="titleDecript"> {book.volumeInfo.title}</h2>
                    {book.volumeInfo.authors.map((author, i) =>(                  
                        <h3 key={i} className="Author">
                            {author}
                            </h3>
                                 ))}
                    <h4>Number of pages: {book.volumeInfo.pageCount}</h4>
                </div>
                <div className="description">
                <h2>DESCRIPTION:</h2>
                <div className="desp" dangerouslySetInnerHTML={{ __html: book.volumeInfo.description }} />
                </div>
            </div>
            <div className="addBookBut">
                    <p>{bookAdded&&"BOOK ADDED SUSCESFULLY"}</p>
                    <button className="summit-btn3" onClick={seeForm}>{Form ? "Hide Form" : "Add to my Shelf" }</button>
                {Form? 
                    <div className="editReviewForm">
                    <form onSubmit={AddToBookToUser}>
                    <select className="select1" name="select" value={status} onChange={handleStatusChange}>
                         <option className="opt" value=""> </option>
                        <option className="opt" value="READ">I have already read it ! </option>
                        <option className="opt" value="READING" selected>What a coincidence, I am reading it !</option>
                        <option className="opt" value="TBR">I wanna save it for the future</option>
                    </select>
                    {reading? <div className="inputReading">
                    <label className="labelStars">In which page are you?</label>
                    <input className="input-field6" min="1" max={book.volumeInfo.pageCount} type="number" name="pagesRead" value={pagesRead} onChange={(e) => setPagesRead(e.target.value)} />
                    </div>
                    :(<div></div>)}
                    <button className="summit-btn6" type="submit">Add it!</button>
                    {error? <p>Book already save as {status} </p> :(<p></p>)}
                    </form>
                    </div>
                :(<div></div>)}
            </div>
                <div>
                    <h3 className="subtitle1">PEOPLE´S OPINION</h3>
                    <hr className="division"/>
                </div>
                    <RatingBook key={id} bookId={id} book={book} />
            </>
             )}    
        </div>
    )

}
export default BookDetail;